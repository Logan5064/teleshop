# 🏗️ TeleShop Constructor - Новая архитектура

## 📋 Обзор
Полнофункциональный конструктор для создания Telegram магазинов с drag & drop интерфейсом.

## 🎯 Основные возможности
- **25+ блоков** для создания шаблонов
- **Drag & Drop** перетаскивание блоков
- **Автосохранение** каждые 2 секунды
- **Undo/Redo** система (50 шагов истории)
- **Система шаблонов** (готовые магазины)
- **Предпросмотр** в реальном времени
- **Копирование/Вставка** блоков
- **Горячие клавиши** (Ctrl+Z, Ctrl+Y, Ctrl+C, Ctrl+V)

## 📁 Структура проекта

```
offconstryktor/
├── 📂 blocks/                     # БЛОКИ ДЛЯ ШАБЛОНОВ
│   ├── 📂 basic/                  # Базовые блоки
│   │   ├── BannerBlock.tsx
│   │   ├── ButtonBlock.tsx
│   │   ├── TextBlock.tsx
│   │   └── index.ts
│   ├── 📂 headers/                # Заголовки (8 вариантов)
│   │   ├── HeaderBlock.tsx
│   │   ├── Header002SearchBlock.tsx
│   │   ├── Header004NotificationsBlock.tsx
│   │   └── index.ts
│   ├── 📂 commerce/               # E-commerce блоки
│   │   ├── ProductsBlock.tsx
│   │   ├── ProductCardBlock.tsx
│   │   ├── CartBlock.tsx
│   │   ├── CategoryFilterBlock.tsx
│   │   └── index.ts
│   ├── 📂 content/                # Контентные блоки
│   │   ├── GalleryBlock.tsx
│   │   ├── VideoBlock.tsx
│   │   ├── ReviewsBlock.tsx
│   │   └── index.ts
│   ├── 📂 forms/                  # Формы и поиск
│   │   ├── FormBlock.tsx
│   │   ├── SearchBlock.tsx
│   │   └── index.ts
│   ├── 📂 interactive/            # Интерактивные блоки
│   │   ├── MapBlock.tsx
│   │   └── index.ts
│   └── index.ts                   # Экспорт всех блоков
├── 📂 components/                 # КОМПОНЕНТЫ КОНСТРУКТОРА
│   ├── 📂 panels/                 # Панели интерфейса
│   │   ├── BlockSelector.tsx      # Левая панель - выбор блоков
│   │   ├── PreviewPanel.tsx       # Центральная панель - предпросмотр
│   │   ├── SettingsPanel.tsx      # Правая панель - настройки
│   │   ├── TopPanel.tsx           # Верхняя панель - управление
│   │   └── index.ts
│   ├── 📂 ui/                     # UI компоненты
│   │   ├── DraggableBlock.tsx     # Перетаскиваемый блок
│   │   ├── SortableBlockItem.tsx  # Сортируемый элемент
│   │   ├── HelpTooltip.tsx        # Подсказки
│   │   └── index.ts
│   ├── 📂 modals/                 # Модальные окна
│   │   ├── TemplateSelector.tsx   # Выбор шаблонов
│   │   └── index.ts
│   └── index.ts                   # Экспорт всех компонентов
├── 📂 core/                       # ЛОГИКА И НАСТРОЙКИ
│   ├── 📂 config/                 # Конфигурация
│   │   ├── blockDefaults.ts       # Настройки блоков по умолчанию
│   │   ├── templates.ts           # Готовые шаблоны магазинов
│   │   ├── categories.ts          # Категории блоков
│   │   └── index.ts
│   ├── 📂 hooks/                  # React хуки
│   │   ├── useAutoSave.ts         # Автосохранение
│   │   ├── useUndoRedo.ts         # Undo/Redo
│   │   ├── useDragDrop.ts         # Drag & Drop
│   │   ├── useClipboard.ts        # Копирование/Вставка
│   │   └── index.ts
│   ├── 📂 services/               # Сервисы
│   │   ├── constructorApi.ts      # API конструктора
│   │   ├── templateService.ts     # Работа с шаблонами
│   │   ├── blockService.ts        # Работа с блоками
│   │   └── index.ts
│   └── 📂 utils/                  # Утилиты
│       ├── blockUtils.ts          # Утилиты для блоков
│       ├── dragUtils.ts           # Утилиты drag & drop
│       ├── storageUtils.ts        # Работа с localStorage
│       └── index.ts
├── 📂 types/                      # ТИПЫ TYPESCRIPT
│   ├── blocks.ts                  # Типы блоков
│   ├── constructor.ts             # Типы конструктора
│   ├── api.ts                     # API типы
│   └── index.ts
├── 📂 styles/                     # СТИЛИ
│   ├── constructor.css            # Стили конструктора
│   ├── blocks.css                 # Стили блоков
│   ├── animations.css             # Анимации
│   └── index.css                  # Главный файл стилей
├── 📂 templates/                  # ГОТОВЫЕ ШАБЛОНЫ
│   ├── e-commerce.ts              # E-commerce шаблон
│   ├── landing.ts                 # Лендинг шаблон
│   ├── catalog.ts                 # Каталог шаблон
│   └── index.ts
├── 📂 docs/                       # ДОКУМЕНТАЦИЯ
│   ├── BLOCKS_GUIDE.md            # Руководство по блокам
│   ├── API_REFERENCE.md           # Справочник API
│   ├── TEMPLATES_GUIDE.md         # Руководство по шаблонам
│   └── DEVELOPMENT.md             # Для разработчиков
├── package.json                   # Зависимости
├── tsconfig.json                  # TypeScript конфигурация
├── next.config.js                 # Next.js конфигурация
└── README.md                      # Этот файл
```

## 🧩 Где что добавлять

### ➕ Добавление нового блока
```
1. Создать компонент в `blocks/[category]/NewBlock.tsx`
2. Добавить тип в `types/blocks.ts`
3. Добавить настройки в `core/config/blockDefaults.ts`
4. Экспортировать в `blocks/[category]/index.ts`
5. Добавить в общий `blocks/index.ts`
```

### ⚙️ Настройки блоков
- **Дефолтные значения**: `core/config/blockDefaults.ts`
- **Категории**: `core/config/categories.ts`
- **Шаблоны**: `templates/` и `core/config/templates.ts`

### 🎨 Стили
- **Конструктор**: `styles/constructor.css`
- **Блоки**: `styles/blocks.css`
- **Анимации**: `styles/animations.css`

### 🔧 Логика
- **Хуки**: `core/hooks/`
- **Сервисы**: `core/services/`
- **Утилиты**: `core/utils/`

## 🚀 Технологии
- **React 19** + **TypeScript**
- **Next.js 15**
- **Tailwind CSS** + **TeleShop Design System**
- **Framer Motion** для анимаций
- **React DnD** для drag & drop

## 📝 Примеры использования

### Добавление блока в категорию
```typescript
// blocks/commerce/NewProductBlock.tsx
import { BaseBlockProps } from '@/types'

export default function NewProductBlock({ id, data }: BaseBlockProps) {
  return (
    <div className="ts-card">
      {/* Ваш блок здесь */}
    </div>
  )
}
```

### Создание шаблона
```typescript
// templates/my-template.ts
export const myTemplate = {
  id: 'my-template',
  name: 'Мой шаблон',
  description: 'Описание шаблона',
  blocks: [
    { type: 'header', data: { title: 'Заголовок' } },
    { type: 'banner', data: { title: 'Баннер' } }
  ]
}
```

## ✅ Чек-лист внедрения
- [ ] Перенести все 25 блоков в новую структуру
- [ ] Настроить конфигурации и типы
- [ ] Перенести компоненты конструктора
- [ ] Настроить стили TeleShop Design System
- [ ] Перенести систему шаблонов
- [ ] Настроить сборку и зависимости
- [ ] Протестировать все функции
- [ ] Написать документацию

---
*Структура создана для максимальной ясности и расширяемости проекта.* 