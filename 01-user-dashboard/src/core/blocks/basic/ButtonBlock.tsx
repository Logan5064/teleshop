'use client'

import React from 'react'
import { BaseBlockProps, ButtonData } from '@/types/blocks'

export default function ButtonBlock({ id, data, isEditing, onEdit }: BaseBlockProps) {
  const buttonData = data as ButtonData

  const getButtonClasses = () => {
    const baseClasses = 'button-block px-6 py-3 rounded-md transition-all duration-200'
    
    switch (buttonData.style) {
      case 'primary':
        return `${baseClasses} bg-blue-600 text-white hover:bg-blue-700`
      case 'secondary':
        return `${baseClasses} bg-gray-600 text-white hover:bg-gray-700`
      case 'outline':
        return `${baseClasses} border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white`
      default:
        return `${baseClasses} bg-blue-600 text-white hover:bg-blue-700`
    }
  }

  return (
    <div className="relative inline-block">
      <button
        className={getButtonClasses()}
        onClick={() => {
          if (buttonData.url) {
            window.open(buttonData.url, '_blank')
          }
        }}
      >
        {buttonData.text}
      </button>
      
      {isEditing && (
        <div className="absolute -top-2 -right-2">
          <button
            className="block-control-btn"
            onClick={() => onEdit?.(id, buttonData)}
            title="Редактировать"
          >
            ✏️
          </button>
        </div>
      )}
    </div>
  )
} 
