'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, ExternalLink, Settings, TrendingUp, Bot, Palette, BarChart3 } from 'lucide-react'
import { RocketLaunchIcon } from '@heroicons/react/24/outline'
import { NotchedCard } from '@/components/NotchedCard'
import { CornerButton } from '@/components/CornerButton'
import { AddBotModal } from '@/components/AddBotModal'
import { BotCard } from '@/components/BotCard'
import { botsApi, Bot as BotType } from '@/services/bots'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 10
    }
  }
}

export default function DashboardPage() {
  const [bots, setBots] = useState<BotType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showAddBotModal, setShowAddBotModal] = useState(false)

  const loadBots = async () => {
    try {
      setIsLoading(true)
      const data = await botsApi.getAll()
      setBots(data)
    } catch (error) {
      console.error('Ошибка загрузки ботов:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadBots()
  }, [])

  const quickActions = [
    {
      id: 'add-bot',
      title: 'Добавить бота',
      description: 'Подключите Telegram бота и начните создавать магазин',
      icon: Bot,
      buttonIcon: Plus,
      buttonColor: 'orange' as const,
      action: () => setShowAddBotModal(true),
      glow: true
    },
    {
      id: 'constructor',
      title: 'Конструктор',
      description: 'Drag & Drop редактор для создания уникального дизайна',
      icon: Palette,
      buttonIcon: ExternalLink,
      buttonColor: 'purple' as const,
              action: () => window.open('/constructor', '_self')
    },
    {
      id: 'designs',
      title: 'Библиотека блоков',
      description: 'Просмотр всех доступных блоков и компонентов',
      icon: Palette,
      buttonIcon: Settings,
      buttonColor: 'indigo' as const,
      action: () => window.open('/blocks-library', '_self')
    },
    {
      id: 'analytics',
      title: 'Аналитика',
      description: 'Отслеживайте продажи и поведение клиентов',
      icon: BarChart3,
      buttonIcon: TrendingUp,
      buttonColor: 'green' as const,
      action: () => window.open('/analytics', '_self')
    }
  ]

  const activeBots = bots.filter(bot => bot.is_active)
  const totalBots = bots.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
      {/* Header */}
      <motion.header 
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent mb-2">
          TeleShop Constructor
        </h1>
        <p className="text-gray-600 text-lg">
          Создавайте красивые магазины для Telegram за минуты
        </p>
      </motion.header>

      {/* Stats */}
      <motion.section
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Bot className="text-blue-600" size={18} />
            </div>
            <span className="text-gray-600">Всего ботов</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{totalBots}</p>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-green-600" size={18} />
            </div>
            <span className="text-gray-600">Активных</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{activeBots.length}</p>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="text-purple-600" size={18} />
            </div>
            <span className="text-gray-600">Конверсия</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">-</p>
        </div>
      </motion.section>

      {/* Quick Actions */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-8"
      >
        <motion.h2 
          className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2"
          variants={cardVariants}
        >
          <RocketLaunchIcon className="w-6 h-6" />
          Быстрые действия
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action) => (
            <motion.div key={action.id} variants={cardVariants}>
              <NotchedCard
                onClick={action.action}
                glow={action.glow}
                cornerButton={
                  <CornerButton
                    icon={action.buttonIcon}
                    color={action.buttonColor}
                    onClick={action.action}
                  />
                }
                className="h-full"
              >
                <div className="flex flex-col h-full">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    action.buttonColor === 'orange' ? 'bg-gradient-to-br from-orange-400 to-red-500' :
                    action.buttonColor === 'purple' ? 'bg-purple-500' :
                    action.buttonColor === 'indigo' ? 'bg-indigo-500' :
                    'bg-green-500'
                  }`}>
                    <action.icon className="text-white" size={24} />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {action.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm flex-grow">
                    {action.description}
                  </p>
                  
                  <div className={`mt-4 flex items-center font-medium ${
                    action.buttonColor === 'orange' ? 'text-orange-500' :
                    action.buttonColor === 'purple' ? 'text-purple-500' :
                    action.buttonColor === 'indigo' ? 'text-indigo-500' :
                    'text-green-500'
                  }`}>
                    <span>
                      {action.buttonColor === 'orange' ? 'Начать' :
                       action.buttonColor === 'purple' ? 'Открыть' :
                       action.buttonColor === 'indigo' ? 'Просмотр' :
                       'Смотреть'}
                    </span>
                    <ExternalLink size={16} className="ml-2" />
                  </div>
                </div>
              </NotchedCard>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Bots Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="bg-white rounded-2xl p-6 shadow-sm"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Bot className="w-5 h-5" />
            Ваши боты ({totalBots})
          </h2>
          <button 
            onClick={() => setShowAddBotModal(true)}
            className="text-orange-500 font-medium hover:text-orange-600 transition-colors flex items-center gap-2"
          >
            <Plus size={16} />
            Добавить бота
          </button>
        </div>
        
        {isLoading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-2 border-orange-300 border-t-orange-500 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Загрузка ботов...</p>
          </div>
        ) : bots.length === 0 ? (
          <div className="text-center py-12">
            <motion.div 
              className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4"
              whileHover={{ scale: 1.1, rotate: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Bot className="text-gray-400" size={32} />
            </motion.div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Пока нет ботов</h3>
            <p className="text-gray-600 mb-6">Создайте своего первого Telegram бота для начала работы</p>
            <motion.button 
              onClick={() => setShowAddBotModal(true)}
              className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus size={16} className="inline mr-2" />
              Создать первого бота
            </motion.button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bots.map((bot) => (
              <BotCard 
                key={bot.id} 
                bot={bot} 
                onUpdate={loadBots}
              />
            ))}
          </div>
        )}
      </motion.section>

      {/* Add Bot Modal */}
      <AddBotModal
        isOpen={showAddBotModal}
        onClose={() => setShowAddBotModal(false)}
        onSuccess={loadBots}
      />
    </div>
  )
} 