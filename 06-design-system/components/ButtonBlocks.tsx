import React, { useState } from 'react'
import { 
  ShoppingCart, Heart, Share2, Download, Play, Pause, 
  Star, Check, ArrowRight, Zap, Gift, Send, Phone,
  Mail, MessageCircle, ThumbsUp, Bookmark, Bell,
  Settings, User, Home, Search, Filter, Plus
} from 'lucide-react'
import { PhoneFrame } from './PhoneFrame'

export const ButtonBlocks: React.FC = () => {
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <section className="px-4">
      <h2 className="text-xl font-bold mb-8 text-center text-emerald-600">🔲 BUTTON БЛОКИ</h2>
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 justify-center">
        
        <PhoneFrame title="Button #001 - Основные кнопки">
          <div className="pt-6 p-4">
            <div className="text-sm font-medium mb-4">Основные стили</div>
            
            <div className="space-y-3">
              <button onClick={() => alert('Добавлено в корзину!')} className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Добавить в корзину
              </button>
              
              <button onClick={() => alert('Купить сейчас!')} className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium transition-colors duration-200">
                Купить сейчас
              </button>
              
              <button onClick={() => alert('В избранное!')} className="w-full border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center">
                <Heart className="w-4 h-4 mr-2" />
                В избранное
              </button>
              
              <button onClick={() => alert('Поделиться!')} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center">
                <Share2 className="w-4 h-4 mr-2" />
                Поделиться
              </button>
            </div>
          </div>
        </PhoneFrame>

        <PhoneFrame title="Button #002 - Градиентные кнопки">
          <div className="pt-6 p-4">
            <div className="text-sm font-medium mb-4">Градиентные стили</div>
            
            <div className="space-y-3">
              <button onClick={() => alert('Скачать!')} className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center">
                <Download className="w-4 h-4 mr-2" />
                Скачать файл
              </button>
              
              <button onClick={() => alert('Премиум!')} className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center">
                <Star className="w-4 h-4 mr-2" />
                Премиум доступ
              </button>
              
              <button onClick={() => alert('Успех!')} className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center">
                <Check className="w-4 h-4 mr-2" />
                Подтвердить
              </button>
              
              <button onClick={() => alert('Продолжить!')} className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center">
                Продолжить
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </PhoneFrame>

        <PhoneFrame title="Button #003 - Анимированные кнопки">
          <div className="pt-6 p-4">
            <div className="text-sm font-medium mb-4">Анимации и эффекты</div>
            
            <div className="space-y-3">
              <button 
                onClick={() => setIsLiked(!isLiked)}
                className={`w-full py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center ${
                  isLiked 
                    ? 'bg-red-500 text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Heart className={`w-4 h-4 mr-2 transition-all duration-300 ${isLiked ? 'fill-current scale-125' : ''}`} />
                {isLiked ? 'Нравится!' : 'Поставить лайк'}
              </button>
              
              <button onClick={() => alert('Молния!')} className="w-full bg-yellow-400 hover:bg-yellow-500 text-yellow-900 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:-translate-y-1 flex items-center justify-center">
                <Zap className="w-4 h-4 mr-2 animate-pulse" />
                Быстрый заказ
              </button>
              
              <button onClick={() => alert('Подарок!')} className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center justify-center relative overflow-hidden">
                <Gift className="w-4 h-4 mr-2" />
                Подарочная упаковка
                <div className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
              </button>
              
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center"
              >
                {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isPlaying ? 'Пауза' : 'Воспроизвести'}
              </button>
            </div>
          </div>
        </PhoneFrame>

        <PhoneFrame title="Button #004 - Круглые кнопки">
          <div className="pt-6 p-4">
            <div className="text-sm font-medium mb-4">Круглые FAB кнопки</div>
            
            <div className="flex flex-wrap gap-3 justify-center">
              <button onClick={() => alert('Сообщение!')} className="w-12 h-12 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center">
                <Send className="w-5 h-5" />
              </button>
              
              <button onClick={() => alert('Звонок!')} className="w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </button>
              
              <button onClick={() => alert('Email!')} className="w-12 h-12 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </button>
              
              <button onClick={() => alert('Чат!')} className="w-12 h-12 bg-purple-500 hover:bg-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mt-6 flex justify-center">
              <button onClick={() => alert('Главная FAB!')} className="w-16 h-16 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 flex items-center justify-center">
                <Plus className="w-6 h-6" />
              </button>
            </div>
            
            <div className="mt-4 text-center">
              <div className="text-xs text-gray-600">Floating Action Buttons</div>
            </div>
          </div>
        </PhoneFrame>

        <PhoneFrame title="Button #005 - Кнопки с бейджами">
          <div className="pt-6 p-4">
            <div className="text-sm font-medium mb-4">Уведомления и счетчики</div>
            
            <div className="space-y-3">
              <button onClick={() => alert('Лайки!')} className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center relative">
                <ThumbsUp className="w-4 h-4 mr-2" />
                Нравится
                <span className="absolute -top-1 -right-1 bg-yellow-400 text-red-800 text-xs px-2 py-1 rounded-full font-bold">
                  24
                </span>
              </button>
              
              <button 
                onClick={() => setIsBookmarked(!isBookmarked)}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center relative"
              >
                <Bookmark className={`w-4 h-4 mr-2 ${isBookmarked ? 'fill-current' : ''}`} />
                Закладки
                <span className="absolute -top-1 -right-1 bg-green-400 text-blue-800 text-xs px-2 py-1 rounded-full font-bold">
                  7
                </span>
              </button>
              
              <button onClick={() => alert('Уведомления!')} className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center relative">
                <Bell className="w-4 h-4 mr-2" />
                Уведомления
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-6 h-6 rounded-full font-bold flex items-center justify-center animate-pulse">
                  3
                </span>
              </button>
            </div>
          </div>
        </PhoneFrame>

        <PhoneFrame title="Button #006 - Количество товара">
          <div className="pt-6 p-4">
            <div className="text-sm font-medium mb-4">Селектор количества</div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-4">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors duration-200"
                >
                  <span className="text-lg font-bold text-gray-700">−</span>
                </button>
                
                <div className="bg-gray-50 px-4 py-2 rounded-lg border">
                  <span className="text-lg font-bold">{quantity}</span>
                </div>
                
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition-colors duration-200"
                >
                  <span className="text-lg font-bold">+</span>
                </button>
              </div>
              
              <div className="flex space-x-2">
                {[1, 2, 5, 10].map((num) => (
                  <button 
                    key={num}
                    onClick={() => setQuantity(num)}
                    className={`flex-1 py-2 rounded-lg font-medium transition-colors duration-200 ${
                      quantity === num 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
              
              <button onClick={() => alert(`Добавлено ${quantity} шт.`)} className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium transition-colors duration-200">
                Добавить {quantity} шт. в корзину
              </button>
            </div>
          </div>
        </PhoneFrame>

        <PhoneFrame title="Button #007 - Переключатели">
          <div className="pt-6 p-4">
            <div className="text-sm font-medium mb-4">Toggle кнопки</div>
            
            <div className="space-y-4">
              <div className="flex rounded-lg overflow-hidden border border-gray-300">
                <button onClick={() => alert('Сетка')} className="flex-1 bg-blue-500 text-white py-2 px-4 font-medium">
                  Сетка
                </button>
                <button onClick={() => alert('Список')} className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 font-medium">
                  Список
                </button>
              </div>
              
              <div className="flex space-x-2">
                {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                  <button 
                    key={size}
                    onClick={() => alert(`Размер: ${size}`)}
                    className="flex-1 py-2 border-2 border-gray-300 rounded-lg font-medium hover:border-blue-500 hover:text-blue-500 transition-colors duration-200"
                  >
                    {size}
                  </button>
                ))}
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                {['Красный', 'Синий', 'Зеленый'].map((color, index) => {
                  const bgColors = ['bg-red-500', 'bg-blue-500', 'bg-green-500'];
                  return (
                    <button 
                      key={color}
                      onClick={() => alert(`Цвет: ${color}`)}
                      className={`${bgColors[index]} text-white py-2 px-3 rounded-lg font-medium opacity-80 hover:opacity-100 transition-opacity duration-200`}
                    >
                      {color}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </PhoneFrame>

        <PhoneFrame title="Button #008 - Социальные кнопки">
          <div className="pt-6 p-4">
            <div className="text-sm font-medium mb-4">Социальные сети</div>
            
            <div className="space-y-3">
              <button onClick={() => alert('Поделиться в Telegram!')} className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center">
                <Send className="w-4 h-4 mr-2" />
                Поделиться в Telegram
              </button>
              
              <button onClick={() => alert('Поделиться в WhatsApp!')} className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center">
                <MessageCircle className="w-4 h-4 mr-2" />
                Отправить в WhatsApp
              </button>
              
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => alert('VK')} className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200">
                  VK
                </button>
                <button onClick={() => alert('OK')} className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200">
                  OK
                </button>
              </div>
              
              <button onClick={() => alert('Скопировать ссылку!')} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg font-medium transition-colors duration-200 border border-gray-300">
                📋 Скопировать ссылку
              </button>
            </div>
          </div>
        </PhoneFrame>

        <PhoneFrame title="Button #009 - Статусные кнопки">
          <div className="pt-6 p-4">
            <div className="text-sm font-medium mb-4">Состояния и статусы</div>
            
            <div className="space-y-3">
              <button disabled className="w-full bg-gray-300 text-gray-500 py-3 rounded-lg font-medium cursor-not-allowed">
                Недоступно
              </button>
              
              <button onClick={() => alert('Загрузка...')} className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-600 animate-pulse opacity-50"></div>
                Загрузка...
              </button>
              
              <button onClick={() => alert('Успешно!')} className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center">
                <Check className="w-4 h-4 mr-2" />
                Успешно выполнено
              </button>
              
              <button onClick={() => alert('Внимание!')} className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg font-medium transition-colors duration-200">
                ⚠️ Требует внимания
              </button>
              
              <button onClick={() => alert('Ошибка!')} className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-medium transition-colors duration-200">
                ❌ Произошла ошибка
              </button>
            </div>
          </div>
        </PhoneFrame>

        <PhoneFrame title="Button #010 - Кастомные кнопки">
          <div className="pt-6 p-4">
            <div className="text-sm font-medium mb-4">Уникальные стили</div>
            
            <div className="space-y-3">
              <button onClick={() => alert('Неоморфизм!')} className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-2xl font-medium shadow-[inset_-2px_-2px_6px_rgba(255,255,255,1),inset_2px_2px_6px_rgba(0,0,0,0.1)] hover:shadow-[inset_-1px_-1px_3px_rgba(255,255,255,1),inset_1px_1px_3px_rgba(0,0,0,0.1)] transition-shadow duration-200">
                Неоморфизм
              </button>
              
              <button onClick={() => alert('3D эффект!')} className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 px-6 rounded-lg font-bold transform transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-2xl border-b-4 border-purple-700 hover:border-purple-800">
                3D Эффект
              </button>
              
              <button onClick={() => alert('Стекло!')} className="w-full backdrop-blur-md bg-white/20 border border-white/30 text-gray-800 py-3 px-6 rounded-xl font-medium hover:bg-white/30 transition-all duration-300 shadow-lg">
                Стекломорфизм
              </button>
              
              <button onClick={() => alert('Градиент border!')} className="w-full bg-white text-gray-800 py-3 px-6 rounded-lg font-medium relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-lg p-[2px]">
                  <div className="bg-white rounded-lg w-full h-full flex items-center justify-center">
                    Градиент рамка
                  </div>
                </div>
              </button>
            </div>
          </div>
        </PhoneFrame>

      </div>
    </section>
  )
} 