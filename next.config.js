/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cf.shopee.co.id',
        pathname: '**',
      },
    ],
  },
}

module.exports = nextConfig
