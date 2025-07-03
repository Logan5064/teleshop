import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Разрешаем импорты из внешних папок
    externalDir: true,
  },
  eslint: {
    // Отключаем ESLint проверки при билде для production
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Игнорируем TypeScript ошибки при билде (только для demo)
    ignoreBuildErrors: false,
  },
  // Конфигурация webpack (очищена от старых путей)
  webpack: (config, { isServer }) => {
    // Убрали алиасы конструктора т.к. он теперь интегрирован в основной проект
    return config
  },
  // Прокси для конструктора
  async rewrites() {
    return [
      {
        source: '/constructor/:path*',
        destination: 'http://localhost:3001/:path*',
      },
      {
        source: '/constructor',
        destination: 'http://localhost:3001/constructor',
      }
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-eval' 'unsafe-inline';
              style-src 'self' 'unsafe-inline';
              img-src 'self' data: blob: https:;
              font-src 'self' data:;
              connect-src 'self' http://localhost:8000 http://localhost:3001 ws://localhost:3000 ws://localhost:3001;
              frame-src 'self';
            `.replace(/\s{2,}/g, ' ').trim()
          }
        ]
      }
    ]
  }
};

export default nextConfig;
