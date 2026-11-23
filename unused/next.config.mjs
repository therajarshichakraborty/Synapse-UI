import { execSync } from "node:child_process";
import { createMDX } from "fumadocs-mdx/next";

try {
  console.log("Building Synapse UI registry and docs index...");
  execSync("node scripts/build-registry.mjs", { stdio: "inherit" });
  execSync("node scripts/build-docs-index.mjs", { stdio: "inherit" });
} catch (error) {
  console.error("Failed to build registry:", error);
}

const withMDX = createMDX();

// Variant galleries moved from /docs/components/* to /docs/collections/*.
const movedCollections = ["ai-input", "faq", "list", "pricing", "text", "block", "message"];

/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "encrypted-tbn0.gstatic.com", pathname: "/**" },
      {
        protocol: "https",
        hostname: "ferf1mheo22r9ira.public.blob.vercel-storage.com",
        pathname: "/**",
      },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
  },
  async redirects() {
    return [
      ...movedCollections.map((slug) => ({
        source: `/docs/components/${slug}`,
        destination: `/docs/collections/${slug}`,
        permanent: true,
      })),
      { source: "/docs/hooks/:slug", destination: "/docs/collections/hooks", permanent: true },
      { source: "/pricing", destination: "/#pricing", permanent: false },
    ];
  },
};

export default withMDX(nextConfig);
