import { BarChart3Icon, GlobeIcon, LockIcon, SparklesIcon, ZapIcon } from "lucide-react";
import { BentoCard, BentoGrid } from "@/components/animated/bento-grid";

const header = (c: string) => (
  <div className="size-full rounded-xl bg-dots" style={{ background: c }} />
);

export default function BentoGridDemo() {
  return (
    <BentoGrid className="w-full max-w-4xl">
      <BentoCard
        className="md:col-span-2"
        icon={<SparklesIcon />}
        title="AI that understands your code"
        description="Context-aware suggestions across your entire codebase."
        header={header(
          "radial-gradient(ellipse at top left, rgb(34 211 238 / 0.25), transparent 60%), radial-gradient(ellipse at bottom right, rgb(99 102 241 / 0.25), transparent 60%)",
        )}
      />
      <BentoCard
        icon={<LockIcon />}
        title="Secure by default"
        description="SOC 2 Type II, SSO and audit logs."
        header={header("linear-gradient(135deg, rgb(59 130 246 / 0.2), transparent)")}
      />
      <BentoCard
        icon={<GlobeIcon />}
        title="Global edge"
        description="Served from 300+ locations."
        header={header("linear-gradient(135deg, rgb(99 102 241 / 0.2), transparent)")}
      />
      <BentoCard
        icon={<BarChart3Icon />}
        title="Real-time analytics"
        description="Know what happens, as it happens."
        header={header("linear-gradient(135deg, rgb(34 211 238 / 0.18), transparent)")}
      />
      <BentoCard
        icon={<ZapIcon />}
        title="Instant deploys"
        description="Push to deploy in seconds."
        header={header("linear-gradient(135deg, rgb(59 130 246 / 0.18), transparent)")}
      />
    </BentoGrid>
  );
}
