'use client'

import { useState } from 'react'
import { getBlockDefaults } from '@/lib/constructor/blockDefaults'
import { BlockType } from '@/types/blocks'

interface BlockSelectorProps {
  onBlockAdd: (blockType: BlockType, blockData: any) => void
}

const blockCategories = [
  {
    id: 'telegram',
    name: 'Telegram',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    blocks: ['telegram-banner', 'telegram-product', 'telegram-categories', 'telegram-slider', 'telegram-contacts', 'telegram-map'] as BlockType[]
  },
  {
    id: 'basic',
    name: 'Основные',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    blocks: ['banner', 'text', 'button', 'image', 'spacer'] as BlockType[]
  },
  {
    id: 'content',
    name: 'Контент',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    blocks: ['product', 'product-grid', 'categories', 'features', 'testimonials'] as BlockType[]
  },
  {
    id: 'commerce',
    name: 'Торговля',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
      </svg>
    ),
    blocks: ['price-list', 'order-form', 'payment', 'delivery-info', 'cart'] as BlockType[]
  },
  {
    id: 'interactive',
    name: 'Интерактив',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    blocks: ['form', 'contact', 'social', 'map', 'video'] as BlockType[]
  },
  {
    id: 'layout',
    name: 'Макет',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    blocks: ['header', 'footer', 'divider', 'columns', 'tabs'] as BlockType[]
  }
]

export default function BlockSelector({ onBlockAdd }: BlockSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState('telegram')
  const [searchQuery, setSearchQuery] = useState('')

  const handleBlockAdd = (blockType: BlockType) => {
    const blockData = getBlockDefaults(blockType)
    onBlockAdd(blockType, blockData)
  }

  const filteredBlocks = searchQuery
    ? blockCategories
        .flatMap(category => 
          category.blocks.map(block => ({
            type: block,
            category: category.name
          }))
        )
        .filter(block => 
          block.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
          block.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
    : blockCategories
        .find(category => category.id === selectedCategory)
        ?.blocks || []

  return (
    <div className="w-64 bg-white/80 backdrop-blur-sm border-r border-gray-200/50 p-4 flex flex-col h-full">
      {/* Поиск */}
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Поиск блоков..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 pl-10 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <svg
            className="absolute left-3 top-2.5 w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Категории */}
      {!searchQuery && (
        <div className="flex flex-wrap gap-2 mb-4">
          {blockCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category.icon}
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      )}

      {/* Список блоков */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 gap-2">
          {filteredBlocks.map((blockType) => {
            const category = blockCategories.find(cat => 
              cat.blocks.includes(typeof blockType === 'string' ? blockType : blockType.type)
            )
            const type = typeof blockType === 'string' ? blockType : blockType.type

            return (
              <button
                key={type}
                onClick={() => handleBlockAdd(type as BlockType)}
                className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-left"
              >
                <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-600">
                  {category?.icon}
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </div>
                  {searchQuery && (
                    <div className="text-xs text-gray-500">
                      {category?.name}
                    </div>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
} 
