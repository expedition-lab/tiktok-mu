/** @type {import('next').NextConfig} */
module.exports = {
  outputFileTracingRoot: __dirname,
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
  },
  // keep this true if you still hit lint errors during build
  eslint: { ignoreDuringBuilds: true },
};
