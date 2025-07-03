/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Отключаем ESLint проверки при билде для production
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Игнорируем TypeScript ошибки при билде (только для demo)
    ignoreBuildErrors: false,
  },
  
  // Production конфигурация
  trailingSlash: false,
  poweredByHeader: false,
  
  // Webpack оптимизации
  webpack: (config, { dev, isServer }) => {
    // Оптимизации для production
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
  // Устанавливаем порт 3001 для конструктора
  env: {
    PORT: '3001'
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