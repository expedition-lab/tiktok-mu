/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // add any external image hosts you use here
    domains: [
      "images.unsplash.com",
      "plus.unsplash.com"
    ],
    // or use remotePatterns if you want to be stricter:
    // remotePatterns: [
    //   { protocol: "https", hostname: "images.unsplash.com" },
    //   { protocol: "https", hostname: "plus.unsplash.com" }
    // ]
  },
};
module.exports = nextConfig;
