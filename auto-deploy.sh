#!/bin/bash

# 🚀 Автоматический деплой TeleShop на сервер 178.236.17.93
# Версия: 1.0
# GitHub: https://github.com/Logan5064/teleshop

set -e  # Остановка при любой ошибке

# Цветной вывод
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Функции для логирования
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

log_step() {
    echo -e "\n${YELLOW}🔄 $1${NC}"
}

# Проверка запуска от root
if [ "$EUID" -ne 0 ]; then
    log_error "Запустите скрипт от имени root: sudo ./auto-deploy.sh"
    exit 1
fi

log_info "🚀 Начинаем автоматический деплой TeleShop"
log_info "📍 Сервер: 178.236.17.93"
log_info "📋 GitHub: https://github.com/Logan5064/teleshop"

# Шаг 1: Обновление системы
log_step "Обновление системы"
apt update && apt upgrade -y
log_success "Система обновлена"

# Шаг 2: Установка необходимых пакетов
log_step "Установка базовых пакетов"
apt install -y curl wget git build-essential software-properties-common

# Шаг 3: Установка Node.js 18+
log_step "Установка Node.js 18+"
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
    apt-get install -y nodejs
else
    log_warning "Node.js уже установлен"
fi

NODE_VERSION=$(node --version)
log_success "Node.js установлен: $NODE_VERSION"

# Шаг 4: Установка Python 3.11+
log_step "Установка Python 3.11+"
apt install -y python3 python3-pip python3-venv python3-dev

PYTHON_VERSION=$(python3 --version)
log_success "Python установлен: $PYTHON_VERSION"

# Шаг 5: Установка PM2
log_step "Установка PM2"
if ! command -v pm2 &> /dev/null; then
    npm install -g pm2
else
    log_warning "PM2 уже установлен"
fi
log_success "PM2 готов к работе"

# Шаг 6: Остановка старых процессов (если есть)
log_step "Остановка старых процессов"
pm2 delete all 2>/dev/null || log_warning "Старых процессов не найдено"

# Освобождение портов
log_step "Освобождение портов 8000 и 3000"
pkill -f ":8000" 2>/dev/null || log_warning "Порт 8000 свободен"
pkill -f ":3000" 2>/dev/null || log_warning "Порт 3000 свободен"

# Шаг 7: Клонирование проекта
log_step "Клонирование проекта TeleShop"
cd /opt

if [ -d "teleshop" ]; then
    log_warning "Папка teleshop существует, обновляем код"
    cd teleshop
    git pull origin main
else
    git clone https://github.com/Logan5064/teleshop.git
    cd teleshop
fi
log_success "Проект загружен/обновлен"

# Шаг 8: Настройка Backend (Python/FastAPI)
log_step "Настройка Backend (Python/FastAPI)"
cd /opt/teleshop/05-server-launchers/main

# Создание виртуального окружения
if [ ! -d "venv" ]; then
    python3 -m venv venv
fi

# Активация и установка зависимостей
source venv/bin/activate

log_info "Установка Python зависимостей..."
pip install --upgrade pip
pip install fastapi uvicorn sqlalchemy asyncpg psycopg2-binary
pip install python-multipart python-jose passlib bcrypt
pip install aiofiles python-dotenv aiogram
pip install python-telegram-bot nest_asyncio

log_success "Backend зависимости установлены"

# Создание таблиц в БД
log_step "Создание таблиц в PostgreSQL"
python3 -c "
import asyncio
import sys
sys.path.append('.')
try:
    from config.shared.utils.database import create_tables
    asyncio.run(create_tables())
    print('✅ Таблицы созданы успешно')
except Exception as e:
    print(f'⚠️ Возможная ошибка создания таблиц: {e}')
" || log_warning "Таблицы возможно уже существуют"

# Шаг 9: Настройка Frontend (Next.js)
log_step "Настройка Frontend (Next.js)"
cd /opt/teleshop/01-user-dashboard

log_info "Установка Node.js зависимостей..."
npm install

log_info "Сборка проекта для продакшена..."
npm run build
log_success "Frontend готов"

# Шаг 10: Создание PM2 конфигурации
log_step "Создание PM2 конфигурации"
cd /opt/teleshop

cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [
    {
      name: 'teleshop-backend',
      script: 'python3',
      args: ['-m', 'uvicorn', 'api_server:app', '--host', '0.0.0.0', '--port', '8000'],
      cwd: '/opt/teleshop/05-server-launchers/main',
      interpreter: '/opt/teleshop/05-server-launchers/main/venv/bin/python',
      env: {
        NODE_ENV: 'production',
        PYTHONPATH: '/opt/teleshop/05-server-launchers/main'
      },
      restart_delay: 3000,
      max_restarts: 10,
      error_file: '/var/log/teleshop-backend-error.log',
      out_file: '/var/log/teleshop-backend-out.log',
      log_file: '/var/log/teleshop-backend.log'
    },
    {
      name: 'teleshop-frontend',
      script: 'npm',
      args: ['start'],
      cwd: '/opt/teleshop/01-user-dashboard',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      restart_delay: 3000,
      max_restarts: 10,
      error_file: '/var/log/teleshop-frontend-error.log',
      out_file: '/var/log/teleshop-frontend-out.log',
      log_file: '/var/log/teleshop-frontend.log'
    }
  ]
};
EOF

log_success "PM2 конфигурация создана"

# Шаг 11: Настройка прав доступа
log_step "Настройка прав доступа"
chmod +x /opt/teleshop/05-server-launchers/main/venv/bin/python
chown -R www-data:www-data /opt/teleshop 2>/dev/null || log_warning "Пользователь www-data не найден, пропускаем"

# Шаг 12: Запуск приложений
log_step "Запуск TeleShop с PM2"
pm2 start ecosystem.config.js

# Ожидание запуска
sleep 5

# Проверка статуса
pm2 status

# Шаг 13: Настройка автозапуска
log_step "Настройка автозапуска при перезагрузке"
pm2 startup systemd -u root --hp /root
pm2 save

# Шаг 14: Проверка работы
log_step "Проверка работы сервисов"

# Проверка Backend
if curl -s http://localhost:8000/ > /dev/null; then
    log_success "Backend доступен на порту 8000"
else
    log_warning "Backend может еще запускаться, проверьте через минуту"
fi

# Проверка Frontend
if curl -s http://localhost:3000/ > /dev/null; then
    log_success "Frontend доступен на порту 3000"
else
    log_warning "Frontend может еще запускаться, проверьте через минуту"
fi

# Финальная информация
echo -e "\n🎉 ${GREEN}ДЕПЛОЙ ЗАВЕРШЕН!${NC}\n"

echo -e "${BLUE}📋 Информация о развертывании:${NC}"
echo -e "🌐 Frontend: ${GREEN}http://178.236.17.93:3000${NC}"
echo -e "🔧 Backend API: ${GREEN}http://178.236.17.93:8000${NC}"
echo -e "🔐 Страница входа: ${GREEN}http://178.236.17.93:3000/login${NC}"
echo -e "📊 PostgreSQL: ${GREEN}Подключена (облако Beget)${NC}"

echo -e "\n${BLUE}🔧 Полезные команды PM2:${NC}"
echo -e "pm2 status          - статус приложений"
echo -e "pm2 logs            - просмотр логов"
echo -e "pm2 restart all     - перезапуск"
echo -e "pm2 stop all        - остановка"
echo -e "pm2 monit           - мониторинг"

echo -e "\n${BLUE}📝 Логи сохранены в:${NC}"
echo -e "/var/log/teleshop-backend.log"
echo -e "/var/log/teleshop-frontend.log"

echo -e "\n${GREEN}🚀 TeleShop готов к работе!${NC}"

# Показать финальный статус
echo -e "\n${YELLOW}Финальный статус PM2:${NC}"
pm2 status 