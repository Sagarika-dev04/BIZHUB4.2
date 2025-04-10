import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, // THIS SKIPS TS ERRORS DURING BUILD
  },
};

export default nextConfig;
