import type { Metadata } from "next";
import "./globals.css";
import { ViewTransitions } from "next-view-transitions";
import React, { ReactNode } from "react";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Geist, Geist_Mono } from "next/font/google";
import { Roboto, Inter, Roboto_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Synapse UI - Open Source UI Components for React",
  description:
    "Created by Rajarshi Chakraborty, Synapse UI is an open-source library of React components designed to accelerate development and enhance user interfaces. With a focus on accessibility, performance, and customization, Synapse UI provides a comprehensive set of tools for building modern web applications. Whether you're a seasoned developer or just starting out, Synapse UI offers a seamless experience for creating beautiful and functional interfaces.",
  icons: {
    icon: [
      {
        url: "./favicon.ico",
        href: "./favicon.ico",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <ViewTransitions>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <html lang="en" suppressHydrationWarning className="cursor-pointer">
        <body
          className={`${roboto.className} ${inter.className}  antialiased bg-white dark:bg-[#0e1111]`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider>
            {children}
            </TooltipProvider>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
