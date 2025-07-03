/** @type {import('next').NextConfig} */
const nextConfig = {
  // Устанавливаем порт 3001 для конструктора
  env: {
    PORT: '3001'
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname, './src'),
      '@/blocks': require('path').resolve(__dirname, './blocks'),
      '@/components': require('path').resolve(__dirname, './components'),
      '@/core': require('path').resolve(__dirname, './core'),
      '@/types': require('path').resolve(__dirname, './types'),
      '@/styles': require('path').resolve(__dirname, './styles'),
      '@/templates': require('path').resolve(__dirname, './templates'),
    }
    return config
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/constructor',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig 