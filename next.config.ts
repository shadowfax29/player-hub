import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow Unsplash images used throughout the app for gaming setup photos
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "jqyzglqunohzxxjlhmlp.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
