/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.artic.edu',
        port: '',
        pathname: '/iiif/2/**',
      },
    ],
  },
};

module.exports = nextConfig;
