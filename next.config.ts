import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'numericacenter.com' },
      { protocol: 'https', hostname: 'escen.university' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
    ],
  },
  // Optimisation filesystem Windows (slow drive warning)
  experimental: {
    turbo: {
      // Réduire la charge de compilation
    },
  },
};

export default nextConfig;
