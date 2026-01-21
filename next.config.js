/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Explicitly set build ID generation to prevent "generate is not a function" error
  generateBuildId: async () => {
    // Use timestamp for build ID
    return 'build-' + Date.now()
  },
  // Allow serving binary files from public directory
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      }
    }
    return config
  },
}

module.exports = nextConfig

