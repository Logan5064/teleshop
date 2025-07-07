'use client'

import React from 'react'
import { BaseBlockProps, TextData } from '@/types/blocks'

export default function TextBlock({ id, data, isEditing, onEdit }: BaseBlockProps) {
  const textData = data as TextData

  const fontSizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
    xl: 'text-xl'
  }

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify'
  }

  const paddingClasses = {
    none: 'p-0',
    small: 'p-3',
    medium: 'p-6',
    large: 'p-8'
  }

  const fontWeightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold'
  }

  const lineHeightClasses = {
    tight: 'leading-tight',
    normal: 'leading-normal',
    relaxed: 'leading-relaxed',
    loose: 'leading-loose'
  }

  const letterSpacingClasses = {
    tighter: 'tracking-tighter',
    tight: 'tracking-tight',
    normal: 'tracking-normal',
    wide: 'tracking-wide',
    wider: 'tracking-wider'
  }

  return (
    <div
      className={`
        text-block relative
        ${fontSizeClasses[textData.fontSize || 'medium']}
        ${alignClasses[textData.textAlign || 'left']}
        ${paddingClasses[textData.padding || 'medium']}
        ${fontWeightClasses[textData.fontWeight || 'normal']}
        ${lineHeightClasses[textData.lineHeight || 'normal']}
        ${letterSpacingClasses[textData.letterSpacing || 'normal']}
      `}
      style={{
        color: textData.textColor,
        backgroundColor: textData.backgroundColor !== 'transparent' ? textData.backgroundColor : undefined
      }}
    >
      <div
        dangerouslySetInnerHTML={{ __html: textData.content }}
        className="prose max-w-none"
      />
      
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
