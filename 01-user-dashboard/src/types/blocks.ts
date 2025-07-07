import { ReactNode } from 'react';

// Типы блоков для TeleShop Constructor

export type BlockType =
  | 'telegram-banner'
  | 'telegram-product'
  | 'telegram-categories'
  | 'telegram-slider'
  | 'telegram-contacts'
  | 'telegram-map'
  | 'text'
  | 'image'
  | 'button'
  | 'spacer'
  | 'tabs'
  | 'form'
  | 'banner'
  | 'product-grid'
  | 'categories'
  | 'features'
  | 'testimonials'
  | 'price-list'
  | 'order-form'
  | 'payment'
  | 'delivery-info'
  | 'cart'
  | 'contact'
  | 'social'
  | 'map'
  | 'video'
  | 'header'
  | 'footer'
  | 'divider'
  | 'columns';

export interface BlockInfo {
  type: BlockType;
  title: string;
  description?: string;
  icon?: string;
}

export interface BlockCategory {
  id: string;
  name: string;
  icon?: string;
  blocks: BlockInfo[];
}

export interface BlockData {
  id: string;
  type: BlockType;
  order: number;
  data: BlockDataType;
}

export type BlockDataType =
  | BannerData
  | ProductData
  | CategoriesData
  | SliderData
  | ContactsData
  | MapData
  | TextData
  | ImageData
  | ButtonData
  | SpacerData
  | TabsData
  | FormData
  | ProductGridData
  | FeaturesData
  | TestimonialsData
  | PriceListData
  | OrderFormData
  | PaymentData
  | DeliveryInfoData
  | CartData
  | ContactData
  | SocialData
  | VideoData
  | HeaderData
  | FooterData
  | DividerData
  | ColumnsData;

export interface BannerData {
  type?: 'telegram-banner' | 'banner';
  title: string;
  subtitle?: string;
  imageUrl?: string;
  buttonText?: string;
  buttonUrl?: string;
  backgroundColor?: string;
  textColor?: string;
  backgroundImage?: string;
  textAlign?: 'left' | 'center' | 'right';
  padding?: 'small' | 'medium' | 'large';
  borderRadius?: 'none' | 'small' | 'medium' | 'large';
}

export interface ProductData {
  type?: 'telegram-product' | 'product';
  productId: string;
  showDescription?: boolean;
  showPrice?: boolean;
  showButton?: boolean;
}

export interface CategoriesData {
  type?: 'telegram-categories' | 'categories';
  title: string;
  categories: Array<{
    id: string;
    name: string;
    icon?: string;
  }>;
}

export interface SliderData {
  type?: 'telegram-slider' | 'slider';
  images: Array<{
    url: string;
    alt?: string;
  }>;
}

export interface ContactsData {
  type?: 'telegram-contacts' | 'contacts';
  title: string;
  contacts: Array<{
    type: 'phone' | 'email' | 'telegram' | 'whatsapp';
    value: string;
    label?: string;
  }>;
}

export interface MapData {
  type?: 'telegram-map' | 'map';
  latitude: number;
  longitude: number;
  zoom: number;
}

export interface TextData {
  type?: 'text';
  content: string;
  align?: 'left' | 'center' | 'right';
  style?: 'normal' | 'bold' | 'italic';
  fontSize?: 'small' | 'medium' | 'large' | 'xl';
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  textColor?: string;
  backgroundColor?: string;
  padding?: 'none' | 'small' | 'medium' | 'large';
  fontWeight?: 'normal' | 'medium' | 'semibold' | 'bold';
  lineHeight?: 'tight' | 'normal' | 'relaxed' | 'loose';
  letterSpacing?: 'tighter' | 'tight' | 'normal' | 'wide' | 'wider';
}

export interface ImageData {
  type?: 'image';
  url: string;
  alt?: string;
  fullWidth?: boolean;
}

export interface ButtonData {
  type?: 'button';
  text: string;
  url?: string;
  style?: 'primary' | 'secondary' | 'outline' | 'solid' | 'ghost';
  backgroundColor?: string;
  textColor?: string;
  size?: 'small' | 'medium' | 'large';
  borderRadius?: 'none' | 'small' | 'medium' | 'large' | 'full';
  fullWidth?: boolean;
  icon?: string;
  animation?: 'none' | 'hover-lift' | 'hover-scale' | 'pulse';
}

export interface SpacerData {
  type?: 'spacer';
  height: number;
}

export interface TabsData {
  type?: 'tabs';
  tabs: Array<{
    id: string;
    title: string;
    content: string;
  }>;
}

export interface FormData {
  type?: 'form';
  fields: Array<{
    id: string;
    type: 'text' | 'email' | 'phone' | 'textarea';
    label: string;
    placeholder?: string;
    required?: boolean;
  }>;
  submitText: string;
  successMessage: string;
}

export interface ProductGridData {
  type: 'product-grid';
  title: string;
  products: string[];
  showFilters: boolean;
}

export interface FeaturesData {
  type: 'features';
  title: string;
  features: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;
}

export interface TestimonialsData {
  type: 'testimonials';
  title: string;
  testimonials: Array<{
    author: string;
    text: string;
    rating?: number;
    avatar?: string;
  }>;
}

export interface PriceListData {
  type: 'price-list';
  title: string;
  items: Array<{
    name: string;
    price: number;
    description?: string;
  }>;
}

export interface OrderFormData {
  type: 'order-form';
  title: string;
  fields: Array<{
    name: string;
    type: 'text' | 'email' | 'phone' | 'textarea';
    required: boolean;
    label: string;
  }>;
  submitText: string;
}

export interface PaymentData {
  type: 'payment';
  methods: Array<{
    id: string;
    name: string;
    icon?: string;
  }>;
}

export interface DeliveryInfoData {
  type: 'delivery-info';
  methods: Array<{
    name: string;
    price: number;
    description: string;
    icon?: string;
  }>;
}

export interface CartData {
  type: 'cart';
  showThumbnails: boolean;
  showQuantity: boolean;
  showTotal: boolean;
}

export interface ContactData {
  type: 'contact';
  title: string;
  fields: Array<{
    type: 'text' | 'email' | 'phone' | 'textarea';
    label: string;
    required: boolean;
  }>;
  submitText: string;
}

export interface SocialData {
  type: 'social';
  networks: Array<{
    name: string;
    url: string;
    icon?: string;
  }>;
}

export interface VideoData {
  type: 'video';
  url: string;
  autoplay: boolean;
  controls: boolean;
  muted: boolean;
}

export interface HeaderData {
  type: 'header';
  logo: string;
  menuItems: Array<{
    text: string;
    url: string;
  }>;
  contacts: {
    phone: string;
    email: string;
  };
}

export interface FooterData {
  type: 'footer';
  columns: Array<{
    title: string;
    links: Array<{
      text: string;
      url: string;
    }>;
  }>;
  copyright: string;
}

export interface DividerData {
  type: 'divider';
  style: 'solid' | 'dashed' | 'dotted';
  color: string;
  spacing: number;
}

export interface ColumnsData {
  type: 'columns';
  columns: Array<{
    width: number;
    blocks: BlockData[];
  }>;
}

// Базовые пропсы для блоков
export interface BaseBlockProps {
  id: string;
  data: BlockDataType;
  isEditing?: boolean;
  onEdit?: (id: string, newData: BlockDataType) => void;
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

// Настройки блоков
export interface BlockSettings {
  title: string;
  description: string;
  fields: BlockSettingField[];
}

export interface BlockSettingField {
  type: 'text' | 'number' | 'color' | 'select' | 'image' | 'switch' | 'textarea';
  key: string;
  label: string;
  defaultValue?: any;
  options?: { value: string; label: string }[];
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  required?: boolean;
  helperText?: string;
} 