'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { teleShopAPI } from '@/lib/api'
import { BiUndo, BiRedo, BiLayout } from 'react-icons/bi'

export interface TopPanelProps {
  canUndo: boolean;
  canRedo: boolean;
  lastSaved: Date | undefined;
  saveStatus: 'idle' | 'saving' | 'saved' | 'error';
  blocksCount: number;
  shopName: string;
  onShopNameChange: (name: string) => void;
  onUndo: () => void;
  onRedo: () => void;
  onOpenTemplates: () => void;
  onSave: () => Promise<void>;
  onPublish: () => void;
  onExport: () => void;
  onImport: () => void;
  currentUser?: {
    telegram_id: string
    displayName?: string
    username?: string
  }
}

export default function TopPanel({
  shopName,
  onShopNameChange,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  saveStatus,
  lastSaved,
  onExport,
  onImport,
  blocks = [],
  currentUser,
  onOpenTemplates,
  onSave,
  onPublish,
  blocksCount
}: TopPanelProps) {
  const [isIntegrating, setIsIntegrating] = useState(false)

  const getUserDisplayName = () => {
    if (currentUser?.username) return currentUser.username
    if (currentUser?.telegram_id) return `User ${currentUser.telegram_id}`
    return 'Пользователь'
  }

  const handleSendToPlatform = async () => {
    if (blocks.length === 0) {
      alert('⚠️ Нельзя отправить пустой дизайн. Добавьте хотя бы один блок.')
      return
    }

    if (!currentUser) {
      alert('⚠️ Ошибка авторизации. Попробуйте перезайти в конструктор.')
      return
    }

    setIsIntegrating(true)
    
    try {
      const designData = {
        shopId: '1',
        userId: currentUser.telegram_id || 'demo_user',
        blocks: blocks,
        colors: {
          primary: '#007bff',
          secondary: '#6c757d'
        },
        name: `Дизайн ${getUserDisplayName()} ${new Date().toLocaleString()}`
      }

      console.log('🚀 Отправляем дизайн в основную платформу...', designData)
      
      const result = await teleShopAPI.shop.constructor.saveTemplate(1, designData)
      
      alert(`✅ Дизайн успешно отправлен в основную платформу!\n\nБлоков: ${blocks.length}\nПользователь: ${getUserDisplayName()}`)
      
      window.open('http://178.236.17.93:3000', '_blank')
      
    } catch (error) {
      console.error('❌ Ошибка интеграции:', error)
      alert('❌ Ошибка при отправке дизайна в основную платформу. Проверьте консоль для деталей.')
    } finally {
      setIsIntegrating(false)
    }
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 px-6 py-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">T</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900">TeleShop Constructor</h1>
        </div>
        
        {currentUser && (
          <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">
                {currentUser.username?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
            <span className="text-sm text-blue-700 font-medium">
              {getUserDisplayName()}
            </span>
          </div>
        )}
        
        {blocksCount > 0 && (
          <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
            {blocksCount} блоков
          </span>
        )}
      </div>

      <div className="flex items-center gap-4">
        {lastSaved && (
          <span className="text-sm text-gray-500">
            💾 {lastSaved.toLocaleTimeString()}
          </span>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className={`p-2 rounded-lg transition-colors ${
              canUndo 
                ? 'text-gray-600 hover:bg-gray-100' 
                : 'text-gray-300 cursor-not-allowed'
            }`}
            title="Отменить (Ctrl+Z)"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
          </button>
          
          <button
            onClick={onRedo}
            disabled={!canRedo}
            className={`p-2 rounded-lg transition-colors ${
              canRedo 
                ? 'text-gray-600 hover:bg-gray-100' 
                : 'text-gray-300 cursor-not-allowed'
            }`}
            title="Повторить (Ctrl+Y)"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10h-10a8 8 0 00-8 8v2m18-10l-6 6m6-6l-6-6" />
            </svg>
          </button>
        </div>

        <div className="w-px h-6 bg-gray-300/50"></div>

        <button
          onClick={onOpenTemplates}
          className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors text-sm font-medium"
          title="Шаблоны"
        >
          📋 Шаблоны
        </button>

        <button
          onClick={onSave}
          className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors text-sm font-medium"
        >
          💾 Сохранить
        </button>

        <motion.button
          onClick={handleSendToPlatform}
          disabled={isIntegrating || blocksCount === 0 || !currentUser}
          className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
            isIntegrating || blocksCount === 0 || !currentUser
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
          whileHover={!isIntegrating && blocksCount > 0 && currentUser ? { scale: 1.02 } : {}}
          whileTap={!isIntegrating && blocksCount > 0 && currentUser ? { scale: 0.98 } : {}}
        >
          {isIntegrating ? (
            <>
              <svg className="w-4 h-4 mr-2 animate-spin inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Отправляем...
            </>
          ) : (
            <>🚀 Отправить в платформу</>
          )}
        </motion.button>
      </div>
    </div>
  )
} 
