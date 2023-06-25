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
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc'
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
        source: '/verifikasi/:token',
        destination: '/verification/:token',
      },
      {
        source: '/dashboard-penulis',
        destination: '/writer-dashboard',
      },
      {
        source: '/dashboard-penulis/edit-artikel/:id',
        destination: '/writer-dashboard/edit-article/:id',
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
  async redirects() {
    return [
      {
        source: '/verification/:token',
        destination: '/verifikasi/:token',
        permanent: true,
      },
      {
        source: '/detail-artikel/:id',
        destination: '/article-details:id',
        permanent: true
      },
    ]
  }
}

module.exports = { ...nextConfig }
