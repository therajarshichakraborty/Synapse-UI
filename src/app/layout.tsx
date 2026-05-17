import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { Roboto, Inter } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { RootProvider } from "fumadocs-ui/provider/next";
import { ViewTransitions } from "next-view-transitions";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Synapse UI - Open Source UI Components for React",
  description: "...",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="cursor-pointer">
      <body
        className={`${roboto.className} ${inter.className} antialiased bg-white dark:bg-[#0e1111]`}
      >
        {/*
          RootProvider from fumadocs already handles theming internally.
          Remove next-themes ThemeProvider to avoid conflicts.
        */}
        <RootProvider>
          <ViewTransitions>
            <TooltipProvider>
              {children}
            </TooltipProvider>
          </ViewTransitions>
        </RootProvider>
      </body>
    </html>
  );
}


