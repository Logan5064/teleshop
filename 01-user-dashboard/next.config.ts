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
  // Прокси для конструктора (обновлено для продакшн)
  async rewrites() {
    return [
      {
        source: '/constructor/:path*',
        destination: 'http://77.73.232.46:3001/:path*',
      },
      {
        source: '/constructor',
        destination: 'http://77.73.232.46:3001/constructor',
      }
    ]
  },
  // Убираем строгие CSP правила для стабильности
  output: 'standalone'
};

export default nextConfig;
