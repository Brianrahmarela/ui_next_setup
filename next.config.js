/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cf.shopee.co.id'], // Daftar domain yang diizinkan untuk digunakan dengan komponen <Image> dari Next.js
  },
  // webpack: (config) => {
  //   // Custom Webpack config jika perlu
  //   return config;
  // },
};

const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',        // Tempat penyimpanan service worker dan file lainnya
  register: true,        // Mendaftarkan Service Worker secara otomatis
  skipWaiting: true,     // Memaksa Service Worker untuk menunggu dan mengaktifkan versi baru
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp)$/i,  // Caching untuk gambar
      handler: 'CacheFirst',
      options: {
        cacheName: 'images',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 60 * 60 * 24 * 365, // Cache gambar selama 1 tahun
        },
      },
    },
    {
      urlPattern: /^https:\/\/.*\.(?:js|css)$/i,  // Caching untuk file js dan css
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'assets',
        expiration: {
          maxEntries: 50,
        },
      },
    },
  ],
});

module.exports = withPWA(nextConfig);
