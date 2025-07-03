# 📂 Код блоков категорий товаров для TeleShop Constructor

**Дата:** 25 июня 2025  
**Автор:** Manus AI  
**Цель:** Разработка полного набора настраиваемых блоков отображения категорий товаров для конструктора TeleShop.

## 📋 Обзор блоков категорий

Блоки категорий являются важным элементом навигации в любом e-commerce интерфейсе. Они помогают пользователям быстро находить нужные товары и создают удобную структуру каталога. В рамках конструктора TeleShop мы разработаем несколько вариантов отображения категорий, каждый из которых будет иметь свои особенности и области применения.

Основные варианты блоков категорий, которые мы создадим:

1. **Сетка категорий (CategoryGrid)** - классическое отображение в виде сетки
2. **Список категорий (CategoryList)** - вертикальный список с иконками
3. **Горизонтальная прокрутка (CategoryScroll)** - горизонтальная карусель категорий
4. **Категории с изображениями (CategoryImageGrid)** - большие карточки с фоновыми изображениями
5. **Компактные категории (CategoryCompact)** - минималистичное отображение
6. **Иерархические категории (CategoryHierarchy)** - с подкатегориями

## 🎯 Базовые интерфейсы и типы для категорий

Определим базовые интерфейсы, которые будут использоваться во всех компонентах категорий.

```typescript
// types/Category.ts
export interface Category {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  iconUrl?: string;
  iconName?: string; // Для иконочных шрифтов
  color?: string; // Цвет категории
  productCount?: number;
  isActive?: boolean;
  parentId?: string;
  children?: Category[];
  slug?: string;
  metadata?: {
    featured?: boolean;
    new?: boolean;
    popular?: boolean;
    discount?: number;
  };
}

// types/CategoryBlockProps.ts
export interface CategoryBlockProps extends BaseBlockProps {
  categories: Category[];
  
  // Настройки отображения
  layout?: 'grid' | 'list' | 'scroll' | 'hierarchy';
  columns?: number; // Количество колонок в сетке
  showDescription?: boolean;
  showProductCount?: boolean;
  showIcons?: boolean;
  showImages?: boolean;
  showBadges?: boolean; // Показывать бейджи (new, popular, etc.)
  
  // Настройки изображений
  imageAspectRatio?: '1:1' | '4:3' | '16:9' | 'auto';
  imageObjectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
  
  // Настройки макета
  gap?: string; // Расстояние между элементами
  alignment?: 'left' | 'center' | 'right';
  
  // Настройки поведения
  clickable?: boolean;
  hoverEffect?: 'none' | 'lift' | 'scale' | 'shadow' | 'highlight';
  
  // Адаптивные настройки
  mobileColumns?: number;
  tabletColumns?: number;
  
  // Обработчики событий
  onCategoryClick?: (category: Category) => void;
  onCategoryHover?: (category: Category) => void;
}
```

## 🎨 Стилизованные компоненты для категорий

Создадим набор базовых стилизованных компонентов для блоков категорий.

```typescript
// components/CategoryBlocks/styled.ts
import styled, { css, keyframes } from 'styled-components';
import { CategoryBlockProps } from '../../types/CategoryBlockProps';

// Анимации
const liftAnimation = keyframes`
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(-3px);
  }
`;

const scaleAnimation = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.05);
  }
`;

const highlightAnimation = keyframes`
  from {
    background-color: transparent;
  }
  to {
    background-color: rgba(59, 130, 246, 0.1);
  }
`;

// Базовый контейнер для блоков категорий
export const CategoryBlockContainer = styled.div<Pick<CategoryBlockProps, 'styles' | 'responsive'>>`
  width: 100%;
  background-color: ${props => props.styles?.backgroundColor || 'transparent'};
  padding: ${props => props.styles?.padding || '16px'};
  margin: ${props => props.styles?.margin || '0'};
  border-radius: ${props => props.styles?.borderRadius || '0px'};

  @media (max-width: 480px) {
    padding: ${props => props.responsive?.mobile?.padding || props.styles?.padding || '12px'};
  }

  @media (min-width: 481px) and (max-width: 768px) {
    padding: ${props => props.responsive?.tablet?.padding || props.styles?.padding || '16px'};
  }
`;

// Сетка категорий
export const CategoryGrid = styled.div<{ 
  columns?: number; 
  gap?: string; 
  mobileColumns?: number; 
  tabletColumns?: number; 
}>`
  display: grid;
  grid-template-columns: repeat(${props => props.columns || 2}, 1fr);
  gap: ${props => props.gap || '16px'};

  @media (max-width: 480px) {
    grid-template-columns: repeat(${props => props.mobileColumns || 1}, 1fr);
    gap: ${props => props.gap || '12px'};
  }

  @media (min-width: 481px) and (max-width: 768px) {
    grid-template-columns: repeat(${props => props.tabletColumns || 2}, 1fr);
  }
`;

// Список категорий
export const CategoryListContainer = styled.div<{ gap?: string }>`
  display: flex;
  flex-direction: column;
  gap: ${props => props.gap || '12px'};
`;

// Горизонтальная прокрутка
export const CategoryScrollContainer = styled.div<{ gap?: string }>`
  display: flex;
  gap: ${props => props.gap || '16px'};
  overflow-x: auto;
  padding-bottom: 8px;
  
  /* Стилизация скроллбара */
  &::-webkit-scrollbar {
    height: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #a1a1a1;
  }
`;

// Элемент категории
export const CategoryItem = styled.div<Pick<CategoryBlockProps, 'styles' | 'hoverEffect' | 'clickable' | 'alignment'>>`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.styles?.backgroundColor || '#FFFFFF'};
  border-radius: ${props => props.styles?.borderRadius || '12px'};
  padding: ${props => props.styles?.padding || '16px'};
  border: ${props => props.styles?.borderWidth || '1px'} solid ${props => props.styles?.borderColor || '#E5E7EB'};
  box-shadow: ${props => props.styles?.boxShadow || '0px 1px 3px rgba(0, 0, 0, 0.1)'};
  cursor: ${props => props.clickable ? 'pointer' : 'default'};
  transition: all 0.3s ease;
  text-align: ${props => props.alignment || 'center'};
  position: relative;
  overflow: hidden;

  ${props => props.clickable && props.hoverEffect === 'lift' && css`
    &:hover {
      animation: ${liftAnimation} 0.3s ease forwards;
      box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
    }
  `}

  ${props => props.clickable && props.hoverEffect === 'scale' && css`
    &:hover {
      animation: ${scaleAnimation} 0.3s ease forwards;
    }
  `}

  ${props => props.clickable && props.hoverEffect === 'shadow' && css`
    &:hover {
      box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.15);
    }
  `}

  ${props => props.clickable && props.hoverEffect === 'highlight' && css`
    &:hover {
      animation: ${highlightAnimation} 0.3s ease forwards;
    }
  `}
`;

// Элемент списка категорий
export const CategoryListItem = styled.div<Pick<CategoryBlockProps, 'styles' | 'hoverEffect' | 'clickable'>>`
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: ${props => props.styles?.backgroundColor || '#FFFFFF'};
  border-radius: ${props => props.styles?.borderRadius || '8px'};
  padding: ${props => props.styles?.padding || '12px 16px'};
  border: ${props => props.styles?.borderWidth || '1px'} solid ${props => props.styles?.borderColor || '#E5E7EB'};
  cursor: ${props => props.clickable ? 'pointer' : 'default'};
  transition: all 0.2s ease;

  ${props => props.clickable && css`
    &:hover {
      background-color: ${props.styles?.secondaryColor || '#F3F4F6'};
      border-color: ${props.styles?.primaryColor || '#3B82F6'};
    }
  `}
`;

// Элемент горизонтальной прокрутки
export const CategoryScrollItem = styled.div<Pick<CategoryBlockProps, 'styles' | 'hoverEffect' | 'clickable'>>`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 80px;
  background-color: ${props => props.styles?.backgroundColor || '#FFFFFF'};
  border-radius: ${props => props.styles?.borderRadius || '12px'};
  padding: ${props => props.styles?.padding || '12px'};
  border: ${props => props.styles?.borderWidth || '1px'} solid ${props => props.styles?.borderColor || '#E5E7EB'};
  cursor: ${props => props.clickable ? 'pointer' : 'default'};
  transition: all 0.2s ease;
  flex-shrink: 0;

  ${props => props.clickable && css`
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    }
  `}
`;

// Контейнер изображения категории
export const CategoryImageContainer = styled.div<{ 
  aspectRatio?: string; 
  borderRadius?: string;
  size?: string;
}>`
  position: relative;
  width: ${props => props.size || '100%'};
  margin-bottom: 8px;
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

// Изображение категории
export const CategoryImage = styled.img<{ objectFit?: string; aspectRatio?: string }>`
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

// Иконка категории
export const CategoryIcon = styled.div<{ 
  size?: string; 
  color?: string; 
  backgroundColor?: string;
  borderRadius?: string;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.size || '48px'};
  height: ${props => props.size || '48px'};
  background-color: ${props => props.backgroundColor || '#F3F4F6'};
  color: ${props => props.color || '#6B7280'};
  border-radius: ${props => props.borderRadius || '50%'};
  font-size: ${props => props.size ? `calc(${props.size} * 0.5)` : '24px'};
  margin-bottom: 8px;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

// Название категории
export const CategoryName = styled.h3<Pick<CategoryBlockProps, 'typography' | 'styles'>>`
  margin: 0 0 4px 0;
  font-family: ${props => props.typography?.fontFamily || 'Inter, sans-serif'};
  font-size: ${props => props.typography?.titleSize || '16px'};
  font-weight: ${props => props.typography?.titleWeight || '600'};
  color: ${props => props.styles?.textColor || '#1F2937'};
  line-height: 1.4;
  text-align: inherit;
`;

// Описание категории
export const CategoryDescription = styled.p<Pick<CategoryBlockProps, 'typography' | 'styles'>>`
  margin: 0 0 8px 0;
  font-family: ${props => props.typography?.fontFamily || 'Inter, sans-serif'};
  font-size: ${props => props.typography?.descriptionSize || '14px'};
  color: ${props => props.styles?.secondaryColor || '#6B7280'};
  line-height: 1.5;
  text-align: inherit;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

// Счетчик товаров
export const ProductCount = styled.span<Pick<CategoryBlockProps, 'typography' | 'styles'>>`
  font-family: ${props => props.typography?.fontFamily || 'Inter, sans-serif'};
  font-size: ${props => props.typography?.captionSize || '12px'};
  color: ${props => props.styles?.secondaryColor || '#9CA3AF'};
  font-weight: 500;
`;

// Бейдж категории
export const CategoryBadge = styled.div<{ 
  type?: 'new' | 'popular' | 'discount';
  accentColor?: string;
}>`
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  
  ${props => {
    switch (props.type) {
      case 'new':
        return css`
          background-color: #10B981;
          color: white;
        `;
      case 'popular':
        return css`
          background-color: #F59E0B;
          color: white;
        `;
      case 'discount':
        return css`
          background-color: ${props.accentColor || '#EF4444'};
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

// Контейнер для иерархических категорий
export const HierarchyContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ParentCategory = styled.div<Pick<CategoryBlockProps, 'styles' | 'clickable'>>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background-color: ${props => props.styles?.backgroundColor || '#F9FAFB'};
  border-radius: ${props => props.styles?.borderRadius || '8px'};
  cursor: ${props => props.clickable ? 'pointer' : 'default'};
  margin-bottom: 8px;
  
  &:hover {
    background-color: ${props => props.styles?.secondaryColor || '#F3F4F6'};
  }
`;

export const ChildCategories = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-left: 16px;
  margin-bottom: 12px;
`;

export const ChildCategory = styled.div<Pick<CategoryBlockProps, 'styles' | 'clickable'>>`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: ${props => props.clickable ? 'pointer' : 'default'};
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${props => props.styles?.secondaryColor || '#F3F4F6'};
  }
`;

// Индикатор раскрытия для иерархии
export const ExpandIcon = styled.div<{ expanded?: boolean; primaryColor?: string }>`
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.primaryColor || '#6B7280'};
  transform: ${props => props.expanded ? 'rotate(90deg)' : 'rotate(0deg)'};
  transition: transform 0.2s ease;
  
  &::before {
    content: '▶';
    font-size: 12px;
  }
`;
```

## 🎯 Блок категорий: Сетка

Классическое отображение категорий в виде сетки с изображениями или иконками.

```typescript
// components/CategoryBlocks/CategoryGrid.tsx
import React from 'react';
import { CategoryBlockProps, Category } from '../../types/CategoryBlockProps';
import {
  CategoryBlockContainer,
  CategoryGrid as Grid,
  CategoryItem,
  CategoryImageContainer,
  CategoryImage,
  CategoryIcon,
  CategoryName,
  CategoryDescription,
  ProductCount,
  CategoryBadge
} from './styled';

const CategoryGrid: React.FC<CategoryBlockProps> = ({
  categories,
  styles = {},
  typography = {},
  responsive = {},
  columns = 2,
  mobileColumns = 1,
  tabletColumns = 2,
  gap = '16px',
  alignment = 'center',
  showDescription = false,
  showProductCount = true,
  showIcons = true,
  showImages = true,
  showBadges = true,
  imageAspectRatio = '1:1',
  imageObjectFit = 'cover',
  clickable = true,
  hoverEffect = 'lift',
  onCategoryClick,
  ...props
}) => {
  const handleCategoryClick = (category: Category) => {
    if (clickable && onCategoryClick) {
      onCategoryClick(category);
    }
  };

  const renderCategoryContent = (category: Category) => (
    <>
      {showBadges && category.metadata?.new && (
        <CategoryBadge type="new">New</CategoryBadge>
      )}
      {showBadges && category.metadata?.popular && (
        <CategoryBadge type="popular">Popular</CategoryBadge>
      )}
      {showBadges && category.metadata?.discount && (
        <CategoryBadge type="discount" accentColor={styles.accentColor}>
          -{category.metadata.discount}%
        </CategoryBadge>
      )}

      {showImages && category.imageUrl ? (
        <CategoryImageContainer 
          aspectRatio={imageAspectRatio}
          borderRadius={styles.borderRadius}
        >
          <CategoryImage
            src={category.imageUrl}
            alt={category.name}
            objectFit={imageObjectFit}
            aspectRatio={imageAspectRatio}
          />
        </CategoryImageContainer>
      ) : showIcons && (category.iconUrl || category.iconName) ? (
        <CategoryIcon
          size="48px"
          color={category.color || styles.primaryColor}
          backgroundColor={styles.secondaryColor}
          borderRadius={styles.borderRadius}
        >
          {category.iconUrl ? (
            <img src={category.iconUrl} alt={category.name} style={{ width: '24px', height: '24px' }} />
          ) : (
            <span>{category.iconName || '📁'}</span>
          )}
        </CategoryIcon>
      ) : null}

      <CategoryName
        typography={typography}
        styles={styles}
      >
        {category.name}
      </CategoryName>

      {showDescription && category.description && (
        <CategoryDescription
          typography={typography}
          styles={styles}
        >
          {category.description}
        </CategoryDescription>
      )}

      {showProductCount && category.productCount !== undefined && (
        <ProductCount
          typography={typography}
          styles={styles}
        >
          {category.productCount} товаров
        </ProductCount>
      )}
    </>
  );

  return (
    <CategoryBlockContainer
      styles={styles}
      responsive={responsive}
      {...props}
    >
      <Grid
        columns={columns}
        mobileColumns={mobileColumns}
        tabletColumns={tabletColumns}
        gap={gap}
      >
        {categories.map(category => (
          <CategoryItem
            key={category.id}
            styles={styles}
            hoverEffect={hoverEffect}
            clickable={clickable}
            alignment={alignment}
            onClick={() => handleCategoryClick(category)}
          >
            {renderCategoryContent(category)}
          </CategoryItem>
        ))}
      </Grid>
    </CategoryBlockContainer>
  );
};

export default CategoryGrid;
```

## 🎯 Блок категорий: Список

Вертикальный список категорий с иконками и описаниями.

```typescript
// components/CategoryBlocks/CategoryList.tsx
import React from 'react';
import { CategoryBlockProps, Category } from '../../types/CategoryBlockProps';
import {
  CategoryBlockContainer,
  CategoryListContainer,
  CategoryListItem,
  CategoryIcon,
  CategoryName,
  CategoryDescription,
  ProductCount
} from './styled';

const CategoryList: React.FC<CategoryBlockProps> = ({
  categories,
  styles = {},
  typography = {},
  responsive = {},
  gap = '12px',
  alignment = 'left',
  showDescription = true,
  showProductCount = true,
  showIcons = true,
  clickable = true,
  hoverEffect = 'highlight',
  onCategoryClick,
  ...props
}) => {
  const handleCategoryClick = (category: Category) => {
    if (clickable && onCategoryClick) {
      onCategoryClick(category);
    }
  };

  return (
    <CategoryBlockContainer
      styles={styles}
      responsive={responsive}
      {...props}
    >
      <CategoryListContainer gap={gap}>
        {categories.map(category => (
          <CategoryListItem
            key={category.id}
            styles={styles}
            hoverEffect={hoverEffect}
            clickable={clickable}
            onClick={() => handleCategoryClick(category)}
          >
            {showIcons && (
              <CategoryIcon
                size="40px"
                color={category.color || styles.primaryColor}
                backgroundColor={styles.secondaryColor}
                borderRadius="8px"
              >
                {category.iconUrl ? (
                  <img src={category.iconUrl} alt={category.name} style={{ width: '20px', height: '20px' }} />
                ) : (
                  <span>{category.iconName || '📁'}</span>
                )}
              </CategoryIcon>
            )}

            <div style={{ flex: 1, textAlign: alignment }}>
              <CategoryName
                typography={typography}
                styles={styles}
              >
                {category.name}
              </CategoryName>

              {showDescription && category.description && (
                <CategoryDescription
                  typography={typography}
                  styles={styles}
                >
                  {category.description}
                </CategoryDescription>
              )}
            </div>

            {showProductCount && category.productCount !== undefined && (
              <ProductCount
                typography={typography}
                styles={styles}
              >
                {category.productCount}
              </ProductCount>
            )}
          </CategoryListItem>
        ))}
      </CategoryListContainer>
    </CategoryBlockContainer>
  );
};

export default CategoryList;
```

## 🎯 Блок категорий: Горизонтальная прокрутка

Горизонтальная карусель категорий для экономии вертикального пространства.

```typescript
// components/CategoryBlocks/CategoryScroll.tsx
import React from 'react';
import { CategoryBlockProps, Category } from '../../types/CategoryBlockProps';
import {
  CategoryBlockContainer,
  CategoryScrollContainer,
  CategoryScrollItem,
  CategoryIcon,
  CategoryName,
  ProductCount
} from './styled';

const CategoryScroll: React.FC<CategoryBlockProps> = ({
  categories,
  styles = {},
  typography = {},
  responsive = {},
  gap = '16px',
  alignment = 'center',
  showProductCount = false,
  showIcons = true,
  clickable = true,
  hoverEffect = 'lift',
  onCategoryClick,
  ...props
}) => {
  const handleCategoryClick = (category: Category) => {
    if (clickable && onCategoryClick) {
      onCategoryClick(category);
    }
  };

  return (
    <CategoryBlockContainer
      styles={styles}
      responsive={responsive}
      {...props}
    >
      <CategoryScrollContainer gap={gap}>
        {categories.map(category => (
          <CategoryScrollItem
            key={category.id}
            styles={styles}
            hoverEffect={hoverEffect}
            clickable={clickable}
            onClick={() => handleCategoryClick(category)}
          >
            {showIcons && (
              <CategoryIcon
                size="40px"
                color={category.color || styles.primaryColor}
                backgroundColor={styles.secondaryColor}
                borderRadius="50%"
              >
                {category.iconUrl ? (
                  <img src={category.iconUrl} alt={category.name} style={{ width: '20px', height: '20px' }} />
                ) : (
                  <span>{category.iconName || '📁'}</span>
                )}
              </CategoryIcon>
            )}

            <CategoryName
              typography={{
                ...typography,
                titleSize: typography.titleSize || '12px'
              }}
              styles={styles}
            >
              {category.name}
            </CategoryName>

            {showProductCount && category.productCount !== undefined && (
              <ProductCount
                typography={typography}
                styles={styles}
              >
                {category.productCount}
              </ProductCount>
            )}
          </CategoryScrollItem>
        ))}
      </CategoryScrollContainer>
    </CategoryBlockContainer>
  );
};

export default CategoryScroll;
```

## 🎯 Блок категорий: С большими изображениями

Большие карточки категорий с фоновыми изображениями для создания визуально привлекательного интерфейса.

```typescript
// components/CategoryBlocks/CategoryImageGrid.tsx
import React from 'react';
import styled from 'styled-components';
import { CategoryBlockProps, Category } from '../../types/CategoryBlockProps';
import {
  CategoryBlockContainer,
  CategoryGrid as Grid,
  CategoryName,
  ProductCount,
  CategoryBadge
} from './styled';

const ImageCategoryItem = styled.div<Pick<CategoryBlockProps, 'styles' | 'hoverEffect' | 'clickable'>>`
  position: relative;
  height: 200px;
  border-radius: ${props => props.styles?.borderRadius || '16px'};
  overflow: hidden;
  cursor: ${props => props.clickable ? 'pointer' : 'default'};
  transition: all 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(0, 0, 0, 0.3) 0%,
      rgba(0, 0, 0, 0.1) 50%,
      rgba(0, 0, 0, 0.4) 100%
    );
    z-index: 1;
  }

  ${props => props.clickable && props.hoverEffect === 'scale' && `
    &:hover {
      transform: scale(1.02);
    }
  `}

  ${props => props.clickable && props.hoverEffect === 'lift' && `
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.2);
    }
  `}

  @media (max-width: 480px) {
    height: 150px;
  }
`;

const BackgroundImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${ImageCategoryItem}:hover & {
    transform: scale(1.05);
  }
`;

const CategoryContent = styled.div<{ alignment?: string }>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  z-index: 2;
  text-align: ${props => props.alignment || 'left'};
  color: white;

  @media (max-width: 480px) {
    padding: 16px;
  }
`;

const ImageCategoryName = styled(CategoryName)`
  color: white;
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.5);
  margin-bottom: 4px;
`;

const ImageProductCount = styled(ProductCount)`
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.5);
`;

const CategoryImageGrid: React.FC<CategoryBlockProps> = ({
  categories,
  styles = {},
  typography = {},
  responsive = {},
  columns = 2,
  mobileColumns = 1,
  tabletColumns = 2,
  gap = '16px',
  alignment = 'left',
  showProductCount = true,
  showBadges = true,
  clickable = true,
  hoverEffect = 'scale',
  onCategoryClick,
  ...props
}) => {
  const handleCategoryClick = (category: Category) => {
    if (clickable && onCategoryClick) {
      onCategoryClick(category);
    }
  };

  return (
    <CategoryBlockContainer
      styles={styles}
      responsive={responsive}
      {...props}
    >
      <Grid
        columns={columns}
        mobileColumns={mobileColumns}
        tabletColumns={tabletColumns}
        gap={gap}
      >
        {categories.map(category => (
          <ImageCategoryItem
            key={category.id}
            styles={styles}
            hoverEffect={hoverEffect}
            clickable={clickable}
            onClick={() => handleCategoryClick(category)}
          >
            {showBadges && category.metadata?.featured && (
              <CategoryBadge type="popular">Featured</CategoryBadge>
            )}

            {category.imageUrl && (
              <BackgroundImage
                src={category.imageUrl}
                alt={category.name}
              />
            )}

            <CategoryContent alignment={alignment}>
              <ImageCategoryName
                typography={typography}
                styles={styles}
              >
                {category.name}
              </ImageCategoryName>

              {showProductCount && category.productCount !== undefined && (
                <ImageProductCount
                  typography={typography}
                  styles={styles}
                >
                  {category.productCount} товаров
                </ImageProductCount>
              )}
            </CategoryContent>
          </ImageCategoryItem>
        ))}
      </Grid>
    </CategoryBlockContainer>
  );
};

export default CategoryImageGrid;
```

## 🎯 Блок категорий: Компактный

Минималистичное отображение категорий для экономии места.

```typescript
// components/CategoryBlocks/CategoryCompact.tsx
import React from 'react';
import styled from 'styled-components';
import { CategoryBlockProps, Category } from '../../types/CategoryBlockProps';
import {
  CategoryBlockContainer,
  CategoryName,
  ProductCount
} from './styled';

const CompactGrid = styled.div<{ gap?: string }>`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.gap || '8px'};
`;

const CompactCategoryItem = styled.div<Pick<CategoryBlockProps, 'styles' | 'clickable'>>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background-color: ${props => props.styles?.backgroundColor || '#F3F4F6'};
  border: 1px solid ${props => props.styles?.borderColor || 'transparent'};
  border-radius: ${props => props.styles?.borderRadius || '20px'};
  cursor: ${props => props.clickable ? 'pointer' : 'default'};
  transition: all 0.2s ease;
  font-size: 14px;

  &:hover {
    background-color: ${props => props.styles?.primaryColor || '#3B82F6'};
    color: white;
    
    ${ProductCount} {
      color: rgba(255, 255, 255, 0.8);
    }
  }
`;

const CompactCategoryName = styled.span<Pick<CategoryBlockProps, 'typography' | 'styles'>>`
  font-family: ${props => props.typography?.fontFamily || 'Inter, sans-serif'};
  font-size: ${props => props.typography?.titleSize || '14px'};
  font-weight: ${props => props.typography?.titleWeight || '500'};
  color: ${props => props.styles?.textColor || '#374151'};
`;

const CategoryCompact: React.FC<CategoryBlockProps> = ({
  categories,
  styles = {},
  typography = {},
  responsive = {},
  gap = '8px',
  showProductCount = true,
  clickable = true,
  onCategoryClick,
  ...props
}) => {
  const handleCategoryClick = (category: Category) => {
    if (clickable && onCategoryClick) {
      onCategoryClick(category);
    }
  };

  return (
    <CategoryBlockContainer
      styles={styles}
      responsive={responsive}
      {...props}
    >
      <CompactGrid gap={gap}>
        {categories.map(category => (
          <CompactCategoryItem
            key={category.id}
            styles={styles}
            clickable={clickable}
            onClick={() => handleCategoryClick(category)}
          >
            <CompactCategoryName
              typography={typography}
              styles={styles}
            >
              {category.name}
            </CompactCategoryName>

            {showProductCount && category.productCount !== undefined && (
              <ProductCount
                typography={typography}
                styles={styles}
              >
                ({category.productCount})
              </ProductCount>
            )}
          </CompactCategoryItem>
        ))}
      </CompactGrid>
    </CategoryBlockContainer>
  );
};

export default CategoryCompact;
```

## 🎯 Блок категорий: Иерархический

Отображение категорий с подкатегориями в виде раскрывающегося дерева.

```typescript
// components/CategoryBlocks/CategoryHierarchy.tsx
import React, { useState } from 'react';
import { CategoryBlockProps, Category } from '../../types/CategoryBlockProps';
import {
  CategoryBlockContainer,
  HierarchyContainer,
  ParentCategory,
  ChildCategories,
  ChildCategory,
  CategoryIcon,
  CategoryName,
  ProductCount,
  ExpandIcon
} from './styled';

const CategoryHierarchy: React.FC<CategoryBlockProps> = ({
  categories,
  styles = {},
  typography = {},
  responsive = {},
  showProductCount = true,
  showIcons = true,
  clickable = true,
  onCategoryClick,
  ...props
}) => {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const handleCategoryClick = (category: Category) => {
    if (clickable && onCategoryClick) {
      onCategoryClick(category);
    }
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  const renderCategory = (category: Category, isChild = false) => {
    const hasChildren = category.children && category.children.length > 0;
    const isExpanded = expandedCategories.has(category.id);

    if (isChild) {
      return (
        <ChildCategory
          key={category.id}
          styles={styles}
          clickable={clickable}
          onClick={() => handleCategoryClick(category)}
        >
          {showIcons && (
            <CategoryIcon
              size="24px"
              color={category.color || styles.primaryColor}
              backgroundColor="transparent"
              borderRadius="4px"
            >
              {category.iconUrl ? (
                <img src={category.iconUrl} alt={category.name} style={{ width: '12px', height: '12px' }} />
              ) : (
                <span style={{ fontSize: '12px' }}>{category.iconName || '📄'}</span>
              )}
            </CategoryIcon>
          )}

          <CategoryName
            typography={{
              ...typography,
              titleSize: typography.titleSize || '14px'
            }}
            styles={styles}
          >
            {category.name}
          </CategoryName>

          {showProductCount && category.productCount !== undefined && (
            <ProductCount
              typography={typography}
              styles={styles}
              style={{ marginLeft: 'auto' }}
            >
              {category.productCount}
            </ProductCount>
          )}
        </ChildCategory>
      );
    }

    return (
      <div key={category.id}>
        <ParentCategory
          styles={styles}
          clickable={clickable}
          onClick={() => {
            if (hasChildren) {
              toggleCategory(category.id);
            } else {
              handleCategoryClick(category);
            }
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {hasChildren && (
              <ExpandIcon
                expanded={isExpanded}
                primaryColor={styles.primaryColor}
              />
            )}

            {showIcons && (
              <CategoryIcon
                size="32px"
                color={category.color || styles.primaryColor}
                backgroundColor={styles.secondaryColor}
                borderRadius="6px"
              >
                {category.iconUrl ? (
                  <img src={category.iconUrl} alt={category.name} style={{ width: '16px', height: '16px' }} />
                ) : (
                  <span style={{ fontSize: '16px' }}>{category.iconName || '📁'}</span>
                )}
              </CategoryIcon>
            )}

            <CategoryName
              typography={typography}
              styles={styles}
            >
              {category.name}
            </CategoryName>
          </div>

          {showProductCount && category.productCount !== undefined && (
            <ProductCount
              typography={typography}
              styles={styles}
            >
              {category.productCount} товаров
            </ProductCount>
          )}
        </ParentCategory>

        {hasChildren && isExpanded && (
          <ChildCategories>
            {category.children!.map(child => renderCategory(child, true))}
          </ChildCategories>
        )}
      </div>
    );
  };

  return (
    <CategoryBlockContainer
      styles={styles}
      responsive={responsive}
      {...props}
    >
      <HierarchyContainer>
        {categories.map(category => renderCategory(category))}
      </HierarchyContainer>
    </CategoryBlockContainer>
  );
};

export default CategoryHierarchy;
```

## 📝 Настройки блоков категорий для конструктора

Создадим файл настроек для всех блоков категорий.

```typescript
// components/CategoryBlocks/settings.ts
export const categoryBlockSettings = {
  grid: {
    name: 'Сетка категорий',
    description: 'Классическое отображение категорий в виде сетки',
    category: 'Навигация',
    icon: '⚏',
    defaultProps: {
      styles: {
        backgroundColor: 'transparent',
        textColor: '#1F2937',
        primaryColor: '#3B82F6',
        secondaryColor: '#F3F4F6',
        borderColor: '#E5E7EB',
        borderRadius: '12px',
        padding: '16px',
        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)'
      },
      typography: {
        fontFamily: 'Inter, sans-serif',
        titleSize: '16px',
        titleWeight: '600',
        descriptionSize: '14px',
        captionSize: '12px'
      },
      columns: 2,
      mobileColumns: 1,
      tabletColumns: 2,
      gap: '16px',
      alignment: 'center',
      showDescription: false,
      showProductCount: true,
      showIcons: true,
      showImages: true,
      showBadges: true,
      imageAspectRatio: '1:1',
      clickable: true,
      hoverEffect: 'lift'
    },
    customizableProps: [
      {
        name: 'columns',
        label: 'Количество колонок',
        type: 'number',
        min: 1,
        max: 4,
        category: 'Макет'
      },
      {
        name: 'mobileColumns',
        label: 'Колонок на мобильном',
        type: 'number',
        min: 1,
        max: 2,
        category: 'Адаптивность'
      },
      {
        name: 'gap',
        label: 'Расстояние между элементами',
        type: 'select',
        options: ['8px', '12px', '16px', '20px', '24px'],
        category: 'Макет'
      },
      {
        name: 'alignment',
        label: 'Выравнивание текста',
        type: 'select',
        options: ['left', 'center', 'right'],
        category: 'Макет'
      },
      {
        name: 'showDescription',
        label: 'Показывать описание',
        type: 'boolean',
        category: 'Контент'
      },
      {
        name: 'showProductCount',
        label: 'Показывать количество товаров',
        type: 'boolean',
        category: 'Контент'
      },
      {
        name: 'showIcons',
        label: 'Показывать иконки',
        type: 'boolean',
        category: 'Контент'
      },
      {
        name: 'showImages',
        label: 'Показывать изображения',
        type: 'boolean',
        category: 'Контент'
      },
      {
        name: 'imageAspectRatio',
        label: 'Пропорции изображения',
        type: 'select',
        options: ['1:1', '4:3', '16:9', 'auto'],
        category: 'Изображение'
      },
      {
        name: 'hoverEffect',
        label: 'Эффект при наведении',
        type: 'select',
        options: ['none', 'lift', 'scale', 'shadow', 'highlight'],
        category: 'Анимация'
      }
    ]
  },

  list: {
    name: 'Список категорий',
    description: 'Вертикальный список категорий с иконками',
    category: 'Навигация',
    icon: '☰',
    defaultProps: {
      styles: {
        backgroundColor: '#FFFFFF',
        textColor: '#1F2937',
        primaryColor: '#10B981',
        secondaryColor: '#F3F4F6',
        borderColor: '#E5E7EB',
        borderRadius: '8px',
        padding: '12px 16px'
      },
      typography: {
        fontFamily: 'Inter, sans-serif',
        titleSize: '16px',
        titleWeight: '600',
        descriptionSize: '14px',
        captionSize: '12px'
      },
      gap: '12px',
      alignment: 'left',
      showDescription: true,
      showProductCount: true,
      showIcons: true,
      clickable: true,
      hoverEffect: 'highlight'
    }
  },

  scroll: {
    name: 'Горизонтальная прокрутка',
    description: 'Горизонтальная карусель категорий',
    category: 'Навигация',
    icon: '↔',
    defaultProps: {
      styles: {
        backgroundColor: '#FFFFFF',
        textColor: '#1F2937',
        primaryColor: '#8B5CF6',
        secondaryColor: '#F3F4F6',
        borderColor: '#E5E7EB',
        borderRadius: '12px',
        padding: '12px'
      },
      typography: {
        fontFamily: 'Inter, sans-serif',
        titleSize: '12px',
        titleWeight: '600',
        captionSize: '10px'
      },
      gap: '16px',
      alignment: 'center',
      showProductCount: false,
      showIcons: true,
      clickable: true,
      hoverEffect: 'lift'
    }
  },

  imageGrid: {
    name: 'Категории с изображениями',
    description: 'Большие карточки с фоновыми изображениями',
    category: 'Навигация',
    icon: '🖼',
    defaultProps: {
      styles: {
        backgroundColor: 'transparent',
        textColor: '#FFFFFF',
        primaryColor: '#DC2626',
        borderRadius: '16px',
        padding: '16px'
      },
      typography: {
        fontFamily: 'Inter, sans-serif',
        titleSize: '18px',
        titleWeight: '700',
        captionSize: '14px'
      },
      columns: 2,
      mobileColumns: 1,
      tabletColumns: 2,
      gap: '16px',
      alignment: 'left',
      showProductCount: true,
      showBadges: true,
      clickable: true,
      hoverEffect: 'scale'
    }
  },

  compact: {
    name: 'Компактные категории',
    description: 'Минималистичные теги категорий',
    category: 'Навигация',
    icon: '🏷',
    defaultProps: {
      styles: {
        backgroundColor: '#F3F4F6',
        textColor: '#374151',
        primaryColor: '#3B82F6',
        borderColor: 'transparent',
        borderRadius: '20px',
        padding: '6px 12px'
      },
      typography: {
        fontFamily: 'Inter, sans-serif',
        titleSize: '14px',
        titleWeight: '500',
        captionSize: '12px'
      },
      gap: '8px',
      showProductCount: true,
      clickable: true
    }
  },

  hierarchy: {
    name: 'Иерархические категории',
    description: 'Категории с подкатегориями в виде дерева',
    category: 'Навигация',
    icon: '🌳',
    defaultProps: {
      styles: {
        backgroundColor: '#F9FAFB',
        textColor: '#1F2937',
        primaryColor: '#6B7280',
        secondaryColor: '#F3F4F6',
        borderRadius: '8px',
        padding: '12px 16px'
      },
      typography: {
        fontFamily: 'Inter, sans-serif',
        titleSize: '16px',
        titleWeight: '600',
        captionSize: '12px'
      },
      showProductCount: true,
      showIcons: true,
      clickable: true
    }
  }
};
```

Этот код предоставляет полный набор настраиваемых блоков категорий для вашего конструктора. Каждый блок имеет свои особенности и может быть настроен через множество параметров, обеспечивая максимальную гибкость для создания различных типов навигации по категориям товаров.

