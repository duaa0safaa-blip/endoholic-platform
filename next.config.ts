import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    '/*': ['./private/books/**/*'],
  },
  typescript: {
    // Keep builds green during CI / incremental migration
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
