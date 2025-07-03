# 🎯 Промты для Cursor AI - TeleShop Constructor

**Дата создания:** 25 июня 2025  
**Автор:** Manus AI  
**Назначение:** Ускорение разработки через AI-ассистента

## 📋 Общие промты для понимания проекта

### Промт 1: Контекст проекта
```
Ты работаешь над проектом TeleShop Constructor - это платформа для создания Telegram магазинов с drag-and-drop конструктором. Проект использует:

Frontend: React 19 + Next.js 15 + TypeScript + Tailwind CSS
Backend: Python 3.12 + FastAPI + SQLAlchemy + PostgreSQL
Telegram: aiogram для ботов

Основная цель: создать "Tilda для Telegram" - простой конструктор магазинов для Telegram Web Apps.

Структура проекта:
- /backend - FastAPI сервер с API
- /frontend/teleshop-admin - Next.js админ панель
- /scripts - утилиты и лаунчеры
- /docs - документация

Всегда учитывай эту архитектуру при написании кода и предложениях.
```

### Промт 2: Стиль кодирования
```
При написании кода для TeleShop Constructor следуй этим принципам:

1. TypeScript везде где возможно с строгой типизацией
2. Используй современные React паттерны (hooks, functional components)
3. Tailwind CSS для стилизации с custom компонентами
4. Pydantic модели для валидации данных в Python
5. Async/await для всех асинхронных операций
6. Подробные комментарии для сложной логики
7. Обработка ошибок с пользовательскими сообщениями
8. Responsive дизайн для всех компонентов

Всегда проверяй совместимость с существующим кодом.
```

## 🔧 Промты для Backend разработки

### Промт 3: PostgreSQL интеграция
```
Помоги настроить PostgreSQL для TeleShop Constructor. Используй эти данные:

database = default_db
username = cloud_user  
password = u61e&ke&!Ty1
host = ladixoofilad.beget.app:5432

Нужно:
1. Создать connection string для SQLAlchemy
2. Настроить connection pooling
3. Создать базовые модели для пользователей, магазинов, ботов
4. Добавить миграции Alembic
5. Обеспечить безопасность подключения

Учти что проект multi-tenant - каждый пользователь видит только свои данные.
```

### Промт 4: API эндпоинты
```
Создай безопасные API эндпоинты для TeleShop Constructor:

Требования:
- Все эндпоинты защищены авторизацией
- Изоляция данных пользователей
- Валидация через Pydantic
- Обработка ошибок с понятными сообщениями
- Логирование важных действий
- Rate limiting для защиты

Используй существующую систему авторизации через временные коды из Telegram.
Следуй паттерну /secure/ для защищенных эндпоинтов.
```

### Промт 5: Telegram Bot Engine
```
Разработай движок для автоматического создания и управления Telegram ботами:

Функции:
1. Автоматическое создание бота через BotFather API
2. Настройка webhook'ов для обработки сообщений  
3. Генерация интерфейса бота на основе конструктора
4. Обработка команд и inline кнопок
5. Интеграция с платежными системами
6. Аналитика взаимодействий

Используй aiogram 3.x и async/await паттерны.
Обеспечь масштабируемость для множества ботов.
```

## ⚛️ Промты для Frontend разработки

### Промт 6: Конструктор блоков
```
Улучши drag-and-drop конструктор для TeleShop Constructor:

Текущие блоки: header, banner, text, button, products, cart, search, reviews

Нужно добавить:
1. Новые типы блоков (форма заказа, галерея, видео, карта)
2. Продвинутые настройки для каждого блока
3. Систему шаблонов для быстрого создания
4. Улучшенный предпросмотр с responsive режимами
5. Копирование/вставка блоков
6. Группировка блоков

Используй React DnD, TypeScript, Tailwind CSS.
Обеспечь производительность при большом количестве блоков.
```

### Промт 7: UI компоненты
```
Создай современные UI компоненты для TeleShop Constructor:

Стиль: Современный, минималистичный, с акцентом на usability
Цвета: Синий (#3B82F6) как primary, серый для нейтральных элементов
Компоненты: кнопки, формы, модальные окна, уведомления, карточки

Требования:
- Полная типизация TypeScript
- Responsive дизайн
- Accessibility (ARIA labels, keyboard navigation)
- Анимации через Framer Motion
- Темная/светлая тема
- Состояния loading/error/success

Используй Headless UI как основу и Tailwind для стилизации.
```

### Промт 8: Система аналитики
```
Разработай дашборд аналитики для владельцев магазинов:

Метрики:
- Посетители и конверсия
- Популярные товары
- География пользователей  
- Воронка продаж
- Доходы и средний чек

Компоненты:
- Интерактивные графики (Recharts)
- Real-time обновления
- Фильтры по периодам
- Экспорт данных
- Сравнение периодов

Используй React, TypeScript, Recharts для графиков.
Обеспечь быструю загрузку больших объемов данных.
```

## 🎨 Промты для дизайна и UX

### Промт 9: Пользовательский опыт
```
Улучши UX для TeleShop Constructor:

Проблемы:
- Сложный onboarding для новых пользователей
- Недостаток подсказок в конструкторе
- Отсутствие guided tours
- Неочевидные функции

Решения:
1. Пошаговый onboarding с интерактивными туториалами
2. Contextual подсказки и tooltips
3. Система помощи с поиском
4. Демо-магазин для изучения возможностей
5. Прогресс-бар для мотивации завершения настройки

Используй современные UX паттерны и микроанимации.
```

### Промт 10: Мобильная адаптация
```
Адаптируй TeleShop Constructor для мобильных устройств:

Приоритеты:
1. Конструктор должен работать на планшетах
2. Предпросмотр оптимизирован для телефонов
3. Админ панель адаптивна для всех экранов
4. Touch-friendly интерфейс

Особенности:
- Drag-and-drop на touch устройствах
- Компактные элементы управления
- Swipe жесты для навигации
- Оптимизация производительности

Используй Tailwind responsive классы и touch events.
```

## 🔐 Промты для безопасности

### Промт 11: Система авторизации
```
Улучши систему авторизации TeleShop Constructor:

Текущая система: временные коды через Telegram бот

Улучшения:
1. Refresh токены для длительных сессий
2. Rate limiting для защиты от брутфорса
3. Логирование подозрительной активности
4. 2FA для админских аккаунтов
5. Session management с возможностью отзыва

Требования безопасности:
- Шифрование sensitive данных
- HTTPS везде
- Secure cookies
- CSRF защита
- Input validation

Используй современные стандарты безопасности.
```

### Промт 12: Защита данных
```
Реализуй защиту пользовательских данных:

GDPR compliance:
1. Согласие на обработку данных
2. Право на удаление данных
3. Экспорт пользовательских данных
4. Уведомления о нарушениях

Техническая защита:
- Шифрование БД
- Аудит доступа к данным
- Backup с шифрованием
- Изоляция данных между пользователями

Создай систему управления согласиями и privacy настройками.
```

## 💳 Промты для платежных систем

### Промт 13: Telegram Payments
```
Интегрируй Telegram Payments в TeleShop Constructor:

Функциональность:
1. Создание invoice для товаров
2. Обработка successful_payment
3. Управление shipping options
4. Возвраты и отмены
5. Webhook обработка платежей

Требования:
- Поддержка множественных валют
- Налоги и скидки
- Inventory management
- Автоматические уведомления
- Интеграция с аналитикой

Используй aiogram для работы с Telegram API.
Обеспечь надежность обработки платежей.
```

### Промт 14: Stripe интеграция
```
Добавь Stripe для международных платежей:

Возможности:
1. Subscription billing для тарифных планов
2. One-time платежи для товаров
3. Multi-party payments для marketplace
4. Fraud detection
5. Webhook обработка

Компоненты:
- Stripe Elements для форм оплаты
- Customer portal для управления подписками
- Invoice generation
- Payment methods management
- Dispute handling

Используй Stripe API v2023 и следуй best practices.
```

## 📊 Промты для аналитики

### Промт 15: Система метрик
```
Создай comprehensive систему аналитики:

Product metrics:
- User engagement (DAU, MAU, retention)
- Feature adoption
- Conversion funnels
- Performance metrics

Business metrics:
- MRR, churn, LTV
- Customer acquisition cost
- Revenue per user
- Market penetration

Technical metrics:
- API response times
- Error rates
- System uptime
- Database performance

Используй современные инструменты для сбора и визуализации метрик.
```

### Промт 16: A/B тестирование
```
Реализуй платформу для A/B тестирования:

Возможности:
1. Создание экспериментов через UI
2. Автоматическое разделение трафика
3. Статистическая значимость
4. Multivariate тестирование
5. Feature flags

Интеграция:
- Встроенные эксперименты в конструкторе
- Тестирование email кампаний
- Landing page optimization
- Pricing experiments

Обеспечь статистическую корректность и простоту использования.
```

## 🚀 Промты для развертывания

### Промт 17: Docker контейнеризация
```
Контейнеризируй TeleShop Constructor:

Компоненты:
1. Frontend (Next.js)
2. Backend (FastAPI)
3. PostgreSQL
4. Redis для кэширования
5. Nginx как reverse proxy

Требования:
- Multi-stage builds для оптимизации
- Health checks для всех сервисов
- Secrets management
- Environment-specific конфигурации
- Logging и monitoring

Создай docker-compose для development и production.
```

### Промт 18: CI/CD pipeline
```
Настрой автоматизированный CI/CD:

Этапы:
1. Code quality checks (linting, type checking)
2. Automated testing (unit, integration, e2e)
3. Security scanning
4. Build и packaging
5. Deployment в staging/production

Инструменты:
- GitHub Actions или GitLab CI
- Automated testing с Jest/Pytest
- Security scanning с Snyk
- Container registry
- Blue-green deployment

Обеспечь быстрые и надежные релизы.
```

## 🎯 Промты для оптимизации

### Промт 19: Производительность
```
Оптимизируй производительность TeleShop Constructor:

Frontend:
- Code splitting и lazy loading
- Image optimization
- Bundle size reduction
- Caching strategies
- Service workers

Backend:
- Database query optimization
- API response caching
- Connection pooling
- Async processing
- CDN для статики

Мониторинг:
- Core Web Vitals
- API response times
- Database performance
- User experience metrics

Используй современные инструменты профилирования.
```

### Промт 20: Масштабирование
```
Подготовь архитектуру для масштабирования:

Горизонтальное масштабирование:
1. Stateless приложения
2. Load balancing
3. Database sharding
4. Microservices architecture
5. Message queues

Вертикальное масштабирование:
- Resource optimization
- Caching layers
- Database indexing
- Connection pooling

Мониторинг и автоскейлинг:
- Metrics collection
- Alerting systems
- Auto-scaling policies
- Capacity planning

Спроектируй для роста до 100k+ пользователей.
```

## 📚 Промты для документации

### Промт 21: API документация
```
Создай comprehensive API документацию:

Содержание:
1. Authentication и authorization
2. Все эндпоинты с примерами
3. Error codes и handling
4. Rate limiting
5. Webhooks документация

Формат:
- OpenAPI/Swagger спецификация
- Interactive documentation
- Code examples в разных языках
- Postman коллекция
- SDK documentation

Обеспечь актуальность и полноту документации.
```

### Промт 22: Пользовательская документация
```
Напиши документацию для пользователей:

Разделы:
1. Getting started guide
2. Конструктор - пошаговые инструкции
3. Настройка ботов
4. Платежные системы
5. Аналитика и отчеты
6. FAQ и troubleshooting

Формат:
- Интерактивные туториалы
- Видео инструкции
- Screenshots с аннотациями
- Searchable knowledge base
- Multi-language support

Сделай документацию понятной для нетехнических пользователей.
```

## 🎨 Заключительные рекомендации

При использовании этих промтов в Cursor:

1. **Контекст важен** - всегда начинай с промта о контексте проекта
2. **Итеративный подход** - используй промты поэтапно, не пытайся сделать все сразу
3. **Проверяй совместимость** - убеждайся что новый код интегрируется с существующим
4. **Тестируй изменения** - каждое изменение должно быть протестировано
5. **Документируй решения** - веди changelog важных изменений

Эти промты помогут ускорить разработку и обеспечить высокое качество кода. Адаптируй их под конкретные задачи и особенности проекта.

