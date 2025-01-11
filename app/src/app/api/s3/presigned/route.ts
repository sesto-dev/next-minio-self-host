import type { ShortFileProp, PresignedUrlProp } from "~/lib/server/minio";
import { createPresignedUrlToUpload } from "~/lib/server/minio";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";
import prisma from "~/lib/server/prisma";

const bucketName = process.env.MINIO_BUCKET_NAME!;
const expiry = 60 * 60; // 1 hour

export async function POST(req: Request) {
  try {
    // get the files from the request body
    const body = await req.json();
    const files = body as ShortFileProp[];
    console.log({ files });

    if (!files?.length) {
      return new NextResponse("No files to upload", { status: 400 });
    }

    const presignedUrls = [] as PresignedUrlProp[];

    if (files?.length) {
      // use Promise.all to get all the presigned urls in parallel
      await Promise.all(
        // loop through the files
        files.map(async (file) => {
          const fileName = nanoid(12);

          // get presigned url using s3 sdk
          const url = await createPresignedUrlToUpload({
            bucketName,
            fileName,
            expiry,
          });

          // add presigned url to the list
          presignedUrls.push({
            fileNameInBucket: fileName,
            originalFileName: file.originalFileName,
            fileSize: file.fileSize,
            url,
          });
        })
      );
    }

    console.log({ presignedUrls });

    const publicUrls = presignedUrls.map((presignedUrl) => {
      const publicUrl = `http${process.env.MINIO_SSL === "true" ? "s" : ""}://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${process.env.MINIO_BUCKET_NAME}/${presignedUrl.fileNameInBucket}`;
      return { ...presignedUrl, publicUrl };
    });

    console.log({ publicUrls });

    // Get the file name in bucket from the database
    const saveFilesInfo = await prisma.file.createMany({
      data: publicUrls.map((presignedUrl: any) => ({
        bucket: process.env.S3_BUCKET_NAME,
        fileName: presignedUrl.fileNameInBucket,
        originalName: presignedUrl.originalFileName,
        size: presignedUrl.fileSize,
        url: presignedUrl.publicUrl,
      })),
    });

    return NextResponse.json(presignedUrls);
  } catch (error) {
    console.error({ error });
    return new NextResponse("Internal error", { status: 500 });
  }
}
