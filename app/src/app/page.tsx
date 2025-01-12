import PageContainer from "~/components/layout/page-container";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { CogIcon, Link2Icon, ProjectorIcon, ViewIcon } from "lucide-react";
import prisma from "~/lib/server/prisma";
import ProfileCreateForm from "./_components/upload-form";
import UploadGallery from "./_components/upload-gallery";
import { ScrollArea } from "~/components/ui/scroll-area";

export default async function OverViewPage() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Card className="col-span-1 h-fit">
        <CardHeader>Upload</CardHeader>
        <CardContent>
          <ProfileCreateForm />
        </CardContent>
      </Card>
      <Card className="col-span-2 max-h-[66vh] min-h-[33vh] max-w-[50vw]">
        <ScrollArea className="h-full">
          <CardHeader>Gallery</CardHeader>
          <CardContent>
            <UploadGallery />
          </CardContent>
        </ScrollArea>
      </Card>
    </div>
  );
}
