# Тест SSH-соединения с сервером
Write-Host "🔑 Тестирование SSH-соединения..." -ForegroundColor Green

# Параметры подключения
$SERVER = "178.236.17.95"
$USER = "root"
$KEY_FILE = "teleshop-deploy-key"

# Проверка наличия ключа
if (!(Test-Path $KEY_FILE)) {
    Write-Host "❌ Приватный ключ $KEY_FILE не найден!" -ForegroundColor Red
    exit 1
}

Write-Host "📋 Подключение к серверу: $USER@$SERVER" -ForegroundColor Yellow

# Попытка подключения
try {
    # Исправляем права доступа для Windows
    icacls $KEY_FILE /inheritance:r /grant:r "$($env:USERNAME):R"
    
    # Тестируем подключение
    ssh -i $KEY_FILE -o StrictHostKeyChecking=no -o ConnectTimeout=10 $USER@$SERVER "echo 'SSH connection successful!'; whoami; pwd; ls -la"
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ SSH-соединение успешно!" -ForegroundColor Green
    } else {
        Write-Host "❌ SSH-соединение не удалось!" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Ошибка подключения: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "🔧 Если соединение не удалось, добавьте публичный ключ на сервер:" -ForegroundColor Yellow
Write-Host "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAICtNDNV4RVrelqH2teVFNGwlkrOlI4+qwwVlkTCheFZA gtx@DESKTOP-2BTLV5D" -ForegroundColor Cyan 