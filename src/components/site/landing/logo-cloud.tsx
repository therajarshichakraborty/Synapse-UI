import { techLogos } from "@/components/site/landing/logos";

export function LogoCloud() {
  return (
    <section aria-labelledby="stack-heading" className="py-16 md:py-20">
      <div className="container-page">
        <h2 id="stack-heading" className="text-center text-sm font-medium text-muted-foreground">
          Built on the modern React stack
        </h2>
        <ul className="mx-auto mt-8 grid max-w-5xl grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-4">
          {techLogos.map(({ name, Logo }) => (
            <li
              key={name}
              className="group flex h-28 flex-col items-center justify-center gap-3 bg-background text-muted-foreground transition-colors duration-300 hover:bg-surface-1 hover:text-foreground"
            >
              <Logo className="h-7 w-auto transition-transform duration-300 group-hover:scale-110" />
              <span className="text-[13px] font-medium tracking-tight">{name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
