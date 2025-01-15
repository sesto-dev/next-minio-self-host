"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  getPresignedUrls,
  handleUpload,
  validateFiles,
  MAX_FILE_SIZE_NEXTJS_ROUTE,
} from "~/lib/client/minio";
import { Input } from "~/components/ui/input";

export default function UploadForm() {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);

      if (files.length) {
        // Create the expected ShortFileProp array for the API
        const shortFileProps = files.map((file) => ({
          originalFileName: file.name,
          fileSize: file.size,
        }));

        // Validate files before uploading
        const error = validateFiles(shortFileProps, MAX_FILE_SIZE_NEXTJS_ROUTE);
        if (error) {
          toast.error(error);
          return;
        }

        // Get presigned URLs from the API
        const presignedUrls = await getPresignedUrls(shortFileProps);

        // Upload files using presigned URLs
        await handleUpload(files, presignedUrls, () => {
          toast.success("Files uploaded successfully");
          setFiles([]); // Clear files after successful upload
        });

        // reload
        window.location.reload();
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      setFiles(Array.from(fileList));
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Input
        className="mb-2"
        type="file"
        multiple
        disabled={loading}
        onChange={handleFileChange}
      />

      <Button
        type="submit"
        disabled={loading || files.length < 1}
        className="w-full"
      >
        {loading && <Loader2 className="mr-2 size-4 animate-spin" />}
        Upload
      </Button>
    </form>
  );
}
