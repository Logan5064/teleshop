'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Bot, ExternalLink, AlertCircle, CheckCircle } from 'lucide-react'
import { ButtonSpinner } from '@/components/LoadingStates'
import { botsApi, CreateBotRequest } from '@/services/bots'

interface AddBotModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function AddBotModal({ isOpen, onClose, onSuccess }: AddBotModalProps) {
  const [formData, setFormData] = useState<CreateBotRequest>({
    bot_token: '',
    shop_name: '',
    description: '',
    bot_username: ''
  })
  
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [step, setStep] = useState<'form' | 'success'>('form')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      await botsApi.create(formData)
      setStep('success')
      setTimeout(() => {
        onSuccess()
        handleClose()
      }, 2000)
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Ошибка при создании бота')
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setFormData({ bot_token: '', shop_name: '', description: '', bot_username: '' })
    setError(null)
    setStep('form')
    onClose()
  }

  const validateToken = (token: string) => {
    const botTokenRegex = /^\d+:[A-Za-z0-9_-]{35}$/
    return botTokenRegex.test(token)
  }

  const isFormValid = formData.bot_token && formData.shop_name && validateToken(formData.bot_token)

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {step === 'form' ? (
              <>
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center">
                      <Bot className="text-white" size={20} />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        Создать Telegram бота
                      </h2>
                      <p className="text-sm text-gray-600">
                        Настройте бота для вашего магазина
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleClose}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Токен бота *
                    </label>
                    <input
                      type="text"
                      value={formData.bot_token}
                      onChange={(e) => setFormData({ ...formData, bot_token: e.target.value })}
                      placeholder="1234567890:ABCdefGHIjklMNOpqrsTUVwxyz"
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-colors ${
                        formData.bot_token && !validateToken(formData.bot_token)
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                          : 'border-gray-300 focus:ring-orange-500 focus:border-orange-500'
                      }`}
                      required
                    />
                    {formData.bot_token && !validateToken(formData.bot_token) && (
                      <p className="text-red-500 text-xs mt-1">
                        Неверный формат токена
                      </p>
                    )}
                    <p className="text-gray-500 text-xs mt-1">
                      Получите токен у @BotFather в Telegram
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Название магазина *
                    </label>
                    <input
                      type="text"
                      value={formData.shop_name}
                      onChange={(e) => setFormData({ ...formData, shop_name: e.target.value })}
                      placeholder="Мой крутой магазин"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Username бота
                    </label>
                    <input
                      type="text"
                      value={formData.bot_username}
                      onChange={(e) => setFormData({ ...formData, bot_username: e.target.value })}
                      placeholder="my_shop_bot"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    />
                    <p className="text-gray-500 text-xs mt-1">
                      Опционально, будет получен автоматически
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Описание
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Краткое описание вашего магазина..."
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors resize-none"
                    />
                  </div>

                  {error && (
                    <motion.div
                      className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <AlertCircle size={16} />
                      <span className="text-sm">{error}</span>
                    </motion.div>
                  )}

                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                      <Bot size={16} />
                      Как создать бота:
                    </h4>
                    <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                      <li>Напишите @BotFather в Telegram</li>
                      <li>Отправьте команду /newbot</li>
                      <li>Введите название и username бота</li>
                      <li>Скопируйте полученный токен сюда</li>
                    </ol>
                    <a
                      href="https://t.me/BotFather"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium mt-2"
                    >
                      Открыть @BotFather
                      <ExternalLink size={14} />
                    </a>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                    >
                      Отмена
                    </button>
                    <button
                      type="submit"
                      disabled={!isFormValid || isLoading}
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-medium hover:from-orange-600 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center gap-3">
                          <ButtonSpinner size="sm" />
                          Создание...
                        </div>
                      ) : (
                        'Создать бота'
                      )}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="p-8 text-center">
                <motion.div
                  className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.5 }}
                >
                  <CheckCircle className="text-green-600" size={32} />
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Бот успешно создан!
                </h3>
                <p className="text-gray-600 mb-6">
                  Ваш Telegram бот готов к работе
                </p>
                <motion.div
                  className="w-full bg-gray-200 rounded-full h-2"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2 }}
                >
                  <motion.div
                    className="bg-green-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2 }}
                  />
                </motion.div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default AddBotModal
