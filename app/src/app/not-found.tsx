"use client";

import { useRouter } from "next/navigation";

import { Button } from "~/components/ui/button";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="absolute left-1/2 top-1/2 mb-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-center">
      <span className="bg-gradient-to-b from-foreground to-transparent bg-clip-text text-[10rem] font-extrabold leading-none text-transparent">
        404
      </span>
      <h2 className="my-2 font-heading text-2xl font-bold">مشکلی پیش اومده!</h2>
      <p>ببخشید! این صفحه وجود نداره یا منتقل شده!</p>
      <div className="mt-8 flex justify-center gap-2">
        <Button onClick={() => router.back()} variant="default" size="lg">
          بازگشت به صفحه قبل
        </Button>
        <Button onClick={() => router.push("/app")} variant="ghost" size="lg">
          صفحه اصلی
        </Button>
      </div>
    </div>
  );
}
