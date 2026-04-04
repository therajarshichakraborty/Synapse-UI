import { Metadata } from "next";
import React, { ReactNode } from "react";
import Header from "@/components/landing/Header";
import Footer from "@/components/layout/Footer";
import { Geist, Geist_Mono } from "next/font/google";
import { Roboto , Inter, Roboto_Mono } from 'next/font/google';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Synapse UI - Open Source UI Components for React",
    default: "Synapse UI - Open Source UI Components for React",
  },
};

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${roboto.className} ${inter.className} `}>
      <Header />
      <main className="relative w-full pt-0 md:pt-0 bg-white dark:bg-black">
        {children}
      </main>
      <Footer />
    </div>
  );
}
