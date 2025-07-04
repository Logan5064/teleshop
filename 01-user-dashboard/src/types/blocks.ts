export interface BaseBlockProps {
  id: string;
  type: string;
  data: any;
  onUpdate?: (data: any) => void;
  onDelete?: () => void;
  isSelected?: boolean;
  isPreview?: boolean;
  isEditing?: boolean;
  onEdit?: (data: any) => void;
}

export interface BlockData {
  id: string;
  type: string;
  data: any;
  order?: number;
}

export interface BlockCategory {
  id: string;
  name: string;
  icon: string;
  blocks: BlockType[];
}

export type BlockType = 
  | "telegram-banner" 
  | "telegram-product" 
  | "telegram-categories"
  | "telegram-slider"
  | "telegram-contacts"
  | "telegram-map"
  | "banner"
  | "text"
  | "button"
  | "image"
  | "spacer"
  | "product"
  | "product-grid"
  | "categories"
  | "features"
  | "testimonials"
  | "price-list"
  | "order-form"
  | "payment"
  | "delivery-info"
  | "cart"
  | "form"
  | "contact"
  | "social"
  | "map"
  | "video"
  | "header"
  | "footer"
  | "divider"
  | "columns"
  | "tabs";

export interface BlockDefaults {
  [key: string]: unknown;
}
