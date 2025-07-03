# 🤖 TeleShop Auth Bot

Независимый компонент для авторизации пользователей через Telegram.

## Описание
- Telegram бот: @odnorazki_by_bot  
- PostgreSQL база: ladixoofilad.beget.app:5432
- Генерирует 6-значные коды авторизации
- Коды действуют 15 минут

## Установка зависимостей
```bash
pip install -r requirements.txt
```

## Запуск
```bash
python postgres_auth_bot.py
```

## Использование
1. Пользователь заходит к @odnorazki_by_bot
2. Нажимает "🔑 Получить код"
3. Получает 6-значный код
4. Вводит код на http://localhost:3000
5. Получает доступ к TeleShop Constructor 