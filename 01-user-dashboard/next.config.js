/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    externalDir: true,
    serverComponentsExternalPackages: ['pg']
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  webpack: (config, { dev, isServer }) => {
    if (!isServer) {
      config.externals = config.externals || {};
      config.externals.pg = 'commonjs pg';
    }
    
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          ...config.optimization.splitChunks,
          chunks: 'all',
        }
      }
    }
    return config
  },
  trailingSlash: false,
  poweredByHeader: false,
  
  async rewrites() {
    return []
  },
  async redirects() {
    return []
  },
  output: 'standalone'
};

module.exports = nextConfig; 