'use client'

import React, { useState } from 'react'
import { 
  Copy, Check, Play, Heart, ShoppingCart, User, Settings,
  Star, Zap, Gift, Download, Share2, Plus, Minus, X,
  Eye, EyeOff, Search, Filter, Menu, Bell, Home
} from 'lucide-react'

// ИМПОРТЫ ДАННЫХ ИЗ МОДУЛЬНЫХ ФАЙЛОВ
import { categories } from './data/categories'
import { layoutSystemData } from './data/layoutSystemData'
import { typographySystemData } from './data/typographySystemData'
import { iconSystemData } from './data/iconSystemData'
import { navigationSystemData } from './data/navigationSystemData'
import { advancedEffectsData } from './data/advancedEffectsData'
import { gridSpacingData } from './data/gridSpacingData'
import { statusData } from './data/statusData'
import { styleRecipes } from './data/styleRecipes'
import { buttonStyles } from './data/buttonStyles'
import { cardStyles } from './data/cardStyles'
// import { animationStyles } from './data/animationStyles' // Будет создан позже

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