import type { NextConfig } from "next";
import { createMDX } from 'fumadocs-mdx/next';

const config: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ferf1mheo22r9ira.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },
    ],
  },
};
const withMDX = createMDX({
  // customize the config file path
  // configPath: "source.config.ts"
});
export default withMDX(config);

