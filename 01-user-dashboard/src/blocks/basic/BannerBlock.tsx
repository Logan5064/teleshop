'use client'

import React from 'react'
import { BaseBlockProps } from '@/types/blocks'

interface BannerData {
  title: string
  subtitle?: string
  backgroundColor: string
  textColor: string
  buttonText?: string
  buttonUrl?: string
  backgroundImage?: string
  textAlign: 'left' | 'center' | 'right'
  padding: 'small' | 'medium' | 'large'
  borderRadius: 'none' | 'small' | 'medium' | 'large'
}

export default function BannerBlock({ id, data, isEditing, onEdit }: BaseBlockProps) {
  const bannerData = data as BannerData

  const paddingClasses = {
    small: 'p-6',
    medium: 'p-8',
    large: 'p-12'
  }

  const radiusClasses = {
    none: 'rounded-none',
    small: 'rounded-md',
    medium: 'rounded-lg',
    large: 'rounded-xl'
  }

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  }

  return (
    <div
      className={`banner-block ${paddingClasses[bannerData.padding]} ${radiusClasses[bannerData.borderRadius]}`}
      style={{
        backgroundColor: bannerData.backgroundColor,
        color: bannerData.textColor,
        backgroundImage: bannerData.backgroundImage ? `url(${bannerData.backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className={`banner-content ${alignClasses[bannerData.textAlign]}`}>
        <h2 className="banner-title">{bannerData.title}</h2>
        
        {bannerData.subtitle && (
          <p className="banner-subtitle">{bannerData.subtitle}</p>
        )}
        
        {bannerData.buttonText && (
          <button
            className="banner-button"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              color: bannerData.textColor,
              border: `2px solid ${bannerData.textColor}`
            }}
            onClick={() => {
              if (bannerData.buttonUrl) {
                window.open(bannerData.buttonUrl, '_blank')
              }
            }}
          >
            {bannerData.buttonText}
          </button>
        )}
      </div>
      
      {isEditing && (
        <div className="absolute top-2 right-2 flex gap-2">
          <button
            className="block-control-btn"
            onClick={() => onEdit?.(id, bannerData)}
            title="Редактировать"
          >
            ✏️
          </button>
        </div>
      )}
    </div>
  )
} 