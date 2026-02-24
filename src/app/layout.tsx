import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import Providers from "./providers";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { TopicNav } from "@/components/topic-nav";
import { TableOfContents } from "@/components/table-of-contents";
import { SiteCredits } from "@/components/site-credits";
import { PageTransition } from "@/components/page-transition";
import { KeyboardProvider } from "@/components/keyboard-provider";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Learn React Hooks — Interactive Guide",
    template: "%s | Learn React Hooks",
  },
  description:
    "Interactive learning guide for React Hooks with Next.js and TanStack Query",
  metadataBase: new URL("https://hooks-101.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <Providers>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="max-h-svh overflow-hidden">
              <KeyboardProvider>
                <header className="sticky top-0 z-10 flex h-12 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur-sm px-4">
                  <SidebarTrigger className="-ml-1" />
                  <Separator orientation="vertical" className="mr-2 !h-4" />
                  <BreadcrumbNav />
                  <div className="ml-auto">
                    <ThemeToggle />
                  </div>
                </header>
                <div className="flex flex-1 min-h-0 overflow-hidden">
                  <div className="flex-1 overflow-y-auto p-6 lg:p-10 min-w-0">
                    <PageTransition>
                      {children}
                    </PageTransition>
                    <TopicNav />
                    <SiteCredits className="xl:hidden border-t mt-12 pt-6 pb-4 max-w-sm" />
                  </div>
                  <TableOfContents />
                </div>
              </KeyboardProvider>
            </SidebarInset>
          </SidebarProvider>
        </Providers>
      </body>
    </html>
  );
}
