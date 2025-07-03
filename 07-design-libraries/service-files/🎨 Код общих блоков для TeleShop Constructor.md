# 🎨 Код общих блоков для TeleShop Constructor

**Дата:** 25 июня 2025  
**Автор:** Manus AI  
**Цель:** Разработка полного набора настраиваемых общих блоков для конструктора TeleShop, включая баннеры, заголовки, футеры и CTA элементы.

## 📋 Обзор общих блоков

Общие блоки являются фундаментальными элементами любого интерфейса e-commerce приложения. Они обеспечивают структуру, навигацию и призывы к действию, которые направляют пользователей через воронку продаж. В рамках конструктора TeleShop мы создадим разнообразные варианты каждого типа блока, обеспечивая максимальную гибкость для создания уникальных дизайнов.

Основные категории общих блоков, которые мы разработаем:

1. **Баннеры (Banners)** - промо-баннеры, объявления, акции
2. **Заголовки (Headers)** - навигационные панели, логотипы, меню
3. **Футеры (Footers)** - информационные блоки, ссылки, контакты
4. **CTA блоки (Call-to-Action)** - кнопки действий, формы подписки
5. **Разделители (Dividers)** - визуальные разделители контента
6. **Текстовые блоки (Text Blocks)** - заголовки, параграфы, списки
7. **Медиа блоки (Media Blocks)** - изображения, видео, галереи

## 🎯 Базовые интерфейсы для общих блоков

Определим базовые интерфейсы, которые будут использоваться во всех общих блоках.

```typescript
// types/CommonBlocks.ts
export interface BannerData {
  id: string;
  title?: string;
  subtitle?: string;
  description?: string;
  imageUrl?: string;
  backgroundImageUrl?: string;
  ctaText?: string;
  ctaUrl?: string;
  ctaAction?: () => void;
  badge?: {
    text: string;
    type: 'new' | 'sale' | 'hot' | 'limited';
    color?: string;
  };
  countdown?: {
    endDate: Date;
    showDays?: boolean;
    showHours?: boolean;
    showMinutes?: boolean;
  };
}

export interface HeaderData {
  id: string;
  logo?: {
    imageUrl?: string;
    text?: string;
    url?: string;
  };
  navigation?: {
    items: Array<{
      id: string;
      label: string;
      url?: string;
      action?: () => void;
      children?: Array<{
        id: string;
        label: string;
        url?: string;
        action?: () => void;
      }>;
    }>;
  };
  actions?: {
    search?: boolean;
    cart?: boolean;
    profile?: boolean;
    menu?: boolean;
  };
  cartCount?: number;
}

export interface FooterData {
  id: string;
  logo?: {
    imageUrl?: string;
    text?: string;
  };
  description?: string;
  sections?: Array<{
    id: string;
    title: string;
    links: Array<{
      id: string;
      label: string;
      url?: string;
      action?: () => void;
    }>;
  }>;
  social?: Array<{
    id: string;
    platform: 'telegram' | 'instagram' | 'facebook' | 'twitter' | 'youtube' | 'whatsapp';
    url: string;
    icon?: string;
  }>;
  contacts?: {
    phone?: string;
    email?: string;
    address?: string;
    workingHours?: string;
  };
  copyright?: string;
}

export interface CTAData {
  id: string;
  title?: string;
  description?: string;
  buttonText: string;
  buttonAction?: () => void;
  buttonUrl?: string;
  secondaryButtonText?: string;
  secondaryButtonAction?: () => void;
  imageUrl?: string;
  iconName?: string;
  form?: {
    fields: Array<{
      id: string;
      type: 'text' | 'email' | 'phone' | 'textarea';
      placeholder: string;
      required?: boolean;
    }>;
    submitText: string;
    onSubmit?: (data: Record<string, string>) => void;
  };
}

// Базовые пропсы для всех общих блоков
export interface CommonBlockProps extends BaseBlockProps {
  // Настройки макета
  fullWidth?: boolean;
  maxWidth?: string;
  minHeight?: string;
  
  // Настройки фона
  backgroundType?: 'color' | 'gradient' | 'image';
  backgroundGradient?: {
    direction: string;
    colors: string[];
  };
  backgroundImage?: {
    url: string;
    position: string;
    size: string;
    repeat: string;
    overlay?: {
      color: string;
      opacity: number;
    };
  };
  
  // Настройки анимации
  animation?: {
    type: 'none' | 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale' | 'bounce';
    duration: string;
    delay?: string;
    trigger?: 'onLoad' | 'onScroll' | 'onHover';
  };
  
  // Настройки видимости
  visibility?: {
    mobile?: boolean;
    tablet?: boolean;
    desktop?: boolean;
  };
}
```

## 🎨 Стилизованные компоненты для общих блоков

Создадим набор базовых стилизованных компонентов для общих блоков.

```typescript
// components/CommonBlocks/styled.ts
import styled, { css, keyframes } from 'styled-components';
import { CommonBlockProps } from '../../types/CommonBlocks';

// Анимации
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { transform: translateY(30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const slideDown = keyframes`
  from { transform: translateY(-30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const slideLeft = keyframes`
  from { transform: translateX(30px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const slideRight = keyframes`
  from { transform: translateX(-30px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const scaleAnimation = keyframes`
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`;

const bounce = keyframes`
  0%, 20%, 53%, 80%, to { transform: translate3d(0,0,0); }
  40%, 43% { transform: translate3d(0, -30px, 0); }
  70% { transform: translate3d(0, -15px, 0); }
  90% { transform: translate3d(0, -4px, 0); }
`;

// Базовый контейнер для всех блоков
export const BlockContainer = styled.div<CommonBlockProps>`
  position: relative;
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  max-width: ${props => props.maxWidth || 'none'};
  min-height: ${props => props.minHeight || 'auto'};
  margin: ${props => props.styles?.margin || '0'};
  padding: ${props => props.styles?.padding || '0'};
  border-radius: ${props => props.styles?.borderRadius || '0'};
  overflow: hidden;

  // Фон
  ${props => {
    if (props.backgroundType === 'color') {
      return css`background-color: ${props.styles?.backgroundColor || 'transparent'};`;
    }
    if (props.backgroundType === 'gradient' && props.backgroundGradient) {
      return css`
        background: linear-gradient(
          ${props.backgroundGradient.direction || '135deg'},
          ${props.backgroundGradient.colors.join(', ')}
        );
      `;
    }
    if (props.backgroundType === 'image' && props.backgroundImage) {
      return css`
        background-image: url(${props.backgroundImage.url});
        background-position: ${props.backgroundImage.position || 'center'};
        background-size: ${props.backgroundImage.size || 'cover'};
        background-repeat: ${props.backgroundImage.repeat || 'no-repeat'};
      `;
    }
    return css`background-color: ${props.styles?.backgroundColor || 'transparent'};`;
  }}

  // Оверлей для фонового изображения
  ${props => props.backgroundType === 'image' && props.backgroundImage?.overlay && css`
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: ${props.backgroundImage.overlay.color};
      opacity: ${props.backgroundImage.overlay.opacity};
      z-index: 1;
    }
  `}

  // Анимации
  ${props => props.animation && props.animation.type !== 'none' && css`
    animation: ${
      props.animation.type === 'fadeIn' ? fadeIn :
      props.animation.type === 'slideUp' ? slideUp :
      props.animation.type === 'slideDown' ? slideDown :
      props.animation.type === 'slideLeft' ? slideLeft :
      props.animation.type === 'slideRight' ? slideRight :
      props.animation.type === 'scale' ? scaleAnimation :
      props.animation.type === 'bounce' ? bounce : fadeIn
    } ${props.animation.duration || '0.6s'} ease-out ${props.animation.delay || '0s'} both;
  `}

  // Адаптивная видимость
  ${props => props.visibility?.mobile === false && css`
    @media (max-width: 480px) {
      display: none;
    }
  `}

  ${props => props.visibility?.tablet === false && css`
    @media (min-width: 481px) and (max-width: 768px) {
      display: none;
    }
  `}

  ${props => props.visibility?.desktop === false && css`
    @media (min-width: 769px) {
      display: none;
    }
  `}

  // Контент поверх оверлея
  > * {
    position: relative;
    z-index: 2;
  }
`;

// Внутренний контейнер с ограничением ширины
export const InnerContainer = styled.div<{ maxWidth?: string; padding?: string }>`
  max-width: ${props => props.maxWidth || '1200px'};
  margin: 0 auto;
  padding: ${props => props.padding || '0 16px'};
  width: 100%;

  @media (max-width: 480px) {
    padding: ${props => props.padding || '0 12px'};
  }
`;

// Заголовок блока
export const BlockTitle = styled.h2<Pick<CommonBlockProps, 'typography' | 'styles'>>`
  margin: 0 0 16px 0;
  font-family: ${props => props.typography?.fontFamily || 'Inter, sans-serif'};
  font-size: ${props => props.typography?.titleSize || '32px'};
  font-weight: ${props => props.typography?.titleWeight || '700'};
  color: ${props => props.styles?.textColor || '#1F2937'};
  line-height: 1.2;
  text-align: center;

  @media (max-width: 480px) {
    font-size: ${props => props.typography?.titleSize ? `calc(${props.typography.titleSize} * 0.8)` : '24px'};
  }
`;

// Подзаголовок блока
export const BlockSubtitle = styled.h3<Pick<CommonBlockProps, 'typography' | 'styles'>>`
  margin: 0 0 12px 0;
  font-family: ${props => props.typography?.fontFamily || 'Inter, sans-serif'};
  font-size: ${props => props.typography?.subtitleSize || '20px'};
  font-weight: ${props => props.typography?.subtitleWeight || '600'};
  color: ${props => props.styles?.secondaryColor || '#6B7280'};
  line-height: 1.3;
  text-align: center;

  @media (max-width: 480px) {
    font-size: ${props => props.typography?.subtitleSize ? `calc(${props.typography.subtitleSize} * 0.9)` : '18px'};
  }
`;

// Описание блока
export const BlockDescription = styled.p<Pick<CommonBlockProps, 'typography' | 'styles'>>`
  margin: 0 0 24px 0;
  font-family: ${props => props.typography?.fontFamily || 'Inter, sans-serif'};
  font-size: ${props => props.typography?.descriptionSize || '16px'};
  color: ${props => props.styles?.textColor || '#4B5563'};
  line-height: 1.6;
  text-align: center;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 480px) {
    font-size: ${props => props.typography?.descriptionSize ? `calc(${props.typography.descriptionSize} * 0.9)` : '14px'};
  }
`;

// Кнопка CTA
export const CTAButton = styled.button<Pick<CommonBlockProps, 'styles' | 'typography'> & { 
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  border-radius: ${props => props.styles?.borderRadius || '8px'};
  font-family: ${props => props.typography?.fontFamily || 'Inter, sans-serif'};
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  width: ${props => props.fullWidth ? '100%' : 'auto'};

  // Размеры
  ${props => {
    switch (props.size) {
      case 'small':
        return css`
          padding: 8px 16px;
          font-size: 14px;
          min-height: 36px;
        `;
      case 'large':
        return css`
          padding: 16px 32px;
          font-size: 18px;
          min-height: 56px;
        `;
      default:
        return css`
          padding: 12px 24px;
          font-size: 16px;
          min-height: 48px;
        `;
    }
  }}

  // Варианты стилей
  ${props => {
    const primaryColor = props.styles?.primaryColor || '#3B82F6';
    const textColor = props.styles?.textColor || '#FFFFFF';
    
    switch (props.variant) {
      case 'secondary':
        return css`
          background-color: ${props.styles?.secondaryColor || '#6B7280'};
          color: ${textColor};
          
          &:hover {
            background-color: ${props.styles?.secondaryColor || '#6B7280'}dd;
            transform: translateY(-1px);
          }
        `;
      case 'outline':
        return css`
          background-color: transparent;
          color: ${primaryColor};
          border: 2px solid ${primaryColor};
          
          &:hover {
            background-color: ${primaryColor};
            color: ${textColor};
          }
        `;
      case 'ghost':
        return css`
          background-color: transparent;
          color: ${primaryColor};
          
          &:hover {
            background-color: ${primaryColor}20;
          }
        `;
      default:
        return css`
          background-color: ${primaryColor};
          color: ${textColor};
          
          &:hover {
            background-color: ${primaryColor}dd;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px ${primaryColor}40;
          }
        `;
    }
  }}

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 480px) {
    width: 100%;
    font-size: ${props => props.size === 'large' ? '16px' : props.size === 'small' ? '13px' : '15px'};
  }
`;

// Бейдж
export const Badge = styled.div<{ 
  type?: 'new' | 'sale' | 'hot' | 'limited';
  color?: string;
  size?: 'small' | 'medium' | 'large';
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  ${props => {
    switch (props.size) {
      case 'small':
        return css`
          padding: 2px 8px;
          font-size: 10px;
        `;
      case 'large':
        return css`
          padding: 6px 16px;
          font-size: 14px;
        `;
      default:
        return css`
          padding: 4px 12px;
          font-size: 12px;
        `;
    }
  }}

  ${props => {
    if (props.color) {
      return css`
        background-color: ${props.color};
        color: white;
      `;
    }
    
    switch (props.type) {
      case 'new':
        return css`
          background-color: #10B981;
          color: white;
        `;
      case 'sale':
        return css`
          background-color: #EF4444;
          color: white;
        `;
      case 'hot':
        return css`
          background-color: #F59E0B;
          color: white;
        `;
      case 'limited':
        return css`
          background-color: #8B5CF6;
          color: white;
        `;
      default:
        return css`
          background-color: #6B7280;
          color: white;
        `;
    }
  }}
`;

// Счетчик обратного отсчета
export const CountdownContainer = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  margin: 16px 0;

  @media (max-width: 480px) {
    gap: 8px;
  }
`;

export const CountdownItem = styled.div<Pick<CommonBlockProps, 'styles' | 'typography'>>`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${props => props.styles?.backgroundColor || '#1F2937'};
  color: ${props => props.styles?.textColor || '#FFFFFF'};
  border-radius: ${props => props.styles?.borderRadius || '8px'};
  padding: 12px 8px;
  min-width: 60px;

  @media (max-width: 480px) {
    padding: 8px 6px;
    min-width: 50px;
  }
`;

export const CountdownNumber = styled.div<Pick<CommonBlockProps, 'typography'>>`
  font-family: ${props => props.typography?.fontFamily || 'Inter, sans-serif'};
  font-size: ${props => props.typography?.titleSize || '24px'};
  font-weight: 700;
  line-height: 1;

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

export const CountdownLabel = styled.div<Pick<CommonBlockProps, 'typography'>>`
  font-family: ${props => props.typography?.fontFamily || 'Inter, sans-serif'};
  font-size: ${props => props.typography?.captionSize || '10px'};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 4px;
  opacity: 0.8;
`;

// Разделитель
export const Divider = styled.div<{
  type?: 'line' | 'dots' | 'wave' | 'zigzag';
  color?: string;
  thickness?: string;
  spacing?: string;
}>`
  width: 100%;
  margin: ${props => props.spacing || '32px'} 0;
  
  ${props => {
    const color = props.color || '#E5E7EB';
    const thickness = props.thickness || '1px';
    
    switch (props.type) {
      case 'dots':
        return css`
          height: ${thickness};
          background-image: radial-gradient(circle, ${color} 1px, transparent 1px);
          background-size: 8px 8px;
          background-repeat: repeat-x;
        `;
      case 'wave':
        return css`
          height: 4px;
          background-image: url("data:image/svg+xml,%3Csvg width='40' height='4' viewBox='0 0 40 4' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 2c10 0 10-2 20-2s10 2 20 2' stroke='${encodeURIComponent(color)}' stroke-width='${thickness}' fill='none'/%3E%3C/svg%3E");
          background-repeat: repeat-x;
        `;
      case 'zigzag':
        return css`
          height: 4px;
          background-image: url("data:image/svg+xml,%3Csvg width='20' height='4' viewBox='0 0 20 4' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 4L10 0L20 4' stroke='${encodeURIComponent(color)}' stroke-width='${thickness}' fill='none'/%3E%3C/svg%3E");
          background-repeat: repeat-x;
        `;
      default:
        return css`
          height: ${thickness};
          background-color: ${color};
        `;
    }
  }}
`;

// Сетка для макета
export const Grid = styled.div<{
  columns?: number;
  gap?: string;
  mobileColumns?: number;
  tabletColumns?: number;
}>`
  display: grid;
  grid-template-columns: repeat(${props => props.columns || 1}, 1fr);
  gap: ${props => props.gap || '24px'};

  @media (max-width: 480px) {
    grid-template-columns: repeat(${props => props.mobileColumns || 1}, 1fr);
    gap: ${props => props.gap || '16px'};
  }

  @media (min-width: 481px) and (max-width: 768px) {
    grid-template-columns: repeat(${props => props.tabletColumns || props.columns || 1}, 1fr);
  }
`;

// Флекс контейнер
export const FlexContainer = styled.div<{
  direction?: 'row' | 'column';
  align?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  gap?: string;
  wrap?: boolean;
}>`
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  align-items: ${props => props.align || 'center'};
  justify-content: ${props => props.justify || 'flex-start'};
  gap: ${props => props.gap || '16px'};
  flex-wrap: ${props => props.wrap ? 'wrap' : 'nowrap'};

  @media (max-width: 480px) {
    flex-direction: ${props => props.direction === 'row' ? 'column' : props.direction || 'column'};
    align-items: stretch;
  }
`;
```

## 🎯 Блок баннера: Промо-баннер

Универсальный промо-баннер с поддержкой различных макетов и элементов.

```typescript
// components/CommonBlocks/PromoBanner.tsx
import React, { useState, useEffect } from 'react';
import { BannerData, CommonBlockProps } from '../../types/CommonBlocks';
import {
  BlockContainer,
  InnerContainer,
  BlockTitle,
  BlockSubtitle,
  BlockDescription,
  CTAButton,
  Badge,
  CountdownContainer,
  CountdownItem,
  CountdownNumber,
  CountdownLabel,
  FlexContainer,
  Grid
} from './styled';

interface PromoBannerProps extends CommonBlockProps {
  data: BannerData;
  layout?: 'centered' | 'left' | 'right' | 'split' | 'overlay';
  showCountdown?: boolean;
  imagePosition?: 'left' | 'right' | 'background';
}

const PromoBanner: React.FC<PromoBannerProps> = ({
  data,
  layout = 'centered',
  showCountdown = false,
  imagePosition = 'right',
  styles = {},
  typography = {},
  ...props
}) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!showCountdown || !data.countdown) return;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = data.countdown!.endDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [showCountdown, data.countdown]);

  const handleCTAClick = () => {
    if (data.ctaAction) {
      data.ctaAction();
    } else if (data.ctaUrl) {
      window.open(data.ctaUrl, '_blank');
    }
  };

  const renderContent = () => (
    <div style={{ textAlign: layout === 'centered' ? 'center' : 'left' }}>
      {data.badge && (
        <Badge 
          type={data.badge.type} 
          color={data.badge.color}
          style={{ marginBottom: '16px' }}
        >
          {data.badge.text}
        </Badge>
      )}

      {data.title && (
        <BlockTitle typography={typography} styles={styles}>
          {data.title}
        </BlockTitle>
      )}

      {data.subtitle && (
        <BlockSubtitle typography={typography} styles={styles}>
          {data.subtitle}
        </BlockSubtitle>
      )}

      {data.description && (
        <BlockDescription typography={typography} styles={styles}>
          {data.description}
        </BlockDescription>
      )}

      {showCountdown && data.countdown && (
        <CountdownContainer>
          {data.countdown.showDays !== false && (
            <CountdownItem styles={styles} typography={typography}>
              <CountdownNumber typography={typography}>
                {timeLeft.days.toString().padStart(2, '0')}
              </CountdownNumber>
              <CountdownLabel typography={typography}>дней</CountdownLabel>
            </CountdownItem>
          )}
          {data.countdown.showHours !== false && (
            <CountdownItem styles={styles} typography={typography}>
              <CountdownNumber typography={typography}>
                {timeLeft.hours.toString().padStart(2, '0')}
              </CountdownNumber>
              <CountdownLabel typography={typography}>часов</CountdownLabel>
            </CountdownItem>
          )}
          {data.countdown.showMinutes !== false && (
            <CountdownItem styles={styles} typography={typography}>
              <CountdownNumber typography={typography}>
                {timeLeft.minutes.toString().padStart(2, '0')}
              </CountdownNumber>
              <CountdownLabel typography={typography}>минут</CountdownLabel>
            </CountdownItem>
          )}
          <CountdownItem styles={styles} typography={typography}>
            <CountdownNumber typography={typography}>
              {timeLeft.seconds.toString().padStart(2, '0')}
            </CountdownNumber>
            <CountdownLabel typography={typography}>секунд</CountdownLabel>
          </CountdownItem>
        </CountdownContainer>
      )}

      {data.ctaText && (
        <CTAButton
          styles={styles}
          typography={typography}
          size="large"
          onClick={handleCTAClick}
        >
          {data.ctaText}
        </CTAButton>
      )}
    </div>
  );

  const renderImage = () => {
    if (!data.imageUrl || imagePosition === 'background') return null;
    
    return (
      <div style={{ flex: 1, textAlign: 'center' }}>
        <img
          src={data.imageUrl}
          alt={data.title || 'Banner image'}
          style={{
            maxWidth: '100%',
            height: 'auto',
            borderRadius: styles.borderRadius || '12px'
          }}
        />
      </div>
    );
  };

  if (layout === 'split') {
    return (
      <BlockContainer
        {...props}
        styles={styles}
        backgroundType={imagePosition === 'background' ? 'image' : 'color'}
        backgroundImage={imagePosition === 'background' ? { url: data.backgroundImageUrl || data.imageUrl || '' } : undefined}
      >
        <InnerContainer padding="48px 16px">
          <Grid columns={2} mobileColumns={1} gap="48px">
            {imagePosition === 'left' && renderImage()}
            {renderContent()}
            {imagePosition === 'right' && renderImage()}
          </Grid>
        </InnerContainer>
      </BlockContainer>
    );
  }

  return (
    <BlockContainer
      {...props}
      styles={styles}
      backgroundType={imagePosition === 'background' ? 'image' : 'color'}
      backgroundImage={imagePosition === 'background' ? { url: data.backgroundImageUrl || data.imageUrl || '' } : undefined}
    >
      <InnerContainer padding="48px 16px">
        <FlexContainer
          direction={layout === 'left' || layout === 'right' ? 'row' : 'column'}
          justify={layout === 'centered' ? 'center' : layout === 'left' ? 'flex-start' : 'flex-end'}
          align="center"
          gap="32px"
        >
          {layout === 'left' && imagePosition !== 'background' && renderImage()}
          {renderContent()}
          {layout === 'right' && imagePosition !== 'background' && renderImage()}
        </FlexContainer>
      </InnerContainer>
    </BlockContainer>
  );
};

export default PromoBanner;
```

## 🎯 Блок заголовка: Навигационная панель

Адаптивная навигационная панель с логотипом, меню и действиями.

```typescript
// components/CommonBlocks/Header.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { HeaderData, CommonBlockProps } from '../../types/CommonBlocks';
import {
  BlockContainer,
  InnerContainer,
  FlexContainer
} from './styled';

const HeaderContainer = styled(BlockContainer)`
  position: sticky;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid ${props => props.styles?.borderColor || '#E5E7EB'};
`;

const Logo = styled.div<Pick<CommonBlockProps, 'typography' | 'styles'>>`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  
  img {
    height: 40px;
    width: auto;
  }
  
  span {
    font-family: ${props => props.typography?.fontFamily || 'Inter, sans-serif'};
    font-size: ${props => props.typography?.titleSize || '20px'};
    font-weight: ${props => props.typography?.titleWeight || '700'};
    color: ${props => props.styles?.textColor || '#1F2937'};
  }
`;

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  gap: 32px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavItem = styled.a<Pick<CommonBlockProps, 'typography' | 'styles'>>`
  font-family: ${props => props.typography?.fontFamily || 'Inter, sans-serif'};
  font-size: ${props => props.typography?.descriptionSize || '16px'};
  font-weight: 500;
  color: ${props => props.styles?.textColor || '#4B5563'};
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s ease;
  
  &:hover {
    color: ${props => props.styles?.primaryColor || '#3B82F6'};
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const ActionButton = styled.button<Pick<CommonBlockProps, 'styles'>>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  background-color: transparent;
  color: ${props => props.styles?.textColor || '#6B7280'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  
  &:hover {
    background-color: ${props => props.styles?.secondaryColor || '#F3F4F6'};
    color: ${props => props.styles?.primaryColor || '#3B82F6'};
  }
`;

const CartBadge = styled.div<Pick<CommonBlockProps, 'styles'>>`
  position: absolute;
  top: -4px;
  right: -4px;
  background-color: ${props => props.styles?.accentColor || '#EF4444'};
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 600;
`;

const MobileMenuButton = styled(ActionButton)`
  @media (min-width: 769px) {
    display: none;
  }
`;

const MobileMenu = styled.div<{ isOpen: boolean; styles?: any }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: ${props => props.styles?.backgroundColor || '#FFFFFF'};
  border-bottom: 1px solid ${props => props.styles?.borderColor || '#E5E7EB'};
  padding: 16px;
  display: ${props => props.isOpen ? 'block' : 'none'};
  
  @media (min-width: 769px) {
    display: none;
  }
`;

const MobileNavItem = styled.a<Pick<CommonBlockProps, 'typography' | 'styles'>>`
  display: block;
  padding: 12px 0;
  font-family: ${props => props.typography?.fontFamily || 'Inter, sans-serif'};
  font-size: ${props => props.typography?.descriptionSize || '16px'};
  color: ${props => props.styles?.textColor || '#4B5563'};
  text-decoration: none;
  border-bottom: 1px solid ${props => props.styles?.borderColor || '#F3F4F6'};
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    color: ${props => props.styles?.primaryColor || '#3B82F6'};
  }
`;

interface HeaderProps extends CommonBlockProps {
  data: HeaderData;
  onLogoClick?: () => void;
  onSearchClick?: () => void;
  onCartClick?: () => void;
  onProfileClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  data,
  styles = {},
  typography = {},
  onLogoClick,
  onSearchClick,
  onCartClick,
  onProfileClick,
  ...props
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavItemClick = (item: any) => {
    if (item.action) {
      item.action();
    } else if (item.url) {
      window.open(item.url, '_blank');
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <HeaderContainer {...props} styles={styles}>
      <InnerContainer padding="12px 16px">
        <FlexContainer justify="space-between" align="center">
          {/* Логотип */}
          <Logo
            typography={typography}
            styles={styles}
            onClick={onLogoClick}
          >
            {data.logo?.imageUrl && (
              <img src={data.logo.imageUrl} alt="Logo" />
            )}
            {data.logo?.text && <span>{data.logo.text}</span>}
          </Logo>

          {/* Навигация */}
          {data.navigation && (
            <Navigation>
              {data.navigation.items.map(item => (
                <NavItem
                  key={item.id}
                  typography={typography}
                  styles={styles}
                  onClick={() => handleNavItemClick(item)}
                >
                  {item.label}
                </NavItem>
              ))}
            </Navigation>
          )}

          {/* Действия */}
          <Actions>
            {data.actions?.search && (
              <ActionButton styles={styles} onClick={onSearchClick}>
                🔍
              </ActionButton>
            )}
            
            {data.actions?.cart && (
              <ActionButton styles={styles} onClick={onCartClick}>
                🛒
                {data.cartCount && data.cartCount > 0 && (
                  <CartBadge styles={styles}>
                    {data.cartCount > 99 ? '99+' : data.cartCount}
                  </CartBadge>
                )}
              </ActionButton>
            )}
            
            {data.actions?.profile && (
              <ActionButton styles={styles} onClick={onProfileClick}>
                👤
              </ActionButton>
            )}
            
            {data.actions?.menu && (
              <MobileMenuButton
                styles={styles}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                ☰
              </MobileMenuButton>
            )}
          </Actions>
        </FlexContainer>

        {/* Мобильное меню */}
        {data.navigation && (
          <MobileMenu isOpen={isMobileMenuOpen} styles={styles}>
            {data.navigation.items.map(item => (
              <MobileNavItem
                key={item.id}
                typography={typography}
                styles={styles}
                onClick={() => handleNavItemClick(item)}
              >
                {item.label}
              </MobileNavItem>
            ))}
          </MobileMenu>
        )}
      </InnerContainer>
    </HeaderContainer>
  );
};

export default Header;
```

Этот код предоставляет основу для создания разнообразных общих блоков в вашем конструкторе. Каждый блок имеет множество настроек и может быть адаптирован под различные дизайнерские требования.

