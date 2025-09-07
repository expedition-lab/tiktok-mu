/** @type {import('next').NextConfig} */
module.exports = {
  // Pin tracing to this project (stops Next from treating your HOME as root)
  outputFileTracingRoot: __dirname,

  // Optional: silence the LAN dev warning you saw earlier
  // allowedDevOrigins: ['http://192.168.100.10:3000'],
};
