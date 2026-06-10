import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      { hostname: "picsum.photos" },
      { hostname: "cdn.simpleicons.org" },
    ],
  },
};

export default nextConfig;
