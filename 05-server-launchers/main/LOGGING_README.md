# 📊 Система логирования TeleShop Constructor

## 🎯 **Возможности**

### ✅ **Backend API логирование:**
- **Цветные логи** в консоли с разными уровнями
- **Детальное логирование авторизации** (коды, сессии, ошибки)
- **API операции** с информацией о пользователях и IP
- **Ошибки с полным traceback** для отладки
- **Структурированные сообщения** с timestamp и контекстом

### ✅ **Frontend API логирование:**
- **Подробные логи запросов** с IP и User-Agent
- **Время выполнения** запросов к backend
- **Детальные ошибки** с типами (connection_failed, json_parse_error, etc.)
- **Валидация входных данных** с логированием

### ✅ **Централизованная конфигурация:**
- **3 готовых режима:** development, production, debug
- **Цветной вывод** для удобства разработки
- **Сохранение в файлы** для продакшена
- **Настройка уровней** для разных компонентов

## 🚀 **Как использовать**

### **1. Backend API логи:**
```python
from logging_config import get_logger
logger = get_logger("your_module")

logger.info("✅ Операция успешна")
logger.warning("⚠️ Предупреждение") 
logger.error("❌ Ошибка")
```

### **2. Просмотр логов:**
```bash
# Запуск API с цветными логами
cd 05-server-launchers/main
python main_secure.py

# Логи авторизации:
✅ AUTH SUCCESS | User ID: 123 | Telegram: 987654321 | Type: user_code_auth | IP: 127.0.0.1
🔍 CODE VERIFICATION START | Code: 123456 | IP: 127.0.0.1 | UA: Mozilla/5.0...
🎫 SESSION CREATED | User ID: 123 | Telegram ID: 987654321 | Token: abc123... | Expires: 24h

# Логи API операций:
🌐 POST /api/auth/login | User: login_attempt | IP: 127.0.0.1 | UA: Mozilla/5.0...
🤖 BOT CREATE ATTEMPT | User: ID:123|TG:987654321 | Bot name: My Shop | Token: 1234567890...
```

### **3. Frontend API логи:**
```bash
# В консоли браузера (F12):
[2025-01-27T18:30:15.123Z] 🌐 FRONTEND API REQUEST | LOGIN ATTEMPT | POST /api/auth/login | IP: 127.0.0.1 | UA: Mozilla/5.0...
🔑 LOGIN REQUEST | Code provided: YES | Code length: 6
🌐 BACKEND REQUEST | URL: http://localhost:8000/api/auth/login | Code: 123456
📡 BACKEND RESPONSE | Status: 200 | Time: 1250ms
✅ LOGIN SUCCESS | Session token length: 64 | Expires in: 86400s
```

## 🔧 **Конфигурация**

### **Режимы логирования:**

```python
# Разработка (по умолчанию)
setup_development_logging()  # INFO, цветной вывод, без файлов

# Продакшен
setup_production_logging()   # WARNING, без цветов, сохранение в файлы

# Отладка  
setup_debug_logging()        # DEBUG, цветной вывод + файлы
```

### **Кастомная настройка:**
```python
setup_logging(
    level="DEBUG",           # DEBUG, INFO, WARNING, ERROR, CRITICAL
    log_to_file=True,       # Сохранять в файл
    log_file="my_logs.log", # Путь к файлу
    colored_output=True     # Цветной вывод
)
```

## 📋 **Примеры логов**

### **Успешная авторизация:**
```
2025-01-27 18:30:15 - auth_system - INFO - 🔍 CODE VERIFICATION START | Code: 123456 | IP: 127.0.0.1 | UA: Mozilla/5.0...
2025-01-27 18:30:15 - auth_system - INFO - 📋 CODE FOUND | Code: 123456 | Telegram ID: 987654321 | Created: 2025-01-27 18:25:15 | Expires: 2025-01-27 18:40:15
2025-01-27 18:30:15 - auth_system - INFO - ✅ CODE MARKED AS USED | Code: 123456 | Telegram ID: 987654321
2025-01-27 18:30:15 - auth_system - INFO - 👤 USER PROCESSED | User ID: 123 | Telegram ID: 987654321 | Username: john_doe
2025-01-27 18:30:15 - auth_system - INFO - 🎫 SESSION CREATED | User ID: 123 | Telegram ID: 987654321 | Token: abc123... | Expires: 24h
2025-01-27 18:30:15 - secure_api - INFO - ✅ AUTH SUCCESS | User ID: 123 | Telegram: 987654321 | Type: user_code_auth | IP: 127.0.0.1
```

### **Ошибка авторизации:**
```
2025-01-27 18:30:15 - auth_system - WARNING - ❌ CODE NOT FOUND | Code: 999999 | IP: 127.0.0.1
2025-01-27 18:30:15 - secure_api - ERROR - ❌ AUTH ERROR | Type: http_exception | Details: Code: 999999 | Error: Неверный код | IP: 127.0.0.1 | UA: Mozilla/5.0...
```

### **Создание бота:**
```
2025-01-27 18:30:15 - secure_api - INFO - 🌐 POST /api/secure/bots | User: ID:123|TG:987654321 | IP: 127.0.0.1 | UA: Mozilla/5.0...
2025-01-27 18:30:15 - secure_api - INFO - 🤖 BOT CREATE ATTEMPT | User: ID:123|TG:987654321 | Bot name: My Awesome Shop | Token: 1234567890...
2025-01-27 18:30:15 - secure_api - INFO - ✅ BOT CREATED SUCCESS | User: ID:123|TG:987654321 | Bot ID: 456 | Name: My Awesome Shop
```

## ⚙️ **Файлы системы логирования**

- `logging_config.py` - основная конфигурация
- `main_secure.py` - использование в main API
- `secure_api.py` - логирование API эндпоинтов  
- `db_code_auth.py` - логирование авторизации
- `login/route.ts` - логирование frontend API

## 🎨 **Цветовая схема:**

- 🔵 **DEBUG** - Cyan (детальная отладка)
- 🟢 **INFO** - Green (обычная информация)  
- 🟡 **WARNING** - Yellow (предупреждения)
- 🔴 **ERROR** - Red (ошибки)
- 🟣 **CRITICAL** - Magenta (критические ошибки)

---

**Теперь все ошибки и операции логируются подробно для быстрой диагностики проблем!** 🚀 