import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  /* for images in catalog */
  reactStrictMode: true,
  images: {
    domains: ["m.media-amazon.com"],
  },
};

export default nextConfig;
