# 🛍️ Код карточек товаров для TeleShop Constructor

**Дата:** 25 июня 2025  
**Автор:** Manus AI  
**Цель:** Разработка полного набора настраиваемых карточек товаров для конструктора TeleShop.

## 📋 Обзор карточек товаров

Карточки товаров являются одним из самых важных элементов любого e-commerce интерфейса. Они должны быть информативными, привлекательными и функциональными. В рамках конструктора TeleShop мы разработаем несколько вариантов карточек товаров, каждая из которых будет иметь свои особенности и области применения.

Основные варианты карточек товаров, которые мы создадим:

1. **Минималистичная карточка (ProductCardMinimal)** - простая карточка с основной информацией
2. **Стандартная карточка (ProductCardStandard)** - карточка с расширенной информацией
3. **Компактная карточка (ProductCardCompact)** - для отображения в списках
4. **Полноширинная карточка (ProductCardFullWidth)** - для выделения товаров
5. **Карточка с вариантами (ProductCardWithVariants)** - для товаров с размерами/цветами
6. **Карточка с быстрым просмотром (ProductCardQuickView)** - с модальным окном

## 🎯 Базовые интерфейсы и типы

Прежде чем приступить к созданию конкретных карточек, определим базовые интерфейсы, которые будут использоваться во всех компонентах.

```typescript
// types/Product.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  currency?: string;
  imageUrl: string;
  images?: string[]; // Дополнительные изображения
  description?: string;
  shortDescription?: string;
  rating?: number;
  reviewsCount?: number;
  inStock?: boolean;
  stockCount?: number;
  category?: string;
  tags?: string[];
  variants?: ProductVariant[];
  discount?: {
    percentage?: number;
    amount?: number;
    label?: string; // "SALE", "NEW", "HOT"
  };
}

export interface ProductVariant {
  id: string;
  name: string;
  value: string;
  type: 'size' | 'color' | 'material' | 'other';
  price?: number; // Если цена отличается
  imageUrl?: string; // Если изображение отличается
  inStock?: boolean;
}

// types/BlockProps.ts
export interface BaseBlockProps {
  id: string;
  className?: string;
  style?: React.CSSProperties;
  
  // Общие настройки стиля
  styles?: {
    backgroundColor?: string;
    textColor?: string;
    primaryColor?: string;
    secondaryColor?: string;
    accentColor?: string;
    borderRadius?: string;
    padding?: string;
    margin?: string;
    boxShadow?: string;
    borderColor?: string;
    borderWidth?: string;
  };
  
  // Настройки типографики
  typography?: {
    fontFamily?: string;
    titleSize?: string;
    titleWeight?: string;
    priceSize?: string;
    priceWeight?: string;
    descriptionSize?: string;
    buttonSize?: string;
  };
  
  // Настройки адаптивности
  responsive?: {
    mobile?: {
      padding?: string;
      titleSize?: string;
      priceSize?: string;
    };
    tablet?: {
      padding?: string;
      titleSize?: string;
      priceSize?: string;
    };
  };
  
  // Общие настройки поведения
  isHidden?: boolean;
  onClick?: (product: Product) => void;
  onAddToCart?: (product: Product, variant?: ProductVariant) => void;
  onQuickView?: (product: Product) => void;
}

export interface ProductCardProps extends BaseBlockProps {
  product: Product;
  
  // Настройки отображения
  showDescription?: boolean;
  showRating?: boolean;
  showStock?: boolean;
  showDiscount?: boolean;
  showQuickView?: boolean;
  showVariants?: boolean;
  
  // Настройки изображения
  imageAspectRatio?: '1:1' | '4:3' | '16:9' | 'auto';
  imageObjectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
  
  // Настройки кнопки
  buttonText?: string;
  buttonVariant?: 'primary' | 'outline' | 'text';
  buttonFullWidth?: boolean;
  
  // Настройки макета
  layout?: 'vertical' | 'horizontal';
  alignment?: 'left' | 'center' | 'right';
  
  // Анимации и эффекты
  hoverEffect?: 'none' | 'lift' | 'scale' | 'shadow';
  loadingState?: boolean;
}
```

## 🎨 Стилизованные компоненты

Создадим набор базовых стилизованных компонентов, которые будут использоваться во всех карточках товаров.

```typescript
// components/ProductCard/styled.ts
import styled, { css, keyframes } from 'styled-components';
import { ProductCardProps } from '../../types/BlockProps';

// Анимации
const liftAnimation = keyframes`
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(-4px);
  }
`;

const scaleAnimation = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.02);
  }
`;

const shadowAnimation = keyframes`
  from {
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  }
  to {
    box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.15);
  }
`;

// Базовый контейнер карточки
export const CardContainer = styled.div<Pick<ProductCardProps, 'styles' | 'hoverEffect' | 'responsive'>>`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.styles?.backgroundColor || '#FFFFFF'};
  border-radius: ${props => props.styles?.borderRadius || '12px'};
  padding: ${props => props.styles?.padding || '16px'};
  margin: ${props => props.styles?.margin || '0'};
  box-shadow: ${props => props.styles?.boxShadow || '0px 2px 8px rgba(0, 0, 0, 0.1)'};
  border: ${props => props.styles?.borderWidth || '1px'} solid ${props => props.styles?.borderColor || 'transparent'};
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  ${props => props.hoverEffect === 'lift' && css`
    &:hover {
      animation: ${liftAnimation} 0.3s ease forwards;
    }
  `}

  ${props => props.hoverEffect === 'scale' && css`
    &:hover {
      animation: ${scaleAnimation} 0.3s ease forwards;
    }
  `}

  ${props => props.hoverEffect === 'shadow' && css`
    &:hover {
      animation: ${shadowAnimation} 0.3s ease forwards;
    }
  `}

  // Адаптивные стили
  @media (max-width: 480px) {
    padding: ${props => props.responsive?.mobile?.padding || props.styles?.padding || '12px'};
  }

  @media (min-width: 481px) and (max-width: 768px) {
    padding: ${props => props.responsive?.tablet?.padding || props.styles?.padding || '16px'};
  }
`;

// Контейнер изображения
export const ImageContainer = styled.div<{ aspectRatio?: string; borderRadius?: string }>`
  position: relative;
  width: 100%;
  margin-bottom: 12px;
  border-radius: ${props => props.borderRadius || '8px'};
  overflow: hidden;
  
  ${props => props.aspectRatio !== 'auto' && css`
    padding-bottom: ${
      props.aspectRatio === '1:1' ? '100%' : 
      props.aspectRatio === '4:3' ? '75%' : 
      props.aspectRatio === '16:9' ? '56.25%' : '100%'
    };
    height: 0;
  `}
`;

// Изображение товара
export const ProductImage = styled.img<{ objectFit?: string; aspectRatio?: string }>`
  width: 100%;
  height: 100%;
  object-fit: ${props => props.objectFit || 'cover'};
  transition: transform 0.3s ease;
  
  ${props => props.aspectRatio !== 'auto' && css`
    position: absolute;
    top: 0;
    left: 0;
  `}

  &:hover {
    transform: scale(1.05);
  }
`;

// Бейдж скидки
export const DiscountBadge = styled.div<{ accentColor?: string }>`
  position: absolute;
  top: 8px;
  left: 8px;
  background-color: ${props => props.accentColor || '#EF4444'};
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  z-index: 2;
`;

// Контейнер контента
export const ContentContainer = styled.div<{ alignment?: string }>`
  display: flex;
  flex-direction: column;
  flex: 1;
  text-align: ${props => props.alignment || 'left'};
`;

// Название товара
export const ProductTitle = styled.h3<Pick<ProductCardProps, 'typography' | 'styles' | 'responsive'>>`
  margin: 0 0 8px 0;
  font-family: ${props => props.typography?.fontFamily || 'Inter, sans-serif'};
  font-size: ${props => props.typography?.titleSize || '16px'};
  font-weight: ${props => props.typography?.titleWeight || '600'};
  color: ${props => props.styles?.textColor || '#1F2937'};
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (max-width: 480px) {
    font-size: ${props => props.responsive?.mobile?.titleSize || props.typography?.titleSize || '14px'};
  }

  @media (min-width: 481px) and (max-width: 768px) {
    font-size: ${props => props.responsive?.tablet?.titleSize || props.typography?.titleSize || '16px'};
  }
`;

// Описание товара
export const ProductDescription = styled.p<Pick<ProductCardProps, 'typography' | 'styles'>>`
  margin: 0 0 12px 0;
  font-family: ${props => props.typography?.fontFamily || 'Inter, sans-serif'};
  font-size: ${props => props.typography?.descriptionSize || '14px'};
  color: ${props => props.styles?.secondaryColor || '#6B7280'};
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

// Контейнер цены
export const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`;

// Цена товара
export const ProductPrice = styled.span<Pick<ProductCardProps, 'typography' | 'styles' | 'responsive'>>`
  font-family: ${props => props.typography?.fontFamily || 'Inter, sans-serif'};
  font-size: ${props => props.typography?.priceSize || '18px'};
  font-weight: ${props => props.typography?.priceWeight || '700'};
  color: ${props => props.styles?.primaryColor || '#1F2937'};

  @media (max-width: 480px) {
    font-size: ${props => props.responsive?.mobile?.priceSize || props.typography?.priceSize || '16px'};
  }

  @media (min-width: 481px) and (max-width: 768px) {
    font-size: ${props => props.responsive?.tablet?.priceSize || props.typography?.priceSize || '18px'};
  }
`;

// Старая цена
export const OldPrice = styled.span<Pick<ProductCardProps, 'typography' | 'styles'>>`
  font-family: ${props => props.typography?.fontFamily || 'Inter, sans-serif'};
  font-size: ${props => props.typography?.priceSize || '14px'};
  color: ${props => props.styles?.secondaryColor || '#9CA3AF'};
  text-decoration: line-through;
`;

// Рейтинг
export const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 12px;
`;

export const StarIcon = styled.span<{ filled?: boolean; accentColor?: string }>`
  color: ${props => props.filled ? (props.accentColor || '#FBBF24') : '#D1D5DB'};
  font-size: 14px;
`;

export const RatingText = styled.span<Pick<ProductCardProps, 'typography' | 'styles'>>`
  font-family: ${props => props.typography?.fontFamily || 'Inter, sans-serif'};
  font-size: 12px;
  color: ${props => props.styles?.secondaryColor || '#6B7280'};
  margin-left: 4px;
`;

// Информация о наличии
export const StockInfo = styled.div<{ inStock?: boolean; accentColor?: string }>`
  font-size: 12px;
  color: ${props => props.inStock ? '#10B981' : (props.accentColor || '#EF4444')};
  margin-bottom: 12px;
  font-weight: 500;
`;

// Кнопка добавления в корзину
export const AddToCartButton = styled.button<Pick<ProductCardProps, 'buttonVariant' | 'buttonFullWidth' | 'styles' | 'typography'>>`
  display: ${props => props.buttonFullWidth ? 'block' : 'inline-block'};
  width: ${props => props.buttonFullWidth ? '100%' : 'auto'};
  padding: 12px 16px;
  border: none;
  border-radius: ${props => props.styles?.borderRadius || '8px'};
  cursor: pointer;
  font-family: ${props => props.typography?.fontFamily || 'Inter, sans-serif'};
  font-size: ${props => props.typography?.buttonSize || '14px'};
  font-weight: 600;
  text-align: center;
  transition: all 0.2s ease;
  margin-top: auto;

  ${props => {
    switch (props.buttonVariant) {
      case 'outline':
        return css`
          background-color: transparent;
          color: ${props.styles?.primaryColor || '#3B82F6'};
          border: 2px solid ${props.styles?.primaryColor || '#3B82F6'};
          &:hover {
            background-color: ${props.styles?.primaryColor || '#3B82F6'};
            color: white;
          }
        `;
      case 'text':
        return css`
          background-color: transparent;
          color: ${props.styles?.primaryColor || '#3B82F6'};
          &:hover {
            text-decoration: underline;
          }
        `;
      case 'primary':
      default:
        return css`
          background-color: ${props.styles?.primaryColor || '#3B82F6'};
          color: white;
          &:hover {
            opacity: 0.9;
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// Контейнер вариантов
export const VariantsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
`;

// Вариант товара
export const VariantOption = styled.button<{ selected?: boolean; primaryColor?: string }>`
  padding: 6px 12px;
  border: 1px solid ${props => props.selected ? (props.primaryColor || '#3B82F6') : '#D1D5DB'};
  border-radius: 6px;
  background-color: ${props => props.selected ? (props.primaryColor || '#3B82F6') : 'transparent'};
  color: ${props => props.selected ? 'white' : '#374151'};
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${props => props.primaryColor || '#3B82F6'};
  }
`;

// Индикатор загрузки
export const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #3B82F6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
```

## 🎯 Карточка товара: Минималистичная версия

Начнем с самой простой карточки товара, которая содержит только основную информацию.

```typescript
// components/ProductCard/ProductCardMinimal.tsx
import React from 'react';
import { ProductCardProps } from '../../types/BlockProps';
import {
  CardContainer,
  ImageContainer,
  ProductImage,
  ContentContainer,
  ProductTitle,
  ProductPrice,
  AddToCartButton,
  LoadingSpinner,
  DiscountBadge
} from './styled';

const ProductCardMinimal: React.FC<ProductCardProps> = ({
  product,
  styles = {},
  typography = {},
  responsive = {},
  imageAspectRatio = '1:1',
  imageObjectFit = 'cover',
  buttonText = 'В корзину',
  buttonVariant = 'primary',
  buttonFullWidth = true,
  alignment = 'center',
  hoverEffect = 'lift',
  loadingState = false,
  showDiscount = true,
  onAddToCart,
  onClick,
  ...props
}) => {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick(product);
    }
  };

  if (loadingState) {
    return (
      <CardContainer styles={styles} responsive={responsive}>
        <LoadingSpinner />
      </CardContainer>
    );
  }

  return (
    <CardContainer
      styles={styles}
      responsive={responsive}
      hoverEffect={hoverEffect}
      onClick={handleCardClick}
      {...props}
    >
      <ImageContainer 
        aspectRatio={imageAspectRatio}
        borderRadius={styles.borderRadius}
      >
        <ProductImage
          src={product.imageUrl}
          alt={product.name}
          objectFit={imageObjectFit}
          aspectRatio={imageAspectRatio}
        />
        {showDiscount && product.discount && (
          <DiscountBadge accentColor={styles.accentColor}>
            {product.discount.label || `${product.discount.percentage}%`}
          </DiscountBadge>
        )}
      </ImageContainer>

      <ContentContainer alignment={alignment}>
        <ProductTitle
          typography={typography}
          styles={styles}
          responsive={responsive}
        >
          {product.name}
        </ProductTitle>

        <ProductPrice
          typography={typography}
          styles={styles}
          responsive={responsive}
        >
          {product.price} {product.currency || '₽'}
        </ProductPrice>

        <AddToCartButton
          buttonVariant={buttonVariant}
          buttonFullWidth={buttonFullWidth}
          styles={styles}
          typography={typography}
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          {product.inStock ? buttonText : 'Нет в наличии'}
        </AddToCartButton>
      </ContentContainer>
    </CardContainer>
  );
};

export default ProductCardMinimal;
```

## 🎯 Карточка товара: Стандартная версия

Стандартная карточка включает дополнительную информацию: описание, рейтинг, старую цену.

```typescript
// components/ProductCard/ProductCardStandard.tsx
import React from 'react';
import { ProductCardProps } from '../../types/BlockProps';
import {
  CardContainer,
  ImageContainer,
  ProductImage,
  ContentContainer,
  ProductTitle,
  ProductDescription,
  PriceContainer,
  ProductPrice,
  OldPrice,
  RatingContainer,
  StarIcon,
  RatingText,
  StockInfo,
  AddToCartButton,
  LoadingSpinner,
  DiscountBadge
} from './styled';

const ProductCardStandard: React.FC<ProductCardProps> = ({
  product,
  styles = {},
  typography = {},
  responsive = {},
  imageAspectRatio = '4:3',
  imageObjectFit = 'cover',
  buttonText = 'Добавить в корзину',
  buttonVariant = 'primary',
  buttonFullWidth = true,
  alignment = 'left',
  hoverEffect = 'shadow',
  loadingState = false,
  showDescription = true,
  showRating = true,
  showStock = true,
  showDiscount = true,
  onAddToCart,
  onClick,
  ...props
}) => {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick(product);
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <StarIcon
          key={i}
          filled={i <= rating}
          accentColor={styles.accentColor}
        >
          ★
        </StarIcon>
      );
    }
    return stars;
  };

  if (loadingState) {
    return (
      <CardContainer styles={styles} responsive={responsive}>
        <LoadingSpinner />
      </CardContainer>
    );
  }

  return (
    <CardContainer
      styles={styles}
      responsive={responsive}
      hoverEffect={hoverEffect}
      onClick={handleCardClick}
      {...props}
    >
      <ImageContainer 
        aspectRatio={imageAspectRatio}
        borderRadius={styles.borderRadius}
      >
        <ProductImage
          src={product.imageUrl}
          alt={product.name}
          objectFit={imageObjectFit}
          aspectRatio={imageAspectRatio}
        />
        {showDiscount && product.discount && (
          <DiscountBadge accentColor={styles.accentColor}>
            {product.discount.label || `-${product.discount.percentage}%`}
          </DiscountBadge>
        )}
      </ImageContainer>

      <ContentContainer alignment={alignment}>
        <ProductTitle
          typography={typography}
          styles={styles}
          responsive={responsive}
        >
          {product.name}
        </ProductTitle>

        {showDescription && product.shortDescription && (
          <ProductDescription
            typography={typography}
            styles={styles}
          >
            {product.shortDescription}
          </ProductDescription>
        )}

        {showRating && product.rating && (
          <RatingContainer>
            {renderStars(product.rating)}
            {product.reviewsCount && (
              <RatingText typography={typography} styles={styles}>
                ({product.reviewsCount})
              </RatingText>
            )}
          </RatingContainer>
        )}

        <PriceContainer>
          <ProductPrice
            typography={typography}
            styles={styles}
            responsive={responsive}
          >
            {product.price} {product.currency || '₽'}
          </ProductPrice>
          {product.oldPrice && (
            <OldPrice typography={typography} styles={styles}>
              {product.oldPrice} {product.currency || '₽'}
            </OldPrice>
          )}
        </PriceContainer>

        {showStock && (
          <StockInfo 
            inStock={product.inStock}
            accentColor={styles.accentColor}
          >
            {product.inStock 
              ? (product.stockCount ? `В наличии: ${product.stockCount} шт.` : 'В наличии')
              : 'Нет в наличии'
            }
          </StockInfo>
        )}

        <AddToCartButton
          buttonVariant={buttonVariant}
          buttonFullWidth={buttonFullWidth}
          styles={styles}
          typography={typography}
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          {product.inStock ? buttonText : 'Нет в наличии'}
        </AddToCartButton>
      </ContentContainer>
    </CardContainer>
  );
};

export default ProductCardStandard;
```

## 🎯 Карточка товара: Компактная версия

Компактная карточка предназначена для отображения в списках или когда нужно показать много товаров на экране.

```typescript
// components/ProductCard/ProductCardCompact.tsx
import React from 'react';
import styled from 'styled-components';
import { ProductCardProps } from '../../types/BlockProps';
import {
  ProductImage,
  ProductTitle,
  ProductPrice,
  OldPrice,
  AddToCartButton,
  LoadingSpinner,
  DiscountBadge
} from './styled';

const CompactContainer = styled.div<Pick<ProductCardProps, 'styles' | 'hoverEffect' | 'responsive'>>`
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: ${props => props.styles?.backgroundColor || '#FFFFFF'};
  border-radius: ${props => props.styles?.borderRadius || '8px'};
  padding: ${props => props.styles?.padding || '12px'};
  margin: ${props => props.styles?.margin || '0'};
  box-shadow: ${props => props.styles?.boxShadow || '0px 1px 4px rgba(0, 0, 0, 0.1)'};
  border: ${props => props.styles?.borderWidth || '1px'} solid ${props => props.styles?.borderColor || 'transparent'};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 480px) {
    padding: ${props => props.responsive?.mobile?.padding || '8px'};
    gap: 8px;
  }
`;

const CompactImageContainer = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 6px;
  overflow: hidden;
  flex-shrink: 0;
  position: relative;

  @media (max-width: 480px) {
    width: 50px;
    height: 50px;
  }
`;

const CompactContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const CompactPriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CompactButton = styled(AddToCartButton)`
  padding: 6px 12px;
  font-size: 12px;
  flex-shrink: 0;

  @media (max-width: 480px) {
    padding: 4px 8px;
    font-size: 11px;
  }
`;

const ProductCardCompact: React.FC<ProductCardProps> = ({
  product,
  styles = {},
  typography = {},
  responsive = {},
  buttonText = 'В корзину',
  buttonVariant = 'primary',
  hoverEffect = 'none',
  loadingState = false,
  showDiscount = true,
  onAddToCart,
  onClick,
  ...props
}) => {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick(product);
    }
  };

  if (loadingState) {
    return (
      <CompactContainer styles={styles} responsive={responsive}>
        <LoadingSpinner />
      </CompactContainer>
    );
  }

  return (
    <CompactContainer
      styles={styles}
      responsive={responsive}
      hoverEffect={hoverEffect}
      onClick={handleCardClick}
      {...props}
    >
      <CompactImageContainer>
        <ProductImage
          src={product.imageUrl}
          alt={product.name}
          objectFit="cover"
          aspectRatio="1:1"
        />
        {showDiscount && product.discount && (
          <DiscountBadge accentColor={styles.accentColor}>
            -{product.discount.percentage}%
          </DiscountBadge>
        )}
      </CompactImageContainer>

      <CompactContent>
        <ProductTitle
          typography={{
            ...typography,
            titleSize: typography.titleSize || '14px'
          }}
          styles={styles}
          responsive={responsive}
        >
          {product.name}
        </ProductTitle>

        <CompactPriceContainer>
          <ProductPrice
            typography={{
              ...typography,
              priceSize: typography.priceSize || '16px'
            }}
            styles={styles}
            responsive={responsive}
          >
            {product.price} {product.currency || '₽'}
          </ProductPrice>
          {product.oldPrice && (
            <OldPrice 
              typography={{
                ...typography,
                priceSize: '12px'
              }}
              styles={styles}
            >
              {product.oldPrice} {product.currency || '₽'}
            </OldPrice>
          )}
        </CompactPriceContainer>
      </CompactContent>

      <CompactButton
        buttonVariant={buttonVariant}
        styles={styles}
        typography={typography}
        onClick={handleAddToCart}
        disabled={!product.inStock}
      >
        {product.inStock ? buttonText : 'Нет'}
      </CompactButton>
    </CompactContainer>
  );
};

export default ProductCardCompact;
```

## 🎯 Карточка товара: Полноширинная версия

Полноширинная карточка занимает всю ширину контейнера и может использоваться для выделения особых товаров.

```typescript
// components/ProductCard/ProductCardFullWidth.tsx
import React from 'react';
import styled from 'styled-components';
import { ProductCardProps } from '../../types/BlockProps';
import {
  ProductImage,
  ProductTitle,
  ProductDescription,
  PriceContainer,
  ProductPrice,
  OldPrice,
  RatingContainer,
  StarIcon,
  RatingText,
  StockInfo,
  AddToCartButton,
  LoadingSpinner,
  DiscountBadge
} from './styled';

const FullWidthContainer = styled.div<Pick<ProductCardProps, 'styles' | 'hoverEffect' | 'responsive' | 'layout'>>`
  display: flex;
  flex-direction: ${props => props.layout === 'horizontal' ? 'row' : 'column'};
  gap: 16px;
  background-color: ${props => props.styles?.backgroundColor || '#FFFFFF'};
  border-radius: ${props => props.styles?.borderRadius || '12px'};
  padding: ${props => props.styles?.padding || '20px'};
  margin: ${props => props.styles?.margin || '0'};
  box-shadow: ${props => props.styles?.boxShadow || '0px 4px 12px rgba(0, 0, 0, 0.1)'};
  border: ${props => props.styles?.borderWidth || '1px'} solid ${props => props.styles?.borderColor || 'transparent'};
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;

  &:hover {
    box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 480px) {
    flex-direction: column;
    padding: ${props => props.responsive?.mobile?.padding || '16px'};
    gap: 12px;
  }
`;

const FullWidthImageContainer = styled.div<{ layout?: string }>`
  position: relative;
  width: ${props => props.layout === 'horizontal' ? '200px' : '100%'};
  height: ${props => props.layout === 'horizontal' ? '200px' : '250px'};
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;

  @media (max-width: 480px) {
    width: 100%;
    height: 200px;
  }
`;

const FullWidthContent = styled.div<{ alignment?: string }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: ${props => props.alignment || 'left'};
`;

const FullWidthHeader = styled.div`
  margin-bottom: 16px;
`;

const FullWidthFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 16px;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
`;

const ProductCardFullWidth: React.FC<ProductCardProps> = ({
  product,
  styles = {},
  typography = {},
  responsive = {},
  layout = 'horizontal',
  buttonText = 'Добавить в корзину',
  buttonVariant = 'primary',
  buttonFullWidth = false,
  alignment = 'left',
  hoverEffect = 'shadow',
  loadingState = false,
  showDescription = true,
  showRating = true,
  showStock = true,
  showDiscount = true,
  onAddToCart,
  onClick,
  ...props
}) => {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick(product);
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <StarIcon
          key={i}
          filled={i <= rating}
          accentColor={styles.accentColor}
        >
          ★
        </StarIcon>
      );
    }
    return stars;
  };

  if (loadingState) {
    return (
      <FullWidthContainer styles={styles} responsive={responsive} layout={layout}>
        <LoadingSpinner />
      </FullWidthContainer>
    );
  }

  return (
    <FullWidthContainer
      styles={styles}
      responsive={responsive}
      hoverEffect={hoverEffect}
      layout={layout}
      onClick={handleCardClick}
      {...props}
    >
      <FullWidthImageContainer layout={layout}>
        <ProductImage
          src={product.imageUrl}
          alt={product.name}
          objectFit="cover"
          aspectRatio="auto"
        />
        {showDiscount && product.discount && (
          <DiscountBadge accentColor={styles.accentColor}>
            {product.discount.label || `-${product.discount.percentage}%`}
          </DiscountBadge>
        )}
      </FullWidthImageContainer>

      <FullWidthContent alignment={alignment}>
        <FullWidthHeader>
          <ProductTitle
            typography={{
              ...typography,
              titleSize: typography.titleSize || '20px'
            }}
            styles={styles}
            responsive={responsive}
          >
            {product.name}
          </ProductTitle>

          {showDescription && product.description && (
            <ProductDescription
              typography={{
                ...typography,
                descriptionSize: typography.descriptionSize || '16px'
              }}
              styles={styles}
            >
              {product.description}
            </ProductDescription>
          )}

          {showRating && product.rating && (
            <RatingContainer>
              {renderStars(product.rating)}
              {product.reviewsCount && (
                <RatingText typography={typography} styles={styles}>
                  ({product.reviewsCount} отзывов)
                </RatingText>
              )}
            </RatingContainer>
          )}
        </FullWidthHeader>

        <FullWidthFooter>
          <div>
            <PriceContainer>
              <ProductPrice
                typography={{
                  ...typography,
                  priceSize: typography.priceSize || '24px'
                }}
                styles={styles}
                responsive={responsive}
              >
                {product.price} {product.currency || '₽'}
              </ProductPrice>
              {product.oldPrice && (
                <OldPrice 
                  typography={{
                    ...typography,
                    priceSize: '18px'
                  }}
                  styles={styles}
                >
                  {product.oldPrice} {product.currency || '₽'}
                </OldPrice>
              )}
            </PriceContainer>

            {showStock && (
              <StockInfo 
                inStock={product.inStock}
                accentColor={styles.accentColor}
              >
                {product.inStock 
                  ? (product.stockCount ? `В наличии: ${product.stockCount} шт.` : 'В наличии')
                  : 'Нет в наличии'
                }
              </StockInfo>
            )}
          </div>

          <AddToCartButton
            buttonVariant={buttonVariant}
            buttonFullWidth={buttonFullWidth}
            styles={{
              ...styles,
              padding: '14px 28px'
            }}
            typography={{
              ...typography,
              buttonSize: typography.buttonSize || '16px'
            }}
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            {product.inStock ? buttonText : 'Нет в наличии'}
          </AddToCartButton>
        </FullWidthFooter>
      </FullWidthContent>
    </FullWidthContainer>
  );
};

export default ProductCardFullWidth;
```

## 🎯 Карточка товара: С вариантами

Эта карточка позволяет пользователю выбирать варианты товара (размер, цвет и т.д.) прямо в карточке.

```typescript
// components/ProductCard/ProductCardWithVariants.tsx
import React, { useState } from 'react';
import { ProductCardProps, ProductVariant } from '../../types/BlockProps';
import {
  CardContainer,
  ImageContainer,
  ProductImage,
  ContentContainer,
  ProductTitle,
  ProductDescription,
  PriceContainer,
  ProductPrice,
  OldPrice,
  VariantsContainer,
  VariantOption,
  AddToCartButton,
  LoadingSpinner,
  DiscountBadge
} from './styled';

const ProductCardWithVariants: React.FC<ProductCardProps> = ({
  product,
  styles = {},
  typography = {},
  responsive = {},
  imageAspectRatio = '1:1',
  imageObjectFit = 'cover',
  buttonText = 'Добавить в корзину',
  buttonVariant = 'primary',
  buttonFullWidth = true,
  alignment = 'left',
  hoverEffect = 'lift',
  loadingState = false,
  showDescription = true,
  showDiscount = true,
  showVariants = true,
  onAddToCart,
  onClick,
  ...props
}) => {
  const [selectedVariants, setSelectedVariants] = useState<Record<string, ProductVariant>>({});
  const [currentImage, setCurrentImage] = useState(product.imageUrl);

  const handleVariantSelect = (variant: ProductVariant) => {
    setSelectedVariants(prev => ({
      ...prev,
      [variant.type]: variant
    }));

    // Изменяем изображение, если у варианта есть свое изображение
    if (variant.imageUrl) {
      setCurrentImage(variant.imageUrl);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddToCart) {
      const selectedVariantsList = Object.values(selectedVariants);
      onAddToCart(product, selectedVariantsList[0]); // Передаем первый выбранный вариант
    }
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick(product);
    }
  };

  const getCurrentPrice = () => {
    const selectedVariant = Object.values(selectedVariants)[0];
    return selectedVariant?.price || product.price;
  };

  const getVariantsByType = (type: string) => {
    return product.variants?.filter(variant => variant.type === type) || [];
  };

  const isVariantSelected = (variant: ProductVariant) => {
    return selectedVariants[variant.type]?.id === variant.id;
  };

  if (loadingState) {
    return (
      <CardContainer styles={styles} responsive={responsive}>
        <LoadingSpinner />
      </CardContainer>
    );
  }

  return (
    <CardContainer
      styles={styles}
      responsive={responsive}
      hoverEffect={hoverEffect}
      onClick={handleCardClick}
      {...props}
    >
      <ImageContainer 
        aspectRatio={imageAspectRatio}
        borderRadius={styles.borderRadius}
      >
        <ProductImage
          src={currentImage}
          alt={product.name}
          objectFit={imageObjectFit}
          aspectRatio={imageAspectRatio}
        />
        {showDiscount && product.discount && (
          <DiscountBadge accentColor={styles.accentColor}>
            {product.discount.label || `-${product.discount.percentage}%`}
          </DiscountBadge>
        )}
      </ImageContainer>

      <ContentContainer alignment={alignment}>
        <ProductTitle
          typography={typography}
          styles={styles}
          responsive={responsive}
        >
          {product.name}
        </ProductTitle>

        {showDescription && product.shortDescription && (
          <ProductDescription
            typography={typography}
            styles={styles}
          >
            {product.shortDescription}
          </ProductDescription>
        )}

        <PriceContainer>
          <ProductPrice
            typography={typography}
            styles={styles}
            responsive={responsive}
          >
            {getCurrentPrice()} {product.currency || '₽'}
          </ProductPrice>
          {product.oldPrice && (
            <OldPrice typography={typography} styles={styles}>
              {product.oldPrice} {product.currency || '₽'}
            </OldPrice>
          )}
        </PriceContainer>

        {showVariants && product.variants && (
          <>
            {/* Размеры */}
            {getVariantsByType('size').length > 0 && (
              <div>
                <div style={{ fontSize: '12px', marginBottom: '6px', color: styles.secondaryColor || '#6B7280' }}>
                  Размер:
                </div>
                <VariantsContainer>
                  {getVariantsByType('size').map(variant => (
                    <VariantOption
                      key={variant.id}
                      selected={isVariantSelected(variant)}
                      primaryColor={styles.primaryColor}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleVariantSelect(variant);
                      }}
                    >
                      {variant.value}
                    </VariantOption>
                  ))}
                </VariantsContainer>
              </div>
            )}

            {/* Цвета */}
            {getVariantsByType('color').length > 0 && (
              <div>
                <div style={{ fontSize: '12px', marginBottom: '6px', color: styles.secondaryColor || '#6B7280' }}>
                  Цвет:
                </div>
                <VariantsContainer>
                  {getVariantsByType('color').map(variant => (
                    <VariantOption
                      key={variant.id}
                      selected={isVariantSelected(variant)}
                      primaryColor={styles.primaryColor}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleVariantSelect(variant);
                      }}
                    >
                      {variant.value}
                    </VariantOption>
                  ))}
                </VariantsContainer>
              </div>
            )}
          </>
        )}

        <AddToCartButton
          buttonVariant={buttonVariant}
          buttonFullWidth={buttonFullWidth}
          styles={styles}
          typography={typography}
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          {product.inStock ? buttonText : 'Нет в наличии'}
        </AddToCartButton>
      </ContentContainer>
    </CardContainer>
  );
};

export default ProductCardWithVariants;
```

## 📝 Настройки блоков для конструктора

Для каждой карточки товара создадим файл настроек, который будет использоваться в UI конструктора.

```typescript
// components/ProductCard/settings.ts
export const productCardSettings = {
  minimal: {
    name: 'Минималистичная карточка',
    description: 'Простая карточка с основной информацией о товаре',
    category: 'E-commerce',
    icon: '🛍️',
    defaultProps: {
      styles: {
        backgroundColor: '#FFFFFF',
        textColor: '#1F2937',
        primaryColor: '#3B82F6',
        secondaryColor: '#6B7280',
        accentColor: '#EF4444',
        borderRadius: '12px',
        padding: '16px',
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)'
      },
      typography: {
        fontFamily: 'Inter, sans-serif',
        titleSize: '16px',
        titleWeight: '600',
        priceSize: '18px',
        priceWeight: '700',
        buttonSize: '14px'
      },
      imageAspectRatio: '1:1',
      buttonText: 'В корзину',
      buttonVariant: 'primary',
      buttonFullWidth: true,
      alignment: 'center',
      hoverEffect: 'lift',
      showDiscount: true
    },
    customizableProps: [
      {
        name: 'styles.backgroundColor',
        label: 'Цвет фона',
        type: 'color',
        category: 'Стиль'
      },
      {
        name: 'styles.primaryColor',
        label: 'Основной цвет',
        type: 'color',
        category: 'Стиль'
      },
      {
        name: 'styles.borderRadius',
        label: 'Закругление углов',
        type: 'select',
        options: ['0px', '4px', '8px', '12px', '16px', '24px'],
        category: 'Стиль'
      },
      {
        name: 'typography.fontFamily',
        label: 'Шрифт',
        type: 'select',
        options: ['Inter, sans-serif', 'Roboto, sans-serif', 'Open Sans, sans-serif'],
        category: 'Типографика'
      },
      {
        name: 'imageAspectRatio',
        label: 'Пропорции изображения',
        type: 'select',
        options: ['1:1', '4:3', '16:9', 'auto'],
        category: 'Изображение'
      },
      {
        name: 'buttonText',
        label: 'Текст кнопки',
        type: 'text',
        category: 'Контент'
      },
      {
        name: 'hoverEffect',
        label: 'Эффект при наведении',
        type: 'select',
        options: ['none', 'lift', 'scale', 'shadow'],
        category: 'Анимация'
      }
    ]
  },
  
  standard: {
    name: 'Стандартная карточка',
    description: 'Карточка с расширенной информацией: описание, рейтинг, наличие',
    category: 'E-commerce',
    icon: '🏪',
    defaultProps: {
      styles: {
        backgroundColor: '#FFFFFF',
        textColor: '#1F2937',
        primaryColor: '#10B981',
        secondaryColor: '#6B7280',
        accentColor: '#F59E0B',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
      },
      typography: {
        fontFamily: 'Inter, sans-serif',
        titleSize: '18px',
        titleWeight: '600',
        priceSize: '20px',
        priceWeight: '700',
        descriptionSize: '14px',
        buttonSize: '14px'
      },
      imageAspectRatio: '4:3',
      buttonText: 'Добавить в корзину',
      buttonVariant: 'primary',
      buttonFullWidth: true,
      alignment: 'left',
      hoverEffect: 'shadow',
      showDescription: true,
      showRating: true,
      showStock: true,
      showDiscount: true
    },
    customizableProps: [
      // ... аналогичные настройки + дополнительные для описания, рейтинга и т.д.
      {
        name: 'showDescription',
        label: 'Показывать описание',
        type: 'boolean',
        category: 'Контент'
      },
      {
        name: 'showRating',
        label: 'Показывать рейтинг',
        type: 'boolean',
        category: 'Контент'
      },
      {
        name: 'showStock',
        label: 'Показывать наличие',
        type: 'boolean',
        category: 'Контент'
      }
    ]
  },

  compact: {
    name: 'Компактная карточка',
    description: 'Горизонтальная карточка для списков товаров',
    category: 'E-commerce',
    icon: '📋',
    defaultProps: {
      styles: {
        backgroundColor: '#FFFFFF',
        textColor: '#1F2937',
        primaryColor: '#8B5CF6',
        secondaryColor: '#6B7280',
        accentColor: '#EF4444',
        borderRadius: '8px',
        padding: '12px',
        boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.1)'
      },
      typography: {
        fontFamily: 'Inter, sans-serif',
        titleSize: '14px',
        titleWeight: '600',
        priceSize: '16px',
        priceWeight: '700',
        buttonSize: '12px'
      },
      buttonText: 'В корзину',
      buttonVariant: 'primary',
      hoverEffect: 'none',
      showDiscount: true
    }
  },

  fullWidth: {
    name: 'Полноширинная карточка',
    description: 'Большая карточка для выделения особых товаров',
    category: 'E-commerce',
    icon: '🎯',
    defaultProps: {
      styles: {
        backgroundColor: '#FFFFFF',
        textColor: '#1F2937',
        primaryColor: '#DC2626',
        secondaryColor: '#6B7280',
        accentColor: '#F59E0B',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.1)'
      },
      typography: {
        fontFamily: 'Inter, sans-serif',
        titleSize: '24px',
        titleWeight: '700',
        priceSize: '28px',
        priceWeight: '800',
        descriptionSize: '16px',
        buttonSize: '16px'
      },
      layout: 'horizontal',
      buttonText: 'Купить сейчас',
      buttonVariant: 'primary',
      buttonFullWidth: false,
      alignment: 'left',
      hoverEffect: 'shadow',
      showDescription: true,
      showRating: true,
      showStock: true,
      showDiscount: true
    }
  },

  withVariants: {
    name: 'Карточка с вариантами',
    description: 'Карточка с возможностью выбора размера, цвета и других вариантов',
    category: 'E-commerce',
    icon: '🎨',
    defaultProps: {
      styles: {
        backgroundColor: '#FFFFFF',
        textColor: '#1F2937',
        primaryColor: '#7C3AED',
        secondaryColor: '#6B7280',
        accentColor: '#EF4444',
        borderRadius: '12px',
        padding: '18px',
        boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.1)'
      },
      typography: {
        fontFamily: 'Inter, sans-serif',
        titleSize: '16px',
        titleWeight: '600',
        priceSize: '18px',
        priceWeight: '700',
        descriptionSize: '14px',
        buttonSize: '14px'
      },
      imageAspectRatio: '1:1',
      buttonText: 'Добавить в корзину',
      buttonVariant: 'primary',
      buttonFullWidth: true,
      alignment: 'left',
      hoverEffect: 'lift',
      showDescription: true,
      showDiscount: true,
      showVariants: true
    }
  }
};
```

Этот код предоставляет полный набор настраиваемых карточек товаров для вашего конструктора. Каждая карточка имеет свои особенности и может быть настроена через множество параметров, что обеспечивает максимальную гибкость для пользователей конструктора.

