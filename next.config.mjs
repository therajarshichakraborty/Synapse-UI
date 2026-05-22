import { execSync } from "child_process";
import { createMDX } from "fumadocs-mdx/next";

// Run registry builder script (trigger full-code rebuild) - Trigger Build 1
try {
  console.log("Building Synapse UI component registry...");
  execSync("bun scripts/build-registry.mjs", { stdio: "inherit" });
} catch (error) {
  console.error("Failed to build registry:", error);
}

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ferf1mheo22r9ira.public.blob.vercel-storage.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default withMDX(nextConfig);
