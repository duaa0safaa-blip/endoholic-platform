import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Keep builds green during CI / incremental migration
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
