# 💻 Концепция разработки кода UI блоков для TeleShop Constructor

**Дата:** 25 июня 2025  
**Автор:** Manus AI  
**Цель:** Разработка унифицированной концепции кодирования для настраиваемых UI блоков конструктора, обеспечивающей гибкость, адаптивность и простоту интеграции.

## 💡 Общие принципы кодирования блоков

При разработке кода блоков мы будем придерживаться следующих принципов:

1.  **Компонентный подход (React/TypeScript):** Каждый блок будет представлять собой отдельный React-компонент, написанный на TypeScript, что обеспечит строгую типизацию, переиспользуемость и легкую поддержку.
2.  **Настраиваемость через Props:** Все настройки блока (цвет, шрифт, отступы, содержимое) будут передаваться через `props`. Это позволит конструктору динамически изменять внешний вид и поведение блоков без изменения их исходного кода.
3.  **Адаптивность через CSS-in-JS или CSS Modules:** Для стилизации будут использоваться подходы, позволяющие легко управлять адаптивностью и динамическими стилями (например, `styled-components`, `Emotion` или `CSS Modules` с переменными).
4.  **Чистая архитектура:** Разделение логики представления (UI) и бизнес-логики. Блоки должны быть "глупыми" компонентами, которые получают данные и настройки через `props` и отображают их.
5.  **Тестируемость:** Код блоков должен быть легко тестируемым, что обеспечит стабильность и надежность.
6.  **Производительность:** Оптимизация рендеринга и минимизация перерисовок для обеспечения плавной работы конструктора и конечного бота.

## ⚙️ Структура данных для настроек блоков (Props Interface)

Каждый блок будет иметь свой интерфейс `Props`, который будет описывать все доступные для настройки параметры. Общие параметры, такие как цвета, типографика, отступы, будут вынесены в базовый интерфейс.

```typescript
// Базовый интерфейс для всех блоков
interface BaseBlockProps {
  id: string; // Уникальный ID блока
  // Общие настройки стиля
  styles?: {
    backgroundColor?: string;
    textColor?: string;
    primaryColor?: string;
    secondaryColor?: string;
    accentColor?: string;
    borderRadius?: string; // e.g., '8px', '50%'
    padding?: string; // e.g., '16px 24px'
    margin?: string; // e.g., '0 0 20px 0'
    boxShadow?: string; // e.g., '0px 4px 8px rgba(0, 0, 0, 0.1)'
  };
  // Общие настройки типографики
  typography?: {
    fontFamily?: string;
    h1Size?: string;
    h2Size?: string;
    bodySize?: string;
    captionSize?: string;
  };
  // Настройки адаптивности (для разных брейкпоинтов)
  responsive?: {
    mobile?: {
      padding?: string;
      columns?: number;
    };
    tablet?: {
      padding?: string;
      columns?: number;
    };
  };
  // Возможность скрытия блока
  isHidden?: boolean;
  // Дополнительные CSS классы или стили
  className?: string;
  style?: React.CSSProperties;
}

// Пример интерфейса для конкретного блока (например, ProductCard)
interface ProductCardProps extends BaseBlockProps {
  product: {
    id: string;
    name: string;
    price: number;
    oldPrice?: number;
    imageUrl: string;
    description?: string;
    rating?: number;
    reviewsCount?: number;
    buttonText?: string;
  };
  layout?: 'default' | 'compact' | 'fullWidth';
  showDescription?: boolean;
  showRating?: boolean;
  buttonVariant?: 'primary' | 'outline' | 'text';
  imageAspectRatio?: '1:1' | '4:3' | '16:9';
}
```

## 🏗️ Пример структуры файла блока

Каждый блок будет находиться в своей папке, содержащей основной компонент, файл настроек (если они сложные) и, возможно, стили.

```
src/
  blocks/
    ProductCard/
      index.tsx       // Основной React компонент блока
      settings.ts     // Описание настроек для UI конструктора
      styles.module.css // Или styled-components, Emotion
    CategoryList/
      index.tsx
      settings.ts
    ...
```

## 🧩 Примеры кода для настраиваемых компонентов

### Пример: Базовый компонент кнопки с кастомизацией

Этот компонент будет использоваться внутри многих блоков и демонстрирует, как можно передавать настройки стиля через `props`.

```typescript
// components/Button/index.tsx
import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  color?: string; // Основной цвет кнопки
  textColor?: string;
  borderRadius?: string;
  padding?: string;
  fullWidth?: boolean;
  // ... другие стили из BaseBlockProps
}

const StyledButton = styled.button<ButtonProps>`
  display: ${props => (props.fullWidth ? 'block' : 'inline-block')};
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  padding: ${props => props.padding || (props.size === 'small' ? '8px 12px' : props.size === 'large' ? '16px 24px' : '12px 18px')};
  border: none;
  border-radius: ${props => props.borderRadius || '8px'};
  cursor: pointer;
  font-family: ${props => props.typography?.fontFamily || 'Inter, sans-serif'};
  font-size: ${props => props.size === 'small' ? '14px' : props.size === 'large' ? '18px' : '16px'};
  font-weight: 600;
  text-align: center;
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;

  ${props => {
    switch (props.variant) {
      case 'outline':
        return `
          background-color: transparent;
          color: ${props.color || props.textColor || '#3B82F6'};
          border: 2px solid ${props.color || '#3B82F6'};
          &:hover {
            background-color: ${props.color || '#3B82F6'};
            color: ${props.textColor || '#FFFFFF'};
          }
        `;
      case 'text':
        return `
          background-color: transparent;
          color: ${props.color || props.textColor || '#3B82F6'};
          &:hover {
            text-decoration: underline;
          }
        `;
      case 'primary':
      default:
        return `
          background-color: ${props.color || '#3B82F6'};
          color: ${props.textColor || '#FFFFFF'};
          &:hover {
            background-color: ${props.color ? darken(0.1, props.color) : darken(0.1, '#3B82F6')};
          }
        `;
    }
  }}
`;

// Вспомогательная функция для затемнения цвета (для примера)
const darken = (percentage: number, color: string): string => {
  // Простая реализация для примера, в реальном проекте использовать библиотеку типа 'polished'
  return color; 
};

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

export default Button;
```

### Пример: Базовый компонент Image с адаптивностью и Aspect Ratio

```typescript
// components/Image/index.tsx
import React from 'react';
import styled from 'styled-components';

interface ImageProps {
  src: string;
  alt: string;
  aspectRatio?: '1:1' | '4:3' | '16:9' | 'auto';
  borderRadius?: string;
  objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
  width?: string; // e.g., '100%', '200px'
  height?: string; // e.g., 'auto', '150px'
}

const ImageWrapper = styled.div<Pick<ImageProps, 'aspectRatio' | 'width' | 'height'>>`
  width: ${props => props.width || '100%'};
  height: ${props => props.height || 'auto'};
  ${props => props.aspectRatio !== 'auto' && `
    position: relative;
    padding-bottom: ${props.aspectRatio === '1:1' ? '100%' : props.aspectRatio === '4:3' ? '75%' : '56.25%'};
    height: 0;
  `}
`;

const StyledImage = styled.img<Pick<ImageProps, 'borderRadius' | 'objectFit' | 'aspectRatio'>>`
  display: block;
  width: 100%;
  height: 100%;
  border-radius: ${props => props.borderRadius || '0px'};
  object-fit: ${props => props.objectFit || 'cover'};
  ${props => props.aspectRatio !== 'auto' && `
    position: absolute;
    top: 0;
    left: 0;
  `}
`;

const Image: React.FC<ImageProps> = ({ src, alt, ...props }) => {
  return (
    <ImageWrapper aspectRatio={props.aspectRatio} width={props.width} height={props.height}>
      <StyledImage src={src} alt={alt} {...props} />
    </ImageWrapper>
  );
};

export default Image;
```

## 🚀 Следующие шаги

На основе этой концепции мы приступим к разработке кода для конкретных блоков, начиная с карточек товаров и категорий. Каждый блок будет сопровождаться описанием его `Props` и примерами использования.

