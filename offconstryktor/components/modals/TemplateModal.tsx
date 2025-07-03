'use client'

import { useState } from 'react'
import { shopTemplates, templateCategories } from '@/templates/shopTemplates'

interface TemplateModalProps {
  onClose: () => void
  onTemplateSelect: (templateId: string) => void
}

export default function TemplateModal({ onClose, onTemplateSelect }: TemplateModalProps) {
  const [activeCategory, setActiveCategory] = useState('Все')

  const filteredTemplates = activeCategory === 'Все' 
    ? shopTemplates 
    : shopTemplates.filter(template => template.category === activeCategory)

  const handleTemplateSelect = (templateId: string) => {
    onTemplateSelect(templateId)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Выберите шаблон</h2>
          <button onClick={onClose} className="modal-close">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="modal-body">
          {/* Категории шаблонов */}
          <div className="flex gap-2 mb-8 overflow-x-auto">
            {templateCategories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 text-sm font-medium rounded-xl whitespace-nowrap transition-all duration-200 ${
                  activeCategory === category
                    ? 'bg-gray-700 text-white'
                    : 'bg-gray-100/70 text-gray-700 hover:bg-gray-200/80'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Сетка шаблонов */}
          <div className="template-grid">
            {filteredTemplates.map(template => (
              <div
                key={template.id}
                className="template-card"
                onClick={() => handleTemplateSelect(template.id)}
              >
                <div className="template-preview">
                  {template.preview ? (
                    <img src={template.preview} alt={template.name} />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <div className="text-gray-500">
                        <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
                <div className="template-info">
                  <div className="template-name">{template.name}</div>
                  <div className="template-desc">{template.description}</div>
                  <div className="template-meta">
                    <div className="template-category">{template.category}</div>
                    <div className="template-blocks-count">
                      {template.blocks.length} блоков
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <div className="mb-4">
                <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="text-lg font-semibold mb-2">Шаблоны не найдены</div>
              <div className="text-sm">В этой категории пока нет шаблонов</div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="top-panel-btn secondary">
            Отмена
          </button>
        </div>
      </div>
    </div>
  )
} 