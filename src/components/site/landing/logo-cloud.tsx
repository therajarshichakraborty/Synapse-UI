import { Marquee } from "@/components/animated/marquee";
import { techLogos } from "@/components/site/landing/logos";

export function LogoCloud() {
  return (
    <section aria-label="Built with" className="relative py-10">
      <p className="text-center text-sm text-muted-foreground">Built on the modern React stack</p>
      <Marquee duration={36} gap="3.5rem" className="mx-auto mt-8 max-w-5xl">
        {techLogos.map(({ name, Logo }) => (
          <div
            key={name}
            className="flex items-center gap-2.5 text-muted-foreground/80 transition-colors hover:text-foreground"
          >
            <Logo className="h-6 w-auto" />
            <span className="text-base font-semibold tracking-tight whitespace-nowrap">{name}</span>
          </div>
        ))}
      </Marquee>
    </section>
  );
}
