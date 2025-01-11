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

export default async function OverViewPage() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Card className="col-span-1 min-h-[33vh]">
        <CardHeader>Upload</CardHeader>
        <CardContent>
          <ProfileCreateForm />
        </CardContent>
      </Card>
      <Card className="col-span-2 min-h-[33vh]">
        <CardContent></CardContent>
      </Card>
    </div>
  );
}
