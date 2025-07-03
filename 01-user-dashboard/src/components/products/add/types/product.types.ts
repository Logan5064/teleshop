// Основные типы товаров
export type ProductType = 'physical' | 'digital' | 'food' | 'service' | 'ticket' | 'subscription';

// Состояние товара
export type ProductCondition = 'new' | 'like-new' | 'good' | 'acceptable' | 'worn';

// Статус наличия товара
export type StockType = 'limited' | 'unlimited' | 'out-of-stock';

// Интерфейс характеристики
export interface Characteristic {
  id: string;
  name: string;
  values: Array<{
    id: string;
    name: string;
  }>;
}

// Интерфейс атрибута товара
export interface ProductAttribute {
  id: string;
  name: string;
  isFromModule?: boolean;
  values: Array<{
    id: string;
    name: string;
  }>;
}

// Интерфейс вариации товара  
export interface ProductVariation {
  id: string;
  combination: Array<{
    attributeId: string;
    valueId: string;
  }>;
  sku: string;
  price: string;
  oldPrice: string;
  quantity: string;
  weight: string;
  images: string[];
  isActive: boolean;
}

// Модули товара
export interface ProductModules {
  // Физические товары
  clothingSizes: boolean;
  shoeSizes: boolean;
  weight: boolean;
  dimensions: boolean;
  colors: boolean;
  materials: boolean;
  condition: boolean;
  warranty: boolean;
  // Цифровые товары
  fileSize: boolean;
  fileFormat: boolean;
  accessDuration: boolean;
  // Еда и напитки
  calories: boolean;
  spiciness: boolean;
  cookingTime: boolean;
  // Услуги
  serviceDuration: boolean;
  serviceLocation: boolean;
  // Билеты/События
  eventDate: boolean;
  eventTime: boolean;
  ageRestrictions: boolean;
  // Подписки
  subscriptionType: boolean;
  autoRenewal: boolean;
}

// Основной интерфейс формы товара
export interface ProductForm {
  // Тип товара
  productType: ProductType;
  
  // Основная информация
  name: string;
  description: string;
  images: string[];
  
  // Модули
  modules: ProductModules;
  
  // Дополнительные поля модулей
  weightUnit: string;
  dimensionUnit: string;
  condition: ProductCondition;
  warrantyMonths: string;
  
  // Вариации товара
  hasVariations: boolean;
  attributes: ProductAttribute[];
  variations: ProductVariation[];
  
  // Выбранные характеристики товара
  selectedCharacteristics: Record<string, string>;
  
  // Физические характеристики
  characteristics: string;
  dimensions: {
    width: string;
    length: string;
    height: string;
  };
  clothingSizes: string[];
  shoeSizes: number[];
  weight: string;
  color: string;
  material?: string;
  
  // Цены и количество
  price: string;
  oldPrice: string;
  quantity: string;
  unit: string;
  
  // Статусы
  isNew: boolean;
  isPopular: boolean;
  isOnOrder: boolean;
  inStock: boolean;
  stockType: StockType;
  
  // Цифровые товары
  downloadLink: string;
  fileSize: string;
  fileSizeUnit: string;
  systemRequirements: string;
  
  // Еда и напитки
  ingredients: string;
  allergens: string[];
  calories: string;
  portionWeight: string;
  spiciness: number;
  cookingTime: string;
  
  // Услуги
  serviceDuration: string;
  serviceDurationUnit: string;
  requirements: string;
  included: string;
  
  // Билеты и события
  venue: string;
  duration: string;
  ageRestrictions: string;
  
  // Подписки
  subscriptionFeatures: string[];
}

// Пропсы для компонентов
export interface AddProductFormProps {
  onSave: (productData: ProductForm) => void;
  onCancel: () => void;
}

export interface ProductModulesProps {
  productForm: ProductForm;
  setProductForm: React.Dispatch<React.SetStateAction<ProductForm>>;
  generateId: () => string;
} 