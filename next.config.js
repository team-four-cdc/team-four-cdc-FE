const withPWA = require('next-pwa')
const withLess = require('next-with-less')
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost'
      }
    ],
    minimumCacheTTL: 1500000,
  },
}

const lessConfig = withLess({
  lessLoaderOptions: {
    lessOptions: {
      javascriptEnabled: true,
      localIdentName: '[path]___[local]___[hash:base64:5]',
    },
  },
})

const pwaConfig = withPWA({
  pwa: {
    dest: 'public',
    register: true,
    disable: process.env.NODE_ENV === 'development',
    skipWaiting: true,
  },
})

module.exports = { ...nextConfig, ...pwaConfig, ...lessConfig }
