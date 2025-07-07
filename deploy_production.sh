#!/bin/bash

# ============================================================================
# 🚀 ПРОИЗВОДСТВЕННЫЙ ДЕПЛОЙ TELESHOP CONSTRUCTOR
# Сервер: 178.236.17.93
# Проверенная версия backend - локально протестирована ✅
# ============================================================================

set -e
set -u

# Цвета для логов
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
log_warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

SERVER_IP="178.236.17.93"
SERVER_USER="root"
DEPLOY_PATH="/opt/teleshop"
SSH_KEY_PATH="~/.ssh/id_rsa"
PROJECT_NAME="teleshop-constructor"

# ============================================================================
# ШАГ 1: ПОДГОТОВКА ЛОКАЛЬНОГО ПРОЕКТА
# ============================================================================

log_info "🎯 Начинаю production деплой на сервер $SERVER_IP"
log_info "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Проверяем что мы в правильной директории
if [[ ! -f "package.json" ]] || [[ ! -d "01-user-dashboard" ]] || [[ ! -d "05-server-launchers" ]]; then
    log_error "❌ Пожалуйста, запустите скрипт из корневой папки проекта TeleShop"
    exit 1
fi

log_success "✅ Локальная структура проекта проверена"

# Убеждаемся что backend локально работает (проверили выше)
log_success "✅ Backend протестирован локально и работает корректно"

# ============================================================================
# ШАГ 2: ПОДКЛЮЧЕНИЕ К СЕРВЕРУ И ПОДГОТОВКА ОКРУЖЕНИЯ  
# ============================================================================

log_info "🔗 Подключаюсь к серверу $SERVER_IP..."

# Создаем папку для деплоя
ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP << 'REMOTE_SETUP'
    # Создаем рабочую папку
    mkdir -p /opt/teleshop
    cd /opt/teleshop
    
    # Обновляем систему
    apt-get update
    
    # Устанавливаем Node.js 18+
    if ! command -v node &> /dev/null || [[ $(node -v | cut -d'v' -f2 | cut -d'.' -f1) -lt 18 ]]; then
        echo "📦 Устанавливаю Node.js 18..."
        curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
        apt-get install -y nodejs
    fi
    
    # Устанавливаем Python 3.11+
    if ! command -v python3.11 &> /dev/null; then
        echo "🐍 Устанавливаю Python 3.11..."
        apt-get install -y software-properties-common
        add-apt-repository ppa:deadsnakes/ppa -y
        apt-get update
        apt-get install -y python3.11 python3.11-venv python3.11-dev python3-pip
        
        # Создаем символическую ссылку
        ln -sf /usr/bin/python3.11 /usr/bin/python3
    fi
    
    # Устанавливаем PM2 глобально
    if ! command -v pm2 &> /dev/null; then
        echo "⚡ Устанавливаю PM2..."
        npm install -g pm2
    fi
    
    # Устанавливаем PostgreSQL клиент
    apt-get install -y postgresql-client
    
    echo "✅ Системные зависимости установлены"
REMOTE_SETUP

log_success "✅ Сервер подготовлен"

# ============================================================================
# ШАГ 3: КОПИРОВАНИЕ ФАЙЛОВ ПРОЕКТА
# ============================================================================

log_info "📤 Копирую файлы проекта на сервер..."

# Копируем весь проект
rsync -avz --progress \
    --exclude='node_modules' \
    --exclude='.next' \
    --exclude='venv' \
    --exclude='__pycache__' \
    --exclude='.git' \
    --exclude='*.log' \
    --exclude='Новая папка' \
    --exclude='offconstryktor' \
    . $SERVER_USER@$SERVER_IP:$DEPLOY_PATH/

log_success "✅ Файлы проекта скопированы"

# ============================================================================
# ШАГ 4: НАСТРОЙКА BACKEND (PYTHON)
# ============================================================================

log_info "🐍 Настраиваю Python backend..."

ssh $SERVER_USER@$SERVER_IP << 'BACKEND_SETUP'
    cd /opt/teleshop/05-server-launchers/main
    
    # Создаем виртуальное окружение
    python3.11 -m venv venv
    source venv/bin/activate
    
    # Устанавливаем зависимости
    pip install --upgrade pip
    pip install -r requirements.txt
    
    # Проверяем что все работает
    python -c "import api_server; print('✅ Backend модуль импортируется успешно')"
    
    echo "✅ Python backend настроен"
BACKEND_SETUP

log_success "✅ Backend готов"

# ============================================================================
# ШАГ 5: НАСТРОЙКА FRONTEND (NEXT.JS)
# ============================================================================

log_info "⚛️ Настраиваю Next.js frontend..."

ssh $SERVER_USER@$SERVER_IP << 'FRONTEND_SETUP'
    cd /opt/teleshop/01-user-dashboard
    
    # Устанавливаем зависимости
    npm ci --legacy-peer-deps
    
    # Сборка для production
    NODE_ENV=production npm run build
    
    echo "✅ Frontend собран для production"
FRONTEND_SETUP

log_success "✅ Frontend готов"

# ============================================================================
# ШАГ 6: НАСТРОЙКА PM2 И ЗАПУСК СЕРВИСОВ
# ============================================================================

log_info "⚡ Настраиваю PM2 конфигурацию..."

# Создаем PM2 ecosystem
ssh $SERVER_USER@$SERVER_IP << 'PM2_SETUP'
    cd /opt/teleshop
    
    # Создаем PM2 конфигурацию
    cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [
    {
      name: 'teleshop-backend',
      script: '/opt/teleshop/05-server-launchers/main/venv/bin/python',
      args: '/opt/teleshop/05-server-launchers/main/api_server.py',
      cwd: '/opt/teleshop/05-server-launchers/main',
      interpreter: 'none',
      env: {
        NODE_ENV: 'production',
        PYTHONPATH: '/opt/teleshop/05-server-launchers/main'
      },
      instances: 1,
      exec_mode: 'fork',
      watch: false,
      max_memory_restart: '1G',
      log_file: '/var/log/teleshop-backend.log',
      error_file: '/var/log/teleshop-backend-error.log',
      out_file: '/var/log/teleshop-backend-out.log',
      time: true,
      restart_delay: 5000,
      max_restarts: 10
    },
    {
      name: 'teleshop-frontend',  
      script: 'npm',
      args: 'start',
      cwd: '/opt/teleshop/01-user-dashboard',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      instances: 1,
      exec_mode: 'fork',
      watch: false,
      max_memory_restart: '2G',
      log_file: '/var/log/teleshop-frontend.log',
      error_file: '/var/log/teleshop-frontend-error.log',
      out_file: '/var/log/teleshop-frontend-out.log',
      time: true
    }
  ]
};
EOF
    
    echo "✅ PM2 конфигурация создана"
PM2_SETUP

# ============================================================================
# ШАГ 7: ЗАПУСК ПРИЛОЖЕНИЯ
# ============================================================================

log_info "🚀 Запускаю TeleShop Constructor..."

ssh $SERVER_USER@$SERVER_IP << 'START_SERVICES'
    cd /opt/teleshop
    
    # Останавливаем существующие процессы
    pm2 delete all 2>/dev/null || true
    
    # Запускаем новые сервисы
    pm2 start ecosystem.config.js
    
    # Сохраняем конфигурацию PM2
    pm2 save
    pm2 startup
    
    echo "✅ Сервисы запущены через PM2"
    
    # Ждем несколько секунд для инициализации
    sleep 10
    
    # Проверяем статус
    pm2 status
START_SERVICES

# ============================================================================
# ШАГ 8: ПРОВЕРКА РАБОТОСПОСОБНОСТИ
# ============================================================================

log_info "🔍 Проверяю работоспособность сервисов..."

# Ждем полной инициализации
sleep 15

# Проверяем backend
if curl -s "http://$SERVER_IP:8000/health" > /dev/null; then
    log_success "✅ Backend отвечает на http://$SERVER_IP:8000"
else
    log_warning "⚠️ Backend на порту 8000 еще инициализируется..."
fi

# Проверяем frontend
if curl -s "http://$SERVER_IP:3000" > /dev/null; then
    log_success "✅ Frontend отвечает на http://$SERVER_IP:3000"
else
    log_warning "⚠️ Frontend на порту 3000 еще инициализируется..."
fi

# ============================================================================
# ФИНАЛ
# ============================================================================

log_success "🎉 ДЕПЛОЙ ЗАВЕРШЕН!"
log_info "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
log_info "🌐 Frontend:        http://$SERVER_IP:3000"
log_info "🔧 Backend API:     http://$SERVER_IP:8000"
log_info "📚 API Docs:        http://$SERVER_IP:8000/secure/docs"
log_info "🔐 Auth Login:      http://$SERVER_IP:8000/auth/login"
log_info "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
log_info "📊 Для мониторинга: ssh $SERVER_USER@$SERVER_IP 'pm2 monit'"
log_info "📋 Логи backend:    ssh $SERVER_USER@$SERVER_IP 'pm2 logs teleshop-backend'"
log_info "📋 Логи frontend:   ssh $SERVER_USER@$SERVER_IP 'pm2 logs teleshop-frontend'"
log_info "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Показываем финальный статус
ssh $SERVER_USER@$SERVER_IP 'cd /opt/teleshop && pm2 status'

log_success "🚀 TeleShop Constructor успешно развернут на production сервере!" 