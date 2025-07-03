'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bot, Play, Square, Settings, ExternalLink, Trash2, MoreVertical } from 'lucide-react'
import { Bot as BotType, botsApi } from '@/services/bots'

interface BotCardProps {
  bot: BotType
  onUpdate: () => void
}

export function BotCard({ bot, onUpdate }: BotCardProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  const handleStart = async () => {
    setIsLoading(true)
    try {
      await botsApi.start(bot.id)
      onUpdate()
    } catch (error) {
      console.error('Ошибка запуска бота:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleStop = async () => {
    setIsLoading(true)
    try {
      await botsApi.stop(bot.id)
      onUpdate()
    } catch (error) {
      console.error('Ошибка остановки бота:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (confirm('Вы уверены, что хотите удалить этого бота?')) {
      setIsLoading(true)
      try {
        await botsApi.delete(bot.id)
        onUpdate()
      } catch (error) {
        console.error('Ошибка удаления бота:', error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  return (
    <motion.div
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all relative"
      whileHover={{ y: -2 }}
      layout
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            bot.is_active 
              ? 'bg-gradient-to-br from-green-400 to-emerald-500' 
              : 'bg-gradient-to-br from-gray-400 to-gray-500'
          }`}>
            <Bot className="text-white" size={24} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {bot.shop_name}
            </h3>
            {bot.bot_username && (
              <p className="text-sm text-gray-600">
                @{bot.bot_username}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            bot.is_active
              ? 'bg-green-100 text-green-700'
              : 'bg-gray-100 text-gray-600'
          }`}>
            {bot.is_active ? 'Активен' : 'Остановлен'}
          </div>
          
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <MoreVertical size={16} />
            </button>
            
            {showMenu && (
              <motion.div
                className="absolute right-0 top-8 bg-white rounded-xl shadow-lg border border-gray-200 py-2 min-w-[150px] z-10"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <button
                  onClick={() => {
                    setShowMenu(false)
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                >
                  <Settings size={14} />
                  Настройки
                </button>
                <button
                  onClick={() => {
                    setShowMenu(false)
                    window.open('http://localhost:3001/constructor', '_blank')
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                >
                  <ExternalLink size={14} />
                  Конструктор
                </button>
                <hr className="my-1" />
                <button
                  onClick={() => {
                    setShowMenu(false)
                    handleDelete()
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <Trash2 size={14} />
                  Удалить
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {bot.description && (
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {bot.description}
        </p>
      )}

      <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
        <span>Создан: {formatDate(bot.created_at)}</span>
        {bot.updated_at !== bot.created_at && (
          <span>Обновлен: {formatDate(bot.updated_at)}</span>
        )}
      </div>

      <div className="flex gap-2">
        {bot.is_active ? (
          <button
            onClick={handleStop}
            disabled={isLoading}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Square size={16} />
            )}
            Остановить
          </button>
        ) : (
          <button
            onClick={handleStart}
            disabled={isLoading}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Play size={16} />
            )}
            Запустить
          </button>
        )}
        
        <button
          onClick={() => {
            if (bot.bot_username) {
              window.open(`https://t.me/${bot.bot_username}`, '_blank')
            }
          }}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
        >
          <ExternalLink size={16} />
        </button>
      </div>

      {showMenu && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => setShowMenu(false)}
        />
      )}
    </motion.div>
  )
}
