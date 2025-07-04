module.exports = {
  apps: [
    {
      name: 'teleshop-frontend',
      cwd: './01-user-dashboard',
      script: 'npm',
      args: 'start',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        NEXT_PUBLIC_API_URL: 'http://77.73.232.46:8000',
        NEXT_PUBLIC_CONSTRUCTOR_URL: 'http://77.73.232.46:3001'
      },
      error_file: './logs/frontend-error.log',
      out_file: './logs/frontend-out.log',
      log_file: './logs/frontend-combined.log',
      time: true
    },
    {
      name: 'teleshop-constructor',
      cwd: './offconstryktor',
      script: 'npm',
      args: 'start',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
        NEXT_PUBLIC_API_URL: 'http://77.73.232.46:8000'
      },
      error_file: './logs/constructor-error.log',
      out_file: './logs/constructor-out.log',
      log_file: './logs/constructor-combined.log',
      time: true
    },
    {
      name: 'teleshop-backend',
      cwd: './05-server-launchers/main',
      script: 'main_secure_fixed.py',
      interpreter: './venv/bin/python',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      env: {
        PYTHONPATH: '/root/sitetest/05-server-launchers/main:/root/sitetest/05-server-launchers/config',
        FRONTEND_URL: 'http://77.73.232.46:3000',
        CONSTRUCTOR_URL: 'http://77.73.232.46:3001'
      },
      error_file: './logs/backend-error.log',
      out_file: './logs/backend-out.log',
      log_file: './logs/backend-combined.log',
      time: true
    },
    {
      name: 'teleshop-auth-bot',
      cwd: './05-server-launchers/bots',
      script: 'auth_bot.py',
      interpreter: 'python3',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '256M',
      env: {
        FRONTEND_URL: 'http://77.73.232.46:3000',
        PYTHONPATH: '/var/www/teleshop/05-server-launchers/config'
      },
      error_file: './logs/auth-bot-error.log',
      out_file: './logs/auth-bot-out.log',
      log_file: './logs/auth-bot-combined.log',
      time: true
    }
  ]
}; 