// Типы конструктора TeleShop

import { BlockData, BlockType } from './blocks'

// Состояние конструктора
export interface ConstructorState {
  blocks: BlockData[]
  selectedBlockId: string | null
  previewMode: 'mobile' | 'tablet'
  activeCategory: string
  lastSaved: string
  isDragging: boolean
}

// Drag & Drop типы
export interface DragData {
  type: 'BLOCK' | 'CANVAS_BLOCK'
  blockType?: BlockType
  blockId?: string
  index?: number
}

// История для Undo/Redo
export interface HistoryState {
  history: BlockData[][]
  historyIndex: number
  maxHistorySize: number
}

// Шаблоны
export interface Template {
  id: string
  name: string
  description: string
  preview: string
  category: string
  blocks: BlockData[]
  createdAt: string
  updatedAt: string
}

// Автосохранение
export interface AutoSaveData {
  blocks: BlockData[]
  timestamp: string
  version: string
}

// Настройки конструктора
export interface ConstructorSettings {
  autoSave: boolean
  autoSaveInterval: number
  showGrid: boolean
  snapToGrid: boolean
  showRulers: boolean
  previewMode: 'mobile' | 'tablet' | 'desktop'
}

// События конструктора
export type ConstructorEvent = 
  | 'block-added'
  | 'block-removed'
  | 'block-moved'
  | 'block-edited'
  | 'template-applied'
  | 'project-saved'
  | 'project-loaded'

// Панели конструктора
export type PanelType = 'blocks' | 'settings' | 'templates' | 'preview'

export interface PanelState {
  activePanel: PanelType
  isCollapsed: boolean
  width: number
} 