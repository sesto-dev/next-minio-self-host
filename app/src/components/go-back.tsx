"use client";
import { useRouter } from "next/navigation";
import Icons from "./shared/icons";
import { Button } from "./ui/button";

export default function GoBack() {
  const router = useRouter();
  return (
    <Button
      className="mb-5"
      size="icon"
      variant="secondary"
      onClick={() => router.back()}
    >
      <span className="sr-only">Go back</span>
      <Icons.moveLeft className="size-5" />
    </Button>
  );
}
