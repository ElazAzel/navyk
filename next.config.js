/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Ensure proper configuration for Vercel deployment
  swcMinify: true,
  images: {
    domains: ["navyk.kz"],
    remotePatterns: []
  }
}

module.exports = nextConfig