'use client'

import React from 'react'
import { BaseBlockProps, TextData } from '@/types/blocks'

export default function TextBlock({ id, data, isEditing, onEdit }: BaseBlockProps) {
  const textData = data as TextData

  return (
    <div className="text-block">
      <div 
        className={`prose max-w-none ${textData.align === 'center' ? 'text-center' : textData.align === 'right' ? 'text-right' : 'text-left'}`}
        style={{ 
          fontWeight: textData.style === 'bold' ? 'bold' : 'normal',
          fontStyle: textData.style === 'italic' ? 'italic' : 'normal'
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: textData.content }} />
      </div>
      
      {isEditing && (
        <div className="absolute top-2 right-2">
          <button
            className="block-control-btn"
            onClick={() => onEdit?.(id, textData)}
            title="Редактировать"
          >
            ✏️
          </button>
        </div>
      )}
    </div>
  )
} 
