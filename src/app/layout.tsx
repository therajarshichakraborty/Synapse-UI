import "./globals.css";
import { Inter } from "next/font/google";
import ClientProviders from "@/components/ClientProviders";
import type { Metadata } from "next";
import type { ReactNode } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Synapse UI",
    default: "Synapse UI — Open source UI components for React",
  },
  description: "Open source UI components for React. Build fast, accessible interfaces.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body suppressHydrationWarning>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}