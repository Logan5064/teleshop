'use client'

import React from 'react'
import { BaseBlockProps, ButtonData } from '@/types/blocks'

export default function ButtonBlock({ id, data, isEditing, onEdit }: BaseBlockProps) {
  const buttonData = data as ButtonData

  const sizeClasses = {
    small: 'size-small',
    medium: 'size-medium',
    large: 'size-large'
  }

  const radiusClasses = {
    none: 'rounded-none',
    small: 'rounded-sm',
    medium: 'rounded-md',
    large: 'rounded-lg',
    full: 'rounded-full'
  }

  const animationClasses = {
    none: '',
    'hover-lift': 'hover-lift',
    'hover-scale': 'hover-scale',
    pulse: 'pulse'
  }

  const getButtonStyles = () => {
    const baseStyles = {
      backgroundColor: buttonData.style === 'solid' ? buttonData.backgroundColor : 'transparent',
      color: buttonData.style === 'solid' ? buttonData.textColor : buttonData.backgroundColor,
      border: buttonData.style !== 'ghost' ? `2px solid ${buttonData.backgroundColor}` : 'none'
    }

    if (buttonData.style === 'ghost') {
      baseStyles.color = buttonData.backgroundColor
    }

    return baseStyles
  }

  return (
    <div className={`relative ${buttonData.fullWidth ? 'w-full' : 'inline-block'}`}>
      <button
        className={`
          button-block 
          ${sizeClasses[buttonData.size || 'medium']} 
          ${radiusClasses[buttonData.borderRadius || 'medium']}
          ${animationClasses[buttonData.animation || 'none']}
          ${buttonData.fullWidth ? 'w-full' : ''}
        `}
        style={getButtonStyles()}
        onClick={() => {
          if (buttonData.url) {
            window.open(buttonData.url, '_blank')
          }
        }}
      >
        {buttonData.icon && (
          <span className="text-lg">{buttonData.icon}</span>
        )}
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
