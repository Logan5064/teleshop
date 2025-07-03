// Типы блоков для TeleShop Constructor

export type BlockType = 
  // Telegram блоки
  | 'telegram-banner'
  | 'telegram-product'
  | 'telegram-categories'
  | 'telegram-slider'
  | 'telegram-contacts'
  | 'telegram-map'
  // Основные блоки
  | 'banner' 
  | 'text' 
  | 'button' 
  | 'image' 
  | 'spacer'
  | 'product'
  | 'product-grid'
  | 'categories'
  | 'features'
  | 'testimonials'
  | 'price-list'
  | 'order-form'
  | 'payment'
  | 'delivery-info'
  | 'cart'
  | 'form'
  | 'contact'
  | 'social'
  | 'map'
  | 'video'
  | 'header'
  | 'footer'
  | 'divider'
  | 'columns'
  | 'tabs';

export interface BlockData {
  id: string;
  type: BlockType;
  order: number;
  data: Record<string, any>;
}

// Базовые пропсы для блоков
export interface BaseBlockProps {
  id: string;
  data: Record<string, any>;
  isEditing?: boolean;
  onEdit?: (id: string, newData: Record<string, any>) => void;
  onDelete?: (id: string) => void;
  onDuplicate?: (id: string) => void;
}

export interface ShopData {
  id?: string;
  name: string;
  blocks: BlockData[];
  settings?: {
    theme?: string;
    primaryColor?: string;
    secondaryColor?: string;
    fontFamily?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

// Категории блоков
export interface BlockCategory {
  id: string
  name: string
  icon: string
  blocks: BlockType[]
}

// Настройки блоков по умолчанию
export interface BlockDefaults {
  [key: string]: Record<string, unknown>
} 