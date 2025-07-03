# 🎨 TeleShop Constructor - Backend

Backend модуль конструктора для создания Telegram магазинов.

## 🏗️ Архитектура

```
04-constructor/
├── backend/
│   └── bot_engine/             # Система рендеринга для Telegram
│       ├── blocks/             # Handlebars шаблоны блоков
│       │   ├── blocks.js       # JavaScript рендеринг
│       │   ├── header.hbs      # Шаблон заголовка
│       │   ├── banner.hbs      # Шаблон баннера
│       │   ├── button.hbs      # Шаблон кнопки
│       │   ├── products.hbs    # Шаблон товаров
│       │   └── text.hbs        # Шаблон текста
│       ├── templates/          # HTML шаблоны Web App
│       │   ├── shop.html       # Главный шаблон магазина (677 строк)
│       │   └── shop-blocks.html # Дополнительные блоки
│       ├── api/                # API для ботов
│       ├── models/             # Модели данных
│       └── schemas/            # Схемы валидации
└── templates/                  # Дополнительные шаблоны
```

## 🎯 Назначение

Backend отвечает за:

- **🎨 Рендеринг блоков** - преобразование JSON конструктора в HTML
- **📱 Telegram Web App** - создание интерфейса для ботов
- **🧩 Система блоков** - JavaScript + Handlebars шаблоны
- **⚡ API для ботов** - интеграция с Telegram Bot API
- **🗄️ Модели данных** - структуры для хранения дизайнов

## 🔧 Интеграция

Работает с:
- **Frontend:** `01-user-dashboard/teleshop-admin/src/app/constructor/` - UI конструктора
- **Backend:** `05-server-launchers/` - FastAPI сервер
- **Database:** PostgreSQL через SQLAlchemy
- **Telegram:** Bot API + Web App

## 📋 Система блоков

### Handlebars шаблоны:
- `header.hbs` - заголовки и hero секции
- `banner.hbs` - рекламные баннеры
- `button.hbs` - кнопки действий
- `products.hbs` - каталоги товаров
- `text.hbs` - текстовые блоки

### JavaScript рендеринг:
- `blocks.js` - функции рендеринга блоков
- `header.js` - дополнительная логика для заголовков

## 🎨 Шаблоны Web App

### `shop.html` (677 строк)
Главный шаблон для рендеринга магазина в Telegram Web App:
- Поддержка всех типов блоков
- Responsive дизайн
- Интеграция с Telegram API
- Обработка покупок и взаимодействий

### `shop-blocks.html` (573 строки)
Дополнительные блоки и компоненты:
- Расширенные макеты
- Специальные эффекты
- Дополнительная логика

## 🚀 Использование

Backend запускается автоматически с основным сервером:

```bash
cd 05-server-launchers/main
python main_secure.py
```

Рендеринг доступен через API:
- `/api/shops/{shop_id}` - получение данных магазина
- `/api/designs/shop/{shop_id}` - получение дизайна
- `/shop/{shop_id}` - рендеринг Web App

## 🎯 Frontend

Frontend конструктора теперь находится в:
`01-user-dashboard/teleshop-admin/src/app/constructor/`

Это обеспечивает:
- ✅ Один Next.js сервер вместо двух
- ✅ Единая авторизация
- ✅ Общие компоненты и стили
- ✅ Простое развертывание

## 📄 Лицензия

Проект TeleShop Constructor - 2024 