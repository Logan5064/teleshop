// Готовые шаблоны магазинов TeleShop Constructor

import { BlockData } from '@/types/blocks'

export interface Template {
  id: string
  name: string
  description: string
  preview?: string
  category: string
  createdAt: string
  updatedAt: string
  blocks: BlockData[]
}

export const TEMPLATES: Template[] = []

export const getTemplateById = (id: string): Template | undefined => {
  return TEMPLATES.find(template => template.id === id)
}

export const getTemplatesByCategory = (category: string): Template[] => {
  return TEMPLATES.filter(template => template.category === category)
}

export const getTemplateCategories = (): string[] => {
  const categories = new Set(TEMPLATES.map(template => template.category))
  return Array.from(categories)
} 