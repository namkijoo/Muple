/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: { and: [/\.(js|ts)x?$/] }, // js, ts 파일에서만 import 가능하게
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
