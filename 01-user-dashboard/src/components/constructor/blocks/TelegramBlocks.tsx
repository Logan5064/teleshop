'use client'

import React from 'react'
import { 
  BlockData, 
  BannerData, 
  ProductData, 
  CategoriesData, 
  SliderData, 
  ContactsData, 
  MapData 
} from '@/types/blocks'

interface TelegramBlocksProps {
  blocks: BlockData[]
  onBlockClick: (block: BlockData) => void
  onBlockEdit: (blockId: string, data: any) => void
}

interface TelegramBlockProps {
  block: BlockData;
  isEditing?: boolean;
  onEdit?: (id: string, newData: any) => void;
  onDelete?: (id: string) => void;
  onDuplicate?: (id: string) => void;
}

export function TelegramBanner({
  block,
  isEditing,
  onEdit,
  onDelete,
  onDuplicate
}: TelegramBlockProps) {
  const data = block.data as BannerData

  return (
    <div className="relative rounded-lg overflow-hidden">
      <img src={data.imageUrl} alt="" className="w-full h-auto" />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white p-8">
        <h2 className="text-3xl font-bold mb-4">{data.title}</h2>
        {data.subtitle && (
          <p className="text-lg mb-6">{data.subtitle}</p>
        )}
        {data.buttonText && (
          <button className="px-8 py-3 bg-white text-gray-900 rounded-lg font-medium">
            {data.buttonText}
          </button>
        )}
      </div>
    </div>
  )
}

export function TelegramProduct({
  block,
  isEditing,
  onEdit,
  onDelete,
  onDuplicate
}: TelegramBlockProps) {
  const data = block.data as ProductData

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <img src={data.productId} alt="" className="w-full h-48 object-cover rounded-lg mb-4" />
      {data.showDescription && (
        <p className="text-gray-600 mb-4">Описание продукта</p>
      )}
      {data.showPrice && (
        <div className="text-lg font-bold mb-4">$99.99</div>
      )}
      {data.showButton && (
        <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg">
          Купить
        </button>
      )}
    </div>
  )
}

export function TelegramCategories({
  block,
  isEditing,
  onEdit,
  onDelete,
  onDuplicate
}: TelegramBlockProps) {
  const data = block.data as CategoriesData

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-xl font-bold mb-6">{data.title}</h3>
      <div className="grid grid-cols-2 gap-4">
        {data.categories.map(category => (
          <button
            key={category.id}
            className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 text-left transition-colors"
          >
            <div className="flex items-center gap-3">
              {category.icon && (
                <img src={category.icon} alt="" className="w-8 h-8 rounded-lg" />
              )}
              <span className="font-medium">{category.name}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export function TelegramSlider({
  block,
  isEditing,
  onEdit,
  onDelete,
  onDuplicate
}: TelegramBlockProps) {
  const data = block.data as SliderData

  return (
    <div className="relative rounded-lg overflow-hidden">
      <div className="flex overflow-x-auto snap-x snap-mandatory">
        {data.images.map((image, index) => (
          <div
            key={index}
            className="flex-none w-full snap-center"
          >
            <img
              src={image.url}
              alt={image.alt || ''}
              className="w-full h-64 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export function TelegramContacts({
  block,
  isEditing,
  onEdit,
  onDelete,
  onDuplicate
}: TelegramBlockProps) {
  const data = block.data as ContactsData

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-xl font-bold mb-6">{data.title}</h3>
      <div className="space-y-4">
        {data.contacts.map((contact, index) => (
          <div key={index} className="flex items-center gap-3">
            {contact.type === 'phone' && (
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            )}
            {contact.type === 'email' && (
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            )}
            {contact.type === 'telegram' && (
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            )}
            {contact.type === 'whatsapp' && (
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            )}
            <div>
              {contact.label && (
                <div className="text-sm text-gray-500">{contact.label}</div>
              )}
              <div className="font-medium">{contact.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function TelegramMap({
  block,
  isEditing,
  onEdit,
  onDelete,
  onDuplicate
}: TelegramBlockProps) {
  const data = block.data as MapData

  return (
    <div className="relative rounded-lg overflow-hidden">
      <iframe
        src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1000!2d${data.longitude}!3d${data.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1635959562000!5m2!1sen!2sus`}
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
      />
    </div>
  )
} 
