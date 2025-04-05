import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/collections", // Yönlendirmek istediğiniz sayfa
        permanent: true, // Kalıcı yönlendirme için "true" (308), geçici için "false" (307)
      },
    ];
  },
};

export default nextConfig;
