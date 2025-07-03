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
        PORT: 3000
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
        PORT: 3001
      },
      error_file: './logs/constructor-error.log',
      out_file: './logs/constructor-out.log',
      log_file: './logs/constructor-combined.log',
      time: true
    },
    {
      name: 'teleshop-backend',
      cwd: './05-server-launchers/main',
      script: 'python3',
      args: 'simple_backend.py',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      interpreter: 'python3',
      env: {
        PYTHONPATH: '.',
        PYTHON_ENV: 'production'
      },
      error_file: './logs/backend-error.log',
      out_file: './logs/backend-out.log',
      log_file: './logs/backend-combined.log',
      time: true
    },
    {
      name: 'teleshop-auth-bot',
      cwd: './auth-bot',
      script: 'python3',
      args: 'simple_auth_bot.py',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '256M',
      interpreter: 'python3',
      env: {
        PYTHONPATH: '.',
        PYTHON_ENV: 'production'
      },
      error_file: './logs/auth-bot-error.log',
      out_file: './logs/auth-bot-out.log',
      log_file: './logs/auth-bot-combined.log',
      time: true
    }
  ],

  deploy: {
    production: {
      user: 'ubuntu',
      host: 'your-server.com',
      ref: 'origin/main',
      repo: 'https://github.com/yourusername/teleshop-constructor.git',
      path: '/var/www/teleshop',
      'pre-deploy-local': '',
      'post-deploy': 'npm install --prefix 01-user-dashboard && npm install --prefix offconstryktor && npm run build --prefix 01-user-dashboard && npm run build --prefix offconstryktor && pm2 reload ecosystem.config.js --env production',
      'pre-setup': 'mkdir -p logs'
    }
  }
};
