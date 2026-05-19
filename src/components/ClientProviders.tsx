"use client";

import { RootProvider } from "fumadocs-ui/provider/next";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <RootProvider search={{ enabled: true }} theme={{ enabled: false }}>
        {children}
      </RootProvider>
    </ThemeProvider>
  );
}
