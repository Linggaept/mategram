import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  async headers() {
    return [
      {
        source: "/konten/:path*",
        headers: [
          {
            key: "Content-Type",
            value: "image/png",  // Atau bisa disesuaikan dengan MIME type lainnya seperti image/jpeg
          },
        ],
      },
    ];
  },
};

export default nextConfig;
