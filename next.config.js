/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,   // optional
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
  },
};
module.exports = nextConfig;
