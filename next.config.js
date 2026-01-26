/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'certify.fakereviewgenerator.com',
      },
    ],
  },
  output: 'standalone',
};

module.exports = nextConfig;
