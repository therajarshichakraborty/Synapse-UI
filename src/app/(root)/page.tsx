import HeroSection from "@/components/landing/Hero";
import { AIInput01 } from "@/components/synapse-ui-components/ai-inputs/ai-input-01";

import {AIInput02} from "@/components/synapse-ui-components/ai-inputs/ai-input-02"
import { AIInput03 } from "@/components/synapse-ui-components/ai-inputs/ai-input-03";
import { AIInput04 } from "@/components/synapse-ui-components/ai-inputs/ai-input-04";
import { AIInput05 } from "@/components/synapse-ui-components/ai-inputs/ai-input-05";
import { AIInput06 } from "@/components/synapse-ui-components/ai-inputs/ai-input-06";
export default function Home() {
  return (
    <main className="bg-white dark:bg-[#0e1111] overflow-x-hidden">
      <div className="grid grid-rows-[auto_1fr_auto] min-h-screen px-6 lg:px-4 gap-4 sm:gap-12">
        <HeroSection />
      </div>
      <AIInput02/>
      <AIInput01/>
      <AIInput03/>
      <br/><br/><br/><br/><br/><br/>
      <AIInput04/>
      <br/><br/><br/><br/><br/><br/>
      <AIInput05/>
      <br/><br/><br/><br/><br/><br/>
      <AIInput06/>
      <br/><br/><br/><br/><br/><br/>
      
    </main>
  );
}
