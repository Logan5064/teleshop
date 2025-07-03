'use client'

import React, { useState } from 'react'
import { Copy, Check } from 'lucide-react'

// ИМПОРТЫ ДАННЫХ ИЗ МОДУЛЬНЫХ ФАЙЛОВ
import { categories } from './data/categories'
import { layoutSystemData } from './data/layoutSystemData'
import { typographySystemData } from './data/typographySystemData'
import { iconSystemData } from './data/iconSystemData'
import { navigationSystemData } from './data/navigationSystemData'
import { advancedEffectsData } from './data/advancedEffectsData'
import { styleRecipes } from './data/styleRecipes'
import { buttonStyles } from './data/buttonStyles'
import { cardStyles } from './data/cardStyles'
import { typographyStyles } from './data/typographyStyles'
import { navigationStyles } from './data/navigationStyles'
import { formStyles } from './data/formStyles'
import { animationStyles } from './data/animationStyles'
import { glassmorphismData } from './data/glassmorphismData'
import { colorSchemes } from './data/colorSchemes'
import { modernUITrends } from './data/modernUITrends'

export default function DesignShowcase() {
  const [selectedCategory, setSelectedCategory] = useState('style-recipes')
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [selectedStyle, setSelectedStyle] = useState<string>('')
  const [showModal, setShowModal] = useState(false)

  const copyToClipboard = (code: string, name: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(name)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const renderCategory = () => {
    switch (selectedCategory) {
      case 'style-recipes':
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">🧪 Рецепты стилей TeleShop</h2>
              <p className="text-gray-600">Готовые комбинации CSS классов для создания красивых компонентов</p>
            </div>
            
            {/* ГРУППИРОВКА ПО КАТЕГОРИЯМ */}
            {['Кнопки', 'Карточки', 'Формы', 'Утилиты', 'Анимации'].map(category => (
              <div key={category} className="mb-12">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">{category}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {styleRecipes
                    .filter(recipe => recipe.category === category)
                    .map((recipe, index) => (
                      <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="font-bold text-lg">{recipe.name}</h4>
                            <p className="text-sm text-gray-600 mt-1">{recipe.description}</p>
                          </div>
                          <button
                            onClick={() => copyToClipboard(recipe.code, recipe.name)}
                            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                          >
                            {copiedCode === recipe.name ? <Check size={16} /> : <Copy size={16} />}
                          </button>
                        </div>
                        <div className="mb-4">
                          {recipe.component}
                        </div>
                        <div className="text-xs bg-gray-100 p-3 rounded-lg font-mono text-gray-700">
                          {recipe.code}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )

      case 'glassmorphism-showcase':
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">🔮 Glassmorphism Витрина</h2>
              <p className="text-gray-600">Коллекция стеклянных эффектов с размытием фона и полупрозрачностью</p>
            </div>
            
            {/* ГРУППИРОВКА ПО КАТЕГОРИЯМ */}
            {['Фоны', 'Карточки', 'Навигация', 'Формы', 'Иконки', 'Кнопки', 'Уведомления'].map(category => (
              <div key={category} className="mb-12">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">{category}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {glassmorphismData
                    .filter(item => item.category === category)
                    .map((item, index) => (
                      <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="font-bold text-lg">{item.name}</h4>
                            <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                          </div>
                          <button
                            onClick={() => copyToClipboard(item.code, item.name)}
                            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                          >
                            {copiedCode === item.name ? <Check size={16} /> : <Copy size={16} />}
                          </button>
                        </div>
                        <div className="mb-4">
                          {item.component}
                        </div>
                        <div className="text-xs bg-gray-100 p-3 rounded-lg font-mono text-gray-700">
                          {item.code}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )

      case 'layout-system':
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">🏗️ Layout System</h2>
              <p className="text-gray-600">Основные компоненты системы компоновки</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {layoutSystemData.map((item, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold text-lg">{item.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(item.code, item.name)}
                      className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      {copiedCode === item.name ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                  <div className="mb-4">
                    {item.component}
                  </div>
                  <div className="text-xs bg-gray-100 p-3 rounded-lg font-mono text-gray-700">
                    {item.code}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 'typography-system':
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">📝 Typography System</h2>
              <p className="text-gray-600">Типографическая система для единообразного оформления текста</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {typographySystemData.map((item, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold text-lg">{item.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(item.code, item.name)}
                      className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      {copiedCode === item.name ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                  <div className="mb-4">
                    {item.component}
                  </div>
                  <div className="text-xs bg-gray-100 p-3 rounded-lg font-mono text-gray-700">
                    {item.code}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 'icon-system':
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">🎯 Icon System</h2>
              <p className="text-gray-600">Система стилизации иконок и аватаров</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {iconSystemData.map((item, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold text-lg">{item.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(item.code, item.name)}
                      className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      {copiedCode === item.name ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                  <div className="mb-4">
                    {item.component}
                  </div>
                  <div className="text-xs bg-gray-100 p-3 rounded-lg font-mono text-gray-700">
                    {item.code}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 'navigation-system':
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">🧭 Navigation System</h2>
              <p className="text-gray-600">Компоненты навигации для приложения</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {navigationSystemData.map((item, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold text-lg">{item.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(item.code, item.name)}
                      className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      {copiedCode === item.name ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                  <div className="mb-4">
                    {item.component}
                  </div>
                  <div className="text-xs bg-gray-100 p-3 rounded-lg font-mono text-gray-700">
                    {item.code}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 'advanced-effects':
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">✨ Advanced Effects</h2>
              <p className="text-gray-600">Продвинутые эффекты и комбинации стилей</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {advancedEffectsData.map((item, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold text-lg">{item.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(item.code, item.name)}
                      className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      {copiedCode === item.name ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                  <div className="mb-4">
                    {item.component}
                  </div>
                  <div className="text-xs bg-gray-100 p-3 rounded-lg font-mono text-gray-700">
                    {item.code}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 'buttons':
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">🔲 Библиотека кнопок</h2>
              <p className="text-gray-600">Коллекция стилизованных кнопок для интерфейса</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {buttonStyles.map((button, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-bold text-lg">{button.name}</h4>
                    <button
                      onClick={() => copyToClipboard(button.code, button.name)}
                      className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      {copiedCode === button.name ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                  <div className="mb-4 flex justify-center">
                    {button.component}
                  </div>
                  <div className="text-xs bg-gray-100 p-3 rounded-lg font-mono text-gray-700 break-all">
                    {button.code}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 'cards':
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">🪟 Библиотека карточек</h2>
              <p className="text-gray-600">Разнообразные стили карточек для контента</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cardStyles.map((card, index) => (
                <div key={index} className="bg-gray-50 rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-bold text-lg">{card.name}</h4>
                    <button
                      onClick={() => copyToClipboard(card.code, card.name)}
                      className="p-2 rounded-lg bg-white hover:bg-gray-100 transition-colors"
                    >
                      {copiedCode === card.name ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                  <div className="mb-4">
                    {card.component}
                  </div>
                  <div className="text-xs bg-white p-3 rounded-lg font-mono text-gray-700 break-all">
                    {card.code}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 'colors':
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">🎨 Цветовые схемы</h2>
              <p className="text-gray-600">Готовые цветовые палитры для оформления</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {colorSchemes.map((scheme, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{scheme.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{scheme.description}</p>
                  
                  <div className="flex space-x-1 mb-4">
                    {scheme.colors.map((color, colorIndex) => (
                      <div key={colorIndex} className={`w-8 h-8 rounded ${color} border border-gray-200`}></div>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => setSelectedStyle(scheme.name)}
                    className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${scheme.primary} text-white hover:opacity-80`}
                  >
                    Выбрать схему
                  </button>
                </div>
              ))}
            </div>
          </div>
        )

      case 'animations':
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">✨ Анимации</h2>
              <p className="text-gray-600">Коллекция красивых анимаций для элементов</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {animationStyles.map((style, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-800">{style.name}</h3>
                    <button
                      onClick={() => copyToClipboard(style.code, style.name)}
                      className="text-gray-500 hover:text-blue-500 transition-colors"
                    >
                      {copiedCode === style.name ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-center p-8 bg-gray-50 rounded-lg mb-4">
                    {style.component}
                  </div>
                  
                  <div className="bg-gray-100 rounded-lg p-3">
                    <code className="text-xs text-gray-700 break-all">{style.code}</code>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 'typography':
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">🔤 Типографика</h2>
              <p className="text-gray-600">Стили текста для всех случаев</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {typographyStyles.map((style, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-800">{style.name}</h3>
                    <button
                      onClick={() => copyToClipboard(style.code, style.name)}
                      className="text-gray-500 hover:text-blue-500 transition-colors"
                    >
                      {copiedCode === style.name ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                  
                  <div className="mb-4">
                    {style.component}
                  </div>
                  
                  <div className="bg-white rounded-lg p-3">
                    <code className="text-xs text-gray-700 break-all">{style.code}</code>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 'navigation':
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">🧭 Навигация</h2>
              <p className="text-gray-600">Элементы навигации и меню</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {navigationStyles.map((style, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-800">{style.name}</h3>
                    <button
                      onClick={() => copyToClipboard(style.code, style.name)}
                      className="text-gray-500 hover:text-blue-500 transition-colors"
                    >
                      {copiedCode === style.name ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                  
                  <div className="mb-4">
                    {style.component}
                  </div>
                  
                  <div className="bg-white rounded-lg p-3">
                    <code className="text-xs text-gray-700 break-all">{style.code}</code>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 'forms':
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">📝 Формы</h2>
              <p className="text-gray-600">Стили для форм и полей ввода</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {formStyles.map((style, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-800">{style.name}</h3>
                    <button
                      onClick={() => copyToClipboard(style.code, style.name)}
                      className="text-gray-500 hover:text-blue-500 transition-colors"
                    >
                      {copiedCode === style.name ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                  
                  <div className="mb-4">
                    {style.component}
                  </div>
                  
                  <div className="bg-white rounded-lg p-3">
                    <code className="text-xs text-gray-700 break-all">{style.code}</code>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 'modals':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">🖼️ Модальные окна</h2>
              <p className="text-gray-600">Демонстрация разных стилей модальных окон</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Демо модальных окон</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Простое модальное окно
                </button>
                
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg font-medium">
                  Градиентное окно
                </button>
                
                <button className="backdrop-blur-md bg-white/20 border border-white/30 text-gray-800 px-4 py-2 rounded-lg font-medium">
                  Стеклянное окно
                </button>
              </div>
              
              {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
                  <div className="bg-white rounded-xl p-6 max-w-md mx-4 shadow-2xl" onClick={e => e.stopPropagation()}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold">Модальное окно</h3>
                      <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                        ✕
                      </button>
                    </div>
                    
                    <p className="text-gray-600 mb-6">
                      Это пример простого модального окна с красивым дизайном.
                    </p>
                    
                    <div className="flex space-x-3">
                      <button 
                        onClick={() => setShowModal(false)}
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium transition-colors"
                      >
                        Принять
                      </button>
                      <button 
                        onClick={() => setShowModal(false)}
                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-medium transition-colors"
                      >
                        Отмена
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )

      case 'modern-ui-trends':
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">🚀 Современные UI Тренды</h2>
              <p className="text-gray-600">Коллекция актуальных UI подходов: минимализм, неоморфизм, глассморфизм, градиенты и анимации</p>
            </div>
            
            {/* ГРУППИРОВКА ПО КАТЕГОРИЯМ */}
            {modernUITrends.map(trend => (
              <div key={trend.category} className="mb-12">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">{trend.category}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {trend.items.map((item, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-bold text-lg">{item.name}</h4>
                          <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                        </div>
                        <button
                          onClick={() => copyToClipboard(item.code, item.name)}
                          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                          {copiedCode === item.name ? <Check size={16} /> : <Copy size={16} />}
                        </button>
                      </div>
                      <div className="mb-4">
                        {item.component}
                      </div>
                      <div className="text-xs bg-gray-100 p-3 rounded-lg font-mono text-gray-700">
                        {item.code}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )

      default:
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">🚧 В разработке</h2>
            <p className="text-gray-600">Эта секция будет доступна в ближайшее время</p>
          </div>
        )
    }
  }

  return (
    <div className="ts-page-bg min-h-screen">
      <div className="ts-container max-w-7xl mx-auto px-4 py-8">
        {/* ШАПКА */}
        <div className="text-center mb-12">
          <h1 className="ts-title-main mb-4">🎨 TeleShop Design Showcase</h1>
          <p className="ts-text-body max-w-2xl mx-auto">
            Витрина дизайн-системы TeleShop Constructor с готовыми компонентами, стилями и эффектами
          </p>
        </div>

        {/* НАВИГАЦИЯ */}
        <div className="ts-card mb-8">
          <div className="p-6">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`ts-nav-item ${
                    selectedCategory === category.id ? 'ts-nav-item-active' : 'ts-nav-item-inactive'
                  }`}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* КОНТЕНТ */}
        <div className="ts-spacing-section">
          {renderCategory()}
        </div>
      </div>
    </div>
  )
} 