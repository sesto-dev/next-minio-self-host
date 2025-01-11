import { MinioClient } from "./client";
import type internal from "stream";

export async function createBucketIfNotExists(bucketName: string) {
  const bucketExists = await MinioClient.bucketExists(bucketName);
  if (!bucketExists) {
    await MinioClient.makeBucket(bucketName);
  }
}

export async function saveFileInBucket({
  bucketName,
  fileName,
  file,
}: {
  bucketName: string;
  fileName: string;
  file: Buffer | internal.Readable;
}) {
  // Create bucket if it doesn't exist
  await createBucketIfNotExists(bucketName);

  // check if file exists
  const fileExists = await checkFileExistsInBucket({
    bucketName,
    fileName,
  });

  if (fileExists) {
    throw new Error("File already exists");
  }

  // Upload image to S3 bucket
  await MinioClient.putObject(bucketName, fileName, file);
}

export async function checkFileExistsInBucket({
  bucketName,
  fileName,
}: {
  bucketName: string;
  fileName: string;
}) {
  try {
    await MinioClient.statObject(bucketName, fileName);
  } catch (error) {
    return false;
  }
  return true;
}

export async function getFileFromBucket({
  bucketName,
  fileName,
}: {
  bucketName: string;
  fileName: string;
}) {
  try {
    await MinioClient.statObject(bucketName, fileName);
  } catch (error) {
    console.error(error);
    return null;
  }
  return await MinioClient.getObject(bucketName, fileName);
}

export async function deleteFileFromBucket({
  bucketName,
  fileName,
}: {
  bucketName: string;
  fileName: string;
}) {
  try {
    await MinioClient.removeObject(bucketName, fileName);
  } catch (error) {
    console.error(error);
    return false;
  }
  return true;
}

export async function createPresignedUrlToUpload({
  bucketName,
  fileName,
  expiry = 60 * 60, // 0 means no expiry
}: {
  bucketName: string;
  fileName: string;
  expiry?: number;
}) {
  // Create bucket if it doesn't exist
  await createBucketIfNotExists(bucketName);

  return await MinioClient.presignedPutObject(bucketName, fileName, expiry);
}

export async function createPresignedUrlToDownload({
  bucketName,
  fileName,
  expiry = 60 * 60, // 1 hour
}: {
  bucketName: string;
  fileName: string;
  expiry?: number;
}) {
  return await MinioClient.presignedGetObject(bucketName, fileName, expiry);
}
