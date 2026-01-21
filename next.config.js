/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Explicit build ID generation to prevent "generate is not a function" errors
  generateBuildId: async () => {
    return `build-${Date.now()}`
  },
  // Optimize for production
  swcMinify: true,
  // Webpack configuration for client-side libraries
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
      }
    }
    return config
  },
}

module.exports = nextConfig

