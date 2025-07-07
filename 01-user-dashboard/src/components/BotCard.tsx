'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  PlayIcon, 
  StopIcon, 
  CogIcon,
  TrashIcon,
  CheckIcon,
  ArrowTopRightOnSquareIcon,
  PlusIcon,
  UserIcon,
  EllipsisVerticalIcon
} from '@heroicons/react/24/outline'
import { Bot, Play, Square, Settings, ExternalLink, Trash2, MoreVertical, User } from 'lucide-react'
import { Bot as BotType, botsApi } from '@/services/bots'
import { useBot } from '@/lib/contexts/BotContext'
import { ButtonSpinner } from '@/components/LoadingStates'

interface BotCardProps {
  bot: BotType
  onUpdate: () => void
}

export function BotCard({ bot, onUpdate }: BotCardProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const { selectedBot, setSelectedBot } = useBot()

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

  const handleSelectBot = () => {
    setSelectedBot(bot)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  const isSelectedBot = selectedBot?.id === bot.id

  return (
    <div className={`bg-white/95 backdrop-blur-sm rounded-2xl p-6 border transition-all duration-200 shadow-sm hover:shadow-md relative ${
      isSelectedBot 
        ? 'border-blue-500/80 shadow-blue-100/50' 
        : 'border-gray-400/50 hover:border-gray-500/90'
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${
            bot.is_active 
              ? 'bg-emerald-100/80 border-emerald-300/50' 
              : 'bg-gray-100/80 border-gray-300/50'
          }`}>
            <Bot className={`${bot.is_active ? 'text-emerald-600' : 'text-gray-600'}`} size={24} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 tracking-tight">
              {bot.shop_name}
            </h3>
            {bot.bot_username && (
              <p className="text-sm text-gray-600 font-medium">
                @{bot.bot_username}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isSelectedBot && (
            <div className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100/80 text-blue-700 border border-blue-300/50">
              Выбран
            </div>
          )}
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            bot.is_active
              ? 'bg-emerald-100/80 text-emerald-700 border border-emerald-300/50'
              : 'bg-gray-100/80 text-gray-600 border border-gray-300/50'
          }`}>
            {bot.is_active ? 'Активен' : 'Остановлен'}
          </div>
          
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100/50 rounded-lg transition-colors"
            >
              <EllipsisVerticalIcon className="h-5 w-5" />
            </button>
            
            {showMenu && (
              <motion.div
                className="absolute right-0 top-8 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-300/60 py-2 min-w-[150px] z-10"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <button
                  onClick={() => {
                    setShowMenu(false)
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100/50 flex items-center gap-2 font-medium"
                >
                  <CogIcon className="h-4 w-4" />
                  Настройки
                </button>
                <button
                  onClick={() => {
                    setShowMenu(false)
                    window.open('http://77.73.232.46:3001/constructor', '_blank')
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100/50 flex items-center gap-2 font-medium"
                >
                  <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                  Конструктор
                </button>
                <hr className="my-1 border-gray-200" />
                <button
                  onClick={() => {
                    setShowMenu(false)
                    handleDelete()
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50/50 flex items-center gap-2 font-medium"
                >
                  <TrashIcon className="h-4 w-4" />
                  Удалить
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {bot.description && (
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 font-medium">
          {bot.description}
        </p>
      )}

      <div className="flex items-center gap-4 mb-4 text-xs text-gray-500 font-medium">
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
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-xl font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm hover:shadow-md"
          >
            {isLoading ? (
              <ButtonSpinner />
            ) : (
              <Square size={16} />
            )}
            Остановить
          </button>
        ) : (
          <button
            onClick={handleStart}
            disabled={isLoading}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-xl font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm hover:shadow-md"
          >
            {isLoading ? (
              <ButtonSpinner />
            ) : (
              <Play size={16} />
            )}
            Запустить
          </button>
        )}
        
        <button
          onClick={handleSelectBot}
          disabled={isSelectedBot}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-medium transition-all shadow-sm ${
            isSelectedBot 
              ? 'bg-blue-100/80 text-blue-700 border border-blue-300/50 cursor-not-allowed' 
              : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md'
          }`}
        >
          <User size={16} />
          {isSelectedBot ? 'Выбран' : 'Выбрать'}
        </button>
        
        <button
          onClick={() => {
            if (bot.bot_username) {
              window.open(`https://t.me/${bot.bot_username}`, '_blank')
            }
          }}
          className="px-4 py-2 border border-gray-300/60 text-gray-700 rounded-xl font-medium hover:bg-gray-100/50 hover:border-gray-400/70 transition-all"
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
    </div>
  )
}

export default BotCard
