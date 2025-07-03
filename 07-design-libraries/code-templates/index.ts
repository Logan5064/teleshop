// Экспорт доступных шаблонов
export { default as GeneralEcommerceTemplate } from './GeneralEcommerceTemplate';

// Типы шаблонов
export type TemplateType = 
  | 'general-ecommerce';

// Метаданные шаблонов
export interface TemplateMetadata {
  id: TemplateType;
  name: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  blocks: number;
  estimatedTime: string;
  conversionRate: string;
  preview: string;
}

export const TEMPLATES_METADATA: TemplateMetadata[] = [
  {
    id: 'general-ecommerce',
    name: 'Универсальный магазин',
    description: 'Полноценный интернет-магазин с каталогом товаров',
    category: 'E-commerce',
    difficulty: 'medium',
    blocks: 8,
    estimatedTime: '2-3 дня',
    conversionRate: '3-5%',
    preview: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d'
  }
]; 