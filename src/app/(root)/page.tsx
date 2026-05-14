import HeroSection from "@/components/landing/Hero";
import Card_22 from "@/components/synapse-ui-components/cards/card-22";
import Faq01 from "@/components/synapse-ui-components/FAQs/faq-01";
import Faq02 from "@/components/synapse-ui-components/FAQs/faq-02";
import Faq03 from "@/components/synapse-ui-components/FAQs/faq-03";
import Faq04 from "@/components/synapse-ui-components/FAQs/faq-04";
export default function Home() {
  return (
    <main className="bg-white dark:bg-[#0e1111] overflow-x-hidden">
      <div className="grid grid-rows-[auto_1fr_auto] min-h-screen px-6 lg:px-4 gap-4 sm:gap-12">
        <HeroSection />
      </div>
      <Faq01 />
      <Faq02 />
      <Faq03 />
      <Faq04 />
    </main>
  );
}
