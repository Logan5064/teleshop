/**
 * 🛍️ TeleShop Product Types
 * Строгая типизация для замены any типов
 */

// Базовые типы
export interface ProductAttribute {
  id: string;
  name: string;
  values: ProductAttributeValue[];
}

export interface ProductAttributeValue {
  id: string;
  name: string;
  description?: string;
}

// Основные типы продуктов
export type ProductType = 'physical' | 'digital' | 'food' | 'service' | 'subscription';
export type WeightUnit = 'g' | 'kg' | 'lb' | 'oz';
export type DimensionUnit = 'cm' | 'm' | 'mm' | 'in' | 'ft';
export type FileSizeUnit = 'KB' | 'MB' | 'GB' | 'TB';
export type ServiceDurationUnit = 'minutes' | 'hours' | 'days' | 'weeks' | 'months';
export type ProductCondition = 'new' | 'used' | 'refurbished' | 'damaged';
export type SpicinesLevel = 'mild' | 'medium' | 'hot' | 'extra-hot';

// Интерфейс формы продукта
export interface ProductForm {
  // Основная информация
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  currency: string;
  category: string;
  tags: string[];
  images: string[];
  
  // Характеристики
  attributes: ProductAttribute[];
  
  // Физические товары
  weight?: number;
  weightUnit?: WeightUnit;
  dimensions?: {
    length: number;
    width: number;
    height: number;
    unit: DimensionUnit;
  };
  condition?: ProductCondition;
  warrantyMonths?: number;
  material?: string;
  
  // Цифровые товары
  fileSize?: number;
  fileSizeUnit?: FileSizeUnit;
  fileFormat?: string;
  accessDuration?: number;
  
  // Еда
  calories?: number;
  spiciness?: SpicinesLevel;
  cookingTime?: number;
  ingredients?: string[];
  
  // Услуги
  serviceDuration?: number;
  serviceDurationUnit?: ServiceDurationUnit;
  
  // Статус
  isActive: boolean;
  isDigital: boolean;
  hasVariants: boolean;
  stockQuantity?: number;
  inStock?: boolean;
  isNew?: boolean;
  isPopular?: boolean;
  isOnOrder?: boolean;
  quantity?: number;
  
  // Метаданные
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
}

// Функциональные типы
export type ProductFormUpdater = (updater: (prev: ProductForm) => ProductForm) => void;

export interface ProductModule {
  id: string;
  name: string;
  icon: string;
  description: string;
  attributeName?: string;
  values?: string[];
  isEnabled: boolean;
}

export interface CharacteristicLibrary {
  id: string;
  name: string;
  description?: string;
  values: ProductAttributeValue[];
  category?: string;
  isCustom?: boolean;
}

// API типы
export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  category: string;
  attributes: ProductAttribute[];
  images: string[];
  isActive: boolean;
  stockQuantity?: number;
}

export interface Product extends CreateProductRequest {
  id: number;
  created_at: string;
  updated_at: string;
  views_count: number;
  orders_count: number;
}

export interface ProductStats {
  totalProducts: number;
  activeProducts: number;
  totalOrders: number;
  totalRevenue: number;
  topProducts: Product[];
}

// Компонент пропсы
export interface ProductFormProps {
  productForm: ProductForm;
  setProductForm: ProductFormUpdater;
}

export interface ProductCharacteristicsProps extends ProductFormProps {
  characteristicsLibrary: CharacteristicLibrary[];
  setCharacteristicsLibrary: (updater: (prev: CharacteristicLibrary[]) => CharacteristicLibrary[]) => void;
}

export interface ProductModulesProps extends ProductFormProps {
  modules?: ProductModule[];
}

export interface AddProductFormProps {
  onSave: (productData: CreateProductRequest) => void;
  onCancel?: () => void;
  initialData?: Partial<ProductForm>;
}

// Утилитарные типы
export type ProductFormField = keyof ProductForm;
export type ProductValidationErrors = Partial<Record<ProductFormField, string>>;

// Константы
export const DEFAULT_PRODUCT_FORM: ProductForm = {
  name: '',
  description: '',
  price: 0,
  currency: '₽',
  category: '',
  tags: [],
  images: [],
  attributes: [],
  isActive: true,
  isDigital: false,
  hasVariants: false
};

export const WEIGHT_UNITS: WeightUnit[] = ['g', 'kg', 'lb', 'oz'];
export const DIMENSION_UNITS: DimensionUnit[] = ['cm', 'm', 'mm', 'in', 'ft'];
export const FILE_SIZE_UNITS: FileSizeUnit[] = ['KB', 'MB', 'GB', 'TB'];
export const SERVICE_DURATION_UNITS: ServiceDurationUnit[] = ['minutes', 'hours', 'days', 'weeks', 'months']; 