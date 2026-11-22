import { BoltIcon, GlobeIcon, LayersIcon, LockIcon, PaletteIcon, TerminalIcon } from "lucide-react";
import { CardSpotlight } from "@/components/animated/card-spotlight";

const features = [
  {
    icon: BoltIcon,
    title: "Blazing fast",
    description: "Server components and zero runtime CSS keep every page lean.",
  },
  {
    icon: PaletteIcon,
    title: "Themeable",
    description: "One file of tokens re-skins every component, light and dark.",
  },
  {
    icon: LockIcon,
    title: "Accessible",
    description: "Keyboard, screen reader and focus management, built in.",
  },
  {
    icon: LayersIcon,
    title: "Composable",
    description: "Small primitives that snap together into anything.",
  },
  {
    icon: TerminalIcon,
    title: "CLI powered",
    description: "Add a component and its dependencies in one command.",
  },
  {
    icon: GlobeIcon,
    title: "Production ready",
    description: "Used in apps serving millions of requests a day.",
  },
];

export default function FeatureGrid() {
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-primary">Features</p>
          <h2 className="mt-3 text-h2 font-semibold">Everything you need to ship</h2>
          <p className="mt-4 text-body-lg text-muted-foreground">
            A complete toolkit, designed to work together from day one.
          </p>
        </div>
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <CardSpotlight key={f.title} className="p-6">
              <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-surface-2 text-primary">
                <f.icon className="size-5" />
              </div>
              <h3 className="mt-5 font-semibold tracking-tight">{f.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{f.description}</p>
            </CardSpotlight>
          ))}
        </div>
      </div>
    </section>
  );
}
