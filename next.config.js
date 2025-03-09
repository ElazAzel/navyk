/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Ensure proper configuration for Vercel deployment
  swcMinify: true,
  images: {
    domains: ["navyk.kz"],
    remotePatterns: [],
    unoptimized: true
  },
  // Настройка для правильной работы на Vercel
  output: 'standalone'
}

module.exports = nextConfig