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
  async rewrites() {
    return [
      {
        source: '/registrasi-pembaca',
        destination: '/reader-register',
      },
      {
        source: '/registrasi-penulis',
        destination: '/writer-register',
      },
      {
        source: '/lihat-artikel',
        destination: '/see-article',
      },
      {
        source: '/login-pembaca',
        destination: '/login-reader',
      },
      {
        source: '/daftar-artikel',
        destination: '/article-list',
      },
      {
        source: '/beli-artikel',
        destination: '/buy-article',
      },
      {
        source: '/detail-artikel',
        destination: '/article-details',
      },
      {
        source: '/ganti-password',
        destination: '/forgot-password',
      },
      {
        source: '/verifikasi/',
        destination: '/verification/',
      },
      {
        source: '/dashboard-penulis',
        destination: '/writer-dashboard',
      },
      {
        source: '/dashboard-penulis/edit-artikel',
        destination: '/writer-dashboard/edit-article',
      },
      {
        source: '/dashboard-penulis/daftar-artikel',
        destination: '/writer-dashboard/article-list',
      },
      {
        source: '/dashboard-penulis/buat-artikel',
        destination: '/writer-dashboard/create-article',
      },
    ];
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

module.exports = { ...nextConfig, ...lessConfig }
