/** @type {import('next').NextConfig} */
module.exports = {
  outputFileTracingRoot: __dirname,
  images: { remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }] },
  // keep this true until everything is green in prod, then flip to false
  eslint: { ignoreDuringBuilds: true },
};
