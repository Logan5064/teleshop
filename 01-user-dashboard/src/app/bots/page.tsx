'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Bot, Search, Filter } from 'lucide-react'
import { AddBotModal } from '@/components/AddBotModal'
import { BotCard } from '@/components/BotCard'
import { botsApi, Bot as BotType } from '@/services/bots'

export default function BotsPage() {
  const [bots, setBots] = useState<BotType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showAddBotModal, setShowAddBotModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all')

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

  const filteredBots = bots.filter(bot => {
    const matchesSearch = bot.shop_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (bot.bot_username && bot.bot_username.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'active' && bot.is_active) ||
                         (filterStatus === 'inactive' && !bot.is_active)
    
    return matchesSearch && matchesFilter
  })

  const activeBots = bots.filter(bot => bot.is_active).length
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent mb-2">
              Управление ботами
            </h1>
            <p className="text-gray-600 text-lg">
              Создавайте и управляйте вашими Telegram ботами
            </p>
          </div>
          
          <motion.button
            onClick={() => setShowAddBotModal(true)}
            className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus size={20} />
            Добавить бота
          </motion.button>
        </div>
      </motion.header>

      {/* Stats */}
      <motion.section
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
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
              <Bot className="text-green-600" size={18} />
            </div>
            <span className="text-gray-600">Активных</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{activeBots}</p>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <Bot className="text-gray-600" size={18} />
            </div>
            <span className="text-gray-600">Неактивных</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{totalBots - activeBots}</p>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <Bot className="text-purple-600" size={18} />
            </div>
            <span className="text-gray-600">Найдено</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{filteredBots.length}</p>
        </div>
      </motion.section>

      {/* Filters */}
      <motion.section
        className="bg-white rounded-2xl p-6 shadow-sm mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Поиск по названию или username..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
            />
          </div>
          
          {/* Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="pl-10 pr-8 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors bg-white"
            >
              <option value="all">Все боты</option>
              <option value="active">Только активные</option>
              <option value="inactive">Только неактивные</option>
            </select>
          </div>
        </div>
      </motion.section>

      {/* Bots Grid */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        {isLoading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-2 border-orange-300 border-t-orange-500 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Загрузка ботов...</p>
          </div>
        ) : filteredBots.length === 0 ? (
          <div className="text-center py-12">
            <motion.div 
              className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4"
              whileHover={{ scale: 1.1, rotate: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Bot className="text-gray-400" size={32} />
            </motion.div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchQuery || filterStatus !== 'all' ? 'Ничего не найдено' : 'Пока нет ботов'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchQuery || filterStatus !== 'all' 
                ? 'Попробуйте изменить параметры поиска'
                : 'Создайте своего первого Telegram бота для начала работы'
              }
            </p>
            {(!searchQuery && filterStatus === 'all') && (
              <motion.button 
                onClick={() => setShowAddBotModal(true)}
                className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus size={16} className="inline mr-2" />
                Создать первого бота
              </motion.button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBots.map((bot) => (
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