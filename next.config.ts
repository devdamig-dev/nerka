import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/niar/:path*",
        destination: "/nerka/:path*",
      },
    ];
  },
};

export default nextConfig;
