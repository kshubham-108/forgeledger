import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/builds",
        destination: "/explore",
        permanent: true,
      },
      {
        source: "/about",
        destination: "/",
        permanent: true,
      },
      {
        source: "/ledger",
        destination: "/dashboard",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
