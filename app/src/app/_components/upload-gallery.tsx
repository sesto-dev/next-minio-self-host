/* eslint-disable @next/next/no-img-element */
import prisma from "~/lib/server/prisma";
import { toast } from "sonner";

export default async function UploadGallery() {
  const files = await prisma.file.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!files) {
    toast.error("Something went wrong");
    return <div>Something went wrong</div>;
  }

  return (
    <div className="grid grid-cols-4 gap-2">
      {files.map((file) => (
        <img
          className="h-full rounded-md object-cover"
          key={file.id}
          alt="Image uploaded by user"
          src={file.url!}
        />
      ))}
    </div>
  );
}
