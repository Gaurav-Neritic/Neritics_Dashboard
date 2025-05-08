import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{ hostname: 'res.cloudinary.com' }],
  },
  env: {
    NEXT_FONT_IGNORE_LIGHTNINGCSS: 'true', // <-- Force at build time
  },
};

export default nextConfig;
