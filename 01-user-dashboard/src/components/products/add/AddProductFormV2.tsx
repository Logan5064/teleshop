'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tab } from '@headlessui/react';
import ProductModules from './modules/ProductModules';
import { ProductTypeModulesV2 } from './modules/ProductTypeModulesV2';
import { BasicInfoPanel } from './panels/BasicInfoPanel';
import { CharacteristicsPanel } from './panels/CharacteristicsPanel';
import { PricingPanel } from './panels/PricingPanel';
import { StatusPanel } from './panels/StatusPanel';
import {
  ArrowLeftIcon,
  InformationCircleIcon,
  CogIcon,
  CurrencyDollarIcon,
  TagIcon,
  CubeIcon,
  DevicePhoneMobileIcon,
  FireIcon,
  HandRaisedIcon,
  TicketIcon,
  ArrowPathIcon,
  Squares2X2Icon
} from '@heroicons/react/24/outline';

interface AddProductFormProps {
  onSave: (productData: any) => void;
  onCancel: () => void;
}

export default function AddProductFormV2({ onSave, onCancel }: AddProductFormProps) {
  const [activeTab, setActiveTab] = useState(0);
  
  // Состояние формы товара
  const [productForm, setProductForm] = useState({
    // Тип товара
    productType: 'physical',
    
    // Основная информация
    name: '',
    description: '',
    images: [] as string[],
    
    // Модули для физических товаров
    modules: {
      // Физические товары
      clothingSizes: false,
      shoeSizes: false,
      weight: false,
      dimensions: false,
      colors: false,
      materials: false,
      condition: false,
      warranty: false,
      // Цифровые товары
      fileSize: false,
      fileFormat: false,
      accessDuration: false,
      // Еда и напитки
      calories: false,
      spiciness: false,
      cookingTime: false,
      // Услуги
      serviceDuration: false,
      serviceLocation: false,
      // Билеты/События
      eventDate: false,
      eventTime: false,
      ageRestrictions: false,
      // Подписки
      subscriptionType: false,
      autoRenewal: false
    },
    
    // Дополнительные поля модулей
    weightUnit: 'kg',
    dimensionUnit: 'cm',
    condition: 'new',
    warrantyMonths: '',
    
    // Вариации товара
    hasVariations: false,
    attributes: [] as Array<{
      id: string;
      name: string;
      isFromModule?: boolean;
      values: Array<{ id: string; name: string; }>;
    }>,
    variations: [] as Array<{
      id: string;
      combination: Array<{ attributeId: string; valueId: string; }>;
      sku: string;
      price: string;
      oldPrice: string;
      quantity: string;
      weight: string;
      images: string[];
      isActive: boolean;
    }>,
    
    // Выбранные характеристики товара (из справочника)
    selectedCharacteristics: {} as Record<string, string>, // characteristicId -> valueId
    
    // Характеристики
    characteristics: '',
    dimensions: { width: '', length: '', height: '' },
    clothingSizes: [] as string[],
    shoeSizes: [] as number[],
    weight: '',
    color: '',
    
    // Цены и количество
    price: '',
    oldPrice: '',
    quantity: '',
    unit: 'штука',
    
    // Статусы
    isNew: false,
    isPopular: false,
    isOnOrder: false,
    inStock: true,
    stockType: 'limited',
    
    // Цифровые товары
    downloadLink: '',
    fileSize: '',
    fileSizeUnit: 'GB',
    systemRequirements: '',
    
    // Еда и напитки
    ingredients: '',
    allergens: [] as string[],
    calories: '',
    portionWeight: '',
    spiciness: 0,
    cookingTime: '',
    
    // Услуги
    serviceDuration: '',
    serviceDurationUnit: 'minutes',
    requirements: '',
    included: '',
    
    // Билеты и события
    venue: '',
    duration: '',
    ageRestrictions: '',
    
    // Подписки
    subscriptionFeatures: [] as string[]
  });

  // Справочник характеристик (в реальном приложении это будет из API)
  const [characteristicsLibrary, setCharacteristicsLibrary] = useState([
    {
      id: 'brand',
      name: 'Бренд',
      values: [
        { id: 'apple', name: 'Apple' },
        { id: 'samsung', name: 'Samsung' },
        { id: 'xiaomi', name: 'Xiaomi' },
        { id: 'huawei', name: 'Huawei' }
      ]
    },
    {
      id: 'color',
      name: 'Основной цвет',
      values: [
        { id: 'black', name: 'Черный' },
        { id: 'white', name: 'Белый' },
        { id: 'blue', name: 'Синий' },
        { id: 'red', name: 'Красный' }
      ]
    }
  ]);

  // Типы товаров
  const productTypes = [
    {
      id: 'physical',
      name: 'Физический товар',
      description: 'Одежда, техника, книги',
      icon: CubeIcon,
      color: 'bg-blue-100 text-blue-700 border-blue-300'
    },
    {
      id: 'digital',
      name: 'Цифровой товар',
      description: 'Курсы, ПО, контент',
      icon: DevicePhoneMobileIcon,
      color: 'bg-purple-100 text-purple-700 border-purple-300'
    },
    {
      id: 'food',
      name: 'Еда и напитки',
      description: 'Пицца, кофе, десерты',
      icon: FireIcon,
      color: 'bg-orange-100 text-orange-700 border-orange-300'
    },
    {
      id: 'service',
      name: 'Услуга',
      description: 'Консультации, ремонт',
      icon: HandRaisedIcon,
      color: 'bg-green-100 text-green-700 border-green-300'
    },
    {
      id: 'ticket',
      name: 'Билет/Событие',
      description: 'Мероприятия, концерты',
      icon: TicketIcon,
      color: 'bg-pink-100 text-pink-700 border-pink-300'
    },
    {
      id: 'subscription',
      name: 'Подписка',
      description: 'Членство, абонементы',
      icon: ArrowPathIcon,
      color: 'bg-indigo-100 text-indigo-700 border-indigo-300'
    }
  ];

  // Функции для работы с вариациями
  const generateId = () => Math.random().toString(36).substr(2, 9);

  const handleSave = () => {
    onSave(productForm);
  };

  return (
    <div className="p-6 w-full">
      {/* Заголовок с кнопкой назад */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={onCancel}
            className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all duration-200"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Назад к товарам
          </button>
          <div className="w-px h-6 bg-gray-300"></div>
          <h1 className="text-3xl font-semibold text-gray-800 tracking-tight">Добавить новый товар</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onCancel}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200"
          >
            Отмена
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-gray-700 text-white rounded-xl font-medium hover:bg-gray-800 transition-all duration-200 shadow-sm hover:shadow-md"
            disabled={!productForm.name || !productForm.price}
          >
            Сохранить товар
          </button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/95 backdrop-blur-sm rounded-2xl border border-gray-300/60 shadow-sm"
      >
        {/* Выбор типа товара */}
        <div className="p-6 border-b border-gray-200 bg-gray-50/50 rounded-t-2xl">
          <h3 className="text-sm font-semibold text-gray-800 mb-4">Выберите тип товара</h3>
          <div className="grid grid-cols-6 gap-3">
            {productTypes.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => setProductForm(prev => ({ ...prev, productType: type.id }))}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 text-center ${
                    productForm.productType === type.id
                      ? type.color
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Icon className={`w-6 h-6 mb-2 mx-auto ${
                    productForm.productType === type.id 
                      ? '' 
                      : 'text-gray-400'
                  }`} />
                  <h4 className={`font-semibold text-sm ${
                    productForm.productType === type.id 
                      ? '' 
                      : 'text-gray-900'
                  }`}>
                    {type.name}
                  </h4>
                  <p className={`text-xs mt-1 ${
                    productForm.productType === type.id 
                      ? 'opacity-80' 
                      : 'text-gray-500'
                  }`}>
                    {type.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-6">
          <Tab.Group selectedIndex={activeTab} onChange={setActiveTab}>
            <Tab.List className="flex space-x-1 bg-gray-100 p-2 rounded-xl mb-6">
              {[
                { name: 'Основное', icon: InformationCircleIcon },
                { name: 'Базовые свойства', icon: CogIcon },
                { name: 'Кастомные свойства', icon: Squares2X2Icon },
                { name: 'Цены', icon: CurrencyDollarIcon },
                { name: 'Статусы', icon: TagIcon }
              ].map((tab, index) => (
                <Tab
                  key={tab.name}
                  className={({ selected }) =>
                    `flex-1 flex items-center justify-center space-x-2 py-3 px-4 text-sm font-medium rounded-lg transition-all ${
                      selected
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`
                  }
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </Tab>
              ))}
            </Tab.List>

            <Tab.Panels className="min-h-[500px]">
              {/* Основная информация */}
              <Tab.Panel>
                <BasicInfoPanel 
                  productForm={productForm}
                  setProductForm={setProductForm}
                />
              </Tab.Panel>

              {/* Базовые свойства */}
              <Tab.Panel className="space-y-6 pb-8">
                {/* Физические товары */}
                {productForm.productType === 'physical' && (
                  <ProductModules 
                    productForm={productForm}
                    setProductForm={setProductForm}
                    generateId={generateId}
                  />
                )}

                {/* Модули настроек для всех типов товаров */}
                <ProductTypeModulesV2 
                  productForm={productForm}
                  setProductForm={setProductForm}
                  generateId={generateId}
                />
              </Tab.Panel>

              {/* Кастомные свойства */}
              <Tab.Panel>
                <CharacteristicsPanel 
                  productForm={productForm}
                  setProductForm={setProductForm}
                  characteristicsLibrary={characteristicsLibrary}
                  setCharacteristicsLibrary={setCharacteristicsLibrary}
                  generateId={generateId}
                />
              </Tab.Panel>

              {/* Цены */}
              <Tab.Panel>
                <PricingPanel 
                  productForm={productForm}
                  setProductForm={setProductForm}
                />
              </Tab.Panel>

              {/* Статусы */}
              <Tab.Panel>
                <StatusPanel 
                  productForm={productForm}
                  setProductForm={setProductForm}
                />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </motion.div>
    </div>
  );
} 