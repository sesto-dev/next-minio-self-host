import ThemeProvider from "~/components/shared/theme-provider";
import { Toaster } from "~/components/ui/sonner";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="antialiased" suppressHydrationWarning={true}>
      <body className={"overflow-hidden"}>
        <NextTopLoader showSpinner={false} />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Toaster />
          <div className="flex h-screen flex-col items-center justify-center">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
