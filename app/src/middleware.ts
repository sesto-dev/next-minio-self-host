import { type NextRequest } from "next/server";

export function middleware(request: NextRequest) {}

export const config = {
  matcher: [
    "/((?!api|static|.*\\..*|_next|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
