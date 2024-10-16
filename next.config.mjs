/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**", // Chấp nhận tất cả các tên miền với http
      },
      {
        protocol: "https",
        hostname: "**", // Chấp nhận tất cả các tên miền với https
      },
    ],
  },
};

export default nextConfig;
