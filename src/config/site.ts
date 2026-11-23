export const siteConfig = {
  name: "Synapse UI",
  shortName: "synapse-ui",
  url: "https://synapse-ui-dev.vercel.app",
  ogImage: "/og.png",
  description:
    "Beautifully designed, accessible React and React Native components and animated sections. Copy, paste, own the code. Built with Tailwind CSS v4, Radix and Motion, plus Expo-ready mobile components.",
  links: {
    // TODO(owner): confirm the canonical repo and social handles.
    github: "https://github.com/therajarshichakraborty/Synapse-UI",
    twitter: "https://x.com",
    discord: "https://discord.com",
  },
  // TODO(owner): wire to a real source (GitHub API) or update by hand.
  stats: {
    stars: 1200,
    components: 120,
    downloads: 48000,
    contributors: 24,
  },
};

export type SiteConfig = typeof siteConfig;

export const META_THEME_COLORS = {
  light: "#fafbfe",
  dark: "#05070d",
};

export const mainNav = [
  { title: "Docs", href: "/docs" },
  { title: "Components", href: "/docs/components" },
  { title: "Templates", href: "/docs/blocks" },
  { title: "Blocks", href: "/docs/blocks" },
  { title: "Changelog", href: "/docs/changelog" },
] as const;
