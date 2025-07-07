'use client'

import React from 'react'
import { BlockData, BlockType, BlockDataType, TextData, ImageData, ButtonData, SpacerData, TabsData, FormData } from '@/types/blocks'

interface BasicBlockProps {
  block: BlockData;
  isEditing?: boolean;
  onEdit?: (id: string, newData: BlockDataType) => void;
  onDelete?: (id: string) => void;
  onDuplicate?: (id: string) => void;
}

export function TextBlock({
  block,
  isEditing,
  onEdit,
  onDelete,
  onDuplicate
}: BasicBlockProps) {
  const data = block.data as TextData

  return (
    <div
      className={`prose max-w-none ${
        data.align === 'center' ? 'text-center' : data.align === 'right' ? 'text-right' : ''
      } ${
        data.style === 'bold' ? 'font-bold' : data.style === 'italic' ? 'italic' : ''
      }`}
      dangerouslySetInnerHTML={{ __html: data.content }}
    />
  )
}

export function ImageBlock({
  block,
  isEditing,
  onEdit,
  onDelete,
  onDuplicate
}: BasicBlockProps) {
  const data = block.data as ImageData

  return (
    <div className={data.fullWidth ? 'w-full' : 'max-w-2xl mx-auto'}>
      <img
        src={data.url}
        alt={data.alt || ''}
        className="w-full h-auto rounded-lg"
      />
    </div>
  )
}

export function ButtonBlock({
  block,
  isEditing,
  onEdit,
  onDelete,
  onDuplicate
}: BasicBlockProps) {
  const data = block.data as ButtonData

  return (
    <button
      className={`px-6 py-3 rounded-lg font-medium ${
        data.style === 'primary'
          ? 'bg-blue-600 text-white'
          : data.style === 'secondary'
          ? 'bg-gray-100 text-gray-900'
          : 'border-2 border-gray-900 text-gray-900'
      }`}
    >
      {data.text}
    </button>
  )
}

export function SpacerBlock({
  block,
  isEditing,
  onEdit,
  onDelete,
  onDuplicate
}: BasicBlockProps) {
  const data = block.data as SpacerData

  return (
    <div style={{ height: data.height }} />
  )
}

export function TabsBlock({
  block,
  isEditing,
  onEdit,
  onDelete,
  onDuplicate
}: BasicBlockProps) {
  const data = block.data as TabsData
  const [activeTab, setActiveTab] = React.useState(data.tabs[0]?.id)

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="border-b border-gray-200">
        <div className="flex gap-2 p-2">
          {data.tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium ${
                activeTab === tab.id
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>
      </div>
      <div className="p-6">
        {data.tabs.find(tab => tab.id === activeTab)?.content}
      </div>
    </div>
  )
}

export function FormBlock({
  block,
  isEditing,
  onEdit,
  onDelete,
  onDuplicate
}: BasicBlockProps) {
  const data = block.data as FormData
  const [submitted, setSubmitted] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="bg-green-50 text-green-700 p-6 rounded-lg">
        {data.successMessage}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {data.fields.map(field => (
        <div key={field.id}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {field.label}
            {field.required && <span className="text-red-500">*</span>}
          </label>
          {field.type === 'textarea' ? (
            <textarea
              placeholder={field.placeholder}
              required={field.required}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
            />
          ) : (
            <input
              type={field.type}
              placeholder={field.placeholder}
              required={field.required}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          )}
        </div>
      ))}
      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
      >
        {data.submitText}
      </button>
    </form>
  )
} 
