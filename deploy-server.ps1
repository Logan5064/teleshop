Write-Host "🚀 Деплой TeleShop Constructor на сервер..." -ForegroundColor Green

# Создаем команды для выполнения на сервере
$commands = @"
echo "📂 Переходим в папку проекта...";
cd /var/www/teleshop;

echo "🔄 Получаем последние изменения...";
git pull origin main;

echo "📦 Устанавливаем зависимости для фронтенда...";
cd 01-user-dashboard;
npm install;

echo "🔨 Собираем фронтенд...";
npm run build;

echo "📦 Устанавливаем зависимости для конструктора...";
cd ../offconstryktor;
npm install;

echo "🔨 Собираем конструктор...";
npm run build;

echo "📂 Возвращаемся в корень проекта...";
cd ..;

echo "🔄 Останавливаем все процессы PM2...";
pm2 stop all;

echo "🚀 Запускаем все процессы с новой конфигурацией...";
pm2 start ecosystem-server.config.js;

echo "📊 Показываем статус процессов...";
pm2 status;

echo "✅ Деплой завершен!";
"@

# Выполняем команды на сервере
ssh -i teleshop-beget-key cloud_user@77.73.232.46 $commands

Write-Host "🎉 Деплой на сервер завершен!" -ForegroundColor Green 