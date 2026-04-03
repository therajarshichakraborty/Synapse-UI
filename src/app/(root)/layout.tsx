import { Metadata } from "next";
import { ReactNode } from "react";
import  Header  from "@/components/landing/Header";
import  Footer  from "@/components/layout/Footer";
export const metadata: Metadata = {
  title: {
    template: "%s | Synapse UI - Open Source UI Components for React",
    default: "Synapse UI - Open Source UI Components for React",
  },
};

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="relative w-full pt-0 md:pt-0 bg-white dark:bg-black">
        {children}
      </main>
      <Footer/>
    </>
  );
}
