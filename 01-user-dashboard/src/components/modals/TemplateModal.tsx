'use client'

import React from 'react'
import { BlockData } from '@/types/blocks'

interface Template {
  id: string;
  name: string;
  description: string;
  blocks: BlockData[];
}

interface TemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (template: Template) => void;
}

export default function TemplateModal({
  isOpen,
  onClose,
  onSelect
}: TemplateModalProps) {
  if (!isOpen) return null;

  const templates: Template[] = [
    {
      id: 'landing',
      name: 'Лендинг',
      description: 'Простой одностраничный сайт для продвижения продукта или услуги',
      blocks: []
    },
    {
      id: 'shop',
      name: 'Магазин',
      description: 'Полноценный интернет-магазин с каталогом и корзиной',
      blocks: []
    },
    {
      id: 'blog',
      name: 'Блог',
      description: 'Блог с лентой постов и категориями',
      blocks: []
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Выберите шаблон</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => onSelect(template)}
                className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 text-left transition-colors"
              >
                <h3 className="text-lg font-medium mb-2">{template.name}</h3>
                <p className="text-gray-600 text-sm">{template.description}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 
