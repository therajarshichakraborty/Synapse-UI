import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import ClientProviders from "@/components/ClientProviders";
import { META_THEME_COLORS, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans", display: "swap" });
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    template: "%s | Synapse UI",
    default: "Synapse UI: Beautiful, animated React components",
  },
  description: siteConfig.description,
  keywords: [
    "React",
    "Next.js",
    "Tailwind CSS",
    "components",
    "shadcn",
    "Radix",
    "Motion",
    "UI library",
  ],
  openGraph: {
    type: "website",
    title: "Synapse UI",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: "Synapse UI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Synapse UI",
    description: siteConfig.description,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: META_THEME_COLORS.light },
    { media: "(prefers-color-scheme: dark)", color: META_THEME_COLORS.dark },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={cn(geistSans.variable, geistMono.variable)}>
      <head>
        {/* `?theme=light|dark` pins the theme (used for screenshots and shareable links). */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=new URLSearchParams(location.search).get("theme");if(t==="light"||t==="dark"||t==="system")localStorage.setItem("theme",t)}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-svh bg-background font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-sm focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
