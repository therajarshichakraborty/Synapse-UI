import HeroSection from "@/components/landing/Hero";
import { AIInput10 } from "@/components/synapse-ui-components/ai-inputs";
export default function Home() {
  return (
    <main className="bg-white dark:bg-[#0e1111] overflow-x-hidden">
      <div className="grid grid-rows-[auto_1fr_auto] min-h-screen px-6 lg:px-4 gap-4 sm:gap-12">
        <HeroSection />
      </div>
      <AIInput10 />
    </main>
  );
}
