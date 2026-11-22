import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const components = [
  {
    title: "Dialog",
    href: "/docs/components/dialog",
    description: "A window overlaid on the primary window.",
  },
  {
    title: "Hover Card",
    href: "/docs/components/hover-card",
    description: "Preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/components/progress",
    description: "Shows the completion progress of a task.",
  },
  {
    title: "Tabs",
    href: "/docs/components/tabs",
    description: "Layered sections of content displayed one at a time.",
  },
];

export default function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 p-2 md:w-[420px] lg:w-[500px] lg:grid-cols-[.8fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    href="/"
                    className="flex h-full flex-col justify-end rounded-lg bg-gradient-to-br from-glow-cyan/20 via-primary/20 to-glow-indigo/20 p-5 no-underline outline-none"
                  >
                    <div className="text-base font-semibold">Synapse UI</div>
                    <p className="text-[13px] leading-snug text-muted-foreground">
                      Beautiful components you copy, paste and own.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/docs/installation">
                    <div className="text-sm font-medium">Installation</div>
                    <p className="line-clamp-2 text-[13px] text-muted-foreground">
                      Set up your project in minutes.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/docs/theming">
                    <div className="text-sm font-medium">Theming</div>
                    <p className="line-clamp-2 text-[13px] text-muted-foreground">
                      Make it yours with CSS variables.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden sm:block">
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-2 p-2 md:w-[500px] md:grid-cols-2">
              {components.map((c) => (
                <li key={c.title}>
                  <NavigationMenuLink asChild>
                    <Link href={c.href}>
                      <div className="text-sm font-medium">{c.title}</div>
                      <p className="line-clamp-2 text-[13px] text-muted-foreground">
                        {c.description}
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/docs">Docs</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
