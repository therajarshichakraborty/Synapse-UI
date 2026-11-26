import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { createMDX } from "fumadocs-mdx/next";

try {
  console.log("Building Synapse UI registry and docs index...");
  execSync("node scripts/build-registry.mjs", { stdio: "inherit" });
  execSync("node scripts/build-docs-index.mjs", { stdio: "inherit" });
} catch (error) {
  console.error("Failed to build registry:", error);
}

const withMDX = createMDX();

/**
 * React Native components (src/components/native) are previewed in the docs through
 * react-native-web. `react-native-svg` is swapped for a tiny DOM shim on the web.
 */
const nativeAliases = {
  "react-native": "react-native-web",
  "react-native-svg": "./src/lib/native-web/react-native-svg.tsx",
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  // Docs code blocks read component sources from disk at request time (src/lib/registry-source.ts).
  // Ship those files with the serverless functions, or deployed pages show "Source not found".
  outputFileTracingIncludes: {
    "/docs/**": ["./src/**/*.{ts,tsx,css}"],
    "/md/**": ["./src/**/*.{ts,tsx,css}"],
    "/view/**": ["./src/**/*.{ts,tsx,css}"],
  },
  transpilePackages: ["react-native-web"],
  turbopack: {
    resolveAlias: nativeAliases,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      "react-native$": "react-native-web",
      "react-native-svg$": fileURLToPath(
        new URL("./src/lib/native-web/react-native-svg.tsx", import.meta.url),
      ),
    };
    return config;
  },
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
      // The variant collections were retired; send old links to the component index.
      { source: "/docs/collections/:path*", destination: "/docs/components", permanent: false },
      { source: "/docs/hooks/:slug", destination: "/docs/components", permanent: false },
      ...["ai-input", "faq", "list", "pricing", "text", "block", "message"].map((slug) => ({
        source: `/docs/components/${slug}`,
        destination: "/docs/components",
        permanent: false,
      })),
      { source: "/pricing", destination: "/#pricing", permanent: false },
    ];
  },
};

export default withMDX(nextConfig);
