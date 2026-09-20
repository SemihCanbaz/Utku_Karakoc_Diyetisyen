import type { NextConfig } from "next";
const config: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85, 90, 100],
  },
  async redirects() {
    return [
      { source: "/online-diyet", destination: "/vip-diyet", permanent: true },
      {
        source: "/calculators",
        destination: "/hesaplayicilar",
        permanent: true,
      },
      {
        source: "/recipes/:path*",
        destination: "/tarifler/:path*",
        permanent: true,
      },
      { source: "/contact", destination: "/iletisim", permanent: true },
      { source: "/about", destination: "/hakkimda", permanent: true },
      { source: "/privacy", destination: "/gizlilik", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};
export default config;
