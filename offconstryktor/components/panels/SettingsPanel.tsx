'use client'

import React, { useState } from 'react'
import { BlockData } from '@/types/blocks'

interface SettingsPanelProps {
  selectedBlock: any;
  onBlockUpdate: (blockId: string, newData: any) => void;
  onBlockDelete: (blockId: string) => void;
  blocks: any[];
  onBlockSelect: (blockId: string | null) => void;
  shopName: string;
  onShopNameChange: (name: string) => void;
  onBlockMove?: (fromIndex: number, toIndex: number) => void;
}

type TabType = 'structure' | 'block-settings' | 'shop-settings';

export default function SettingsPanel({
  selectedBlock,
  onBlockUpdate,
  onBlockDelete,
  blocks,
  onBlockSelect,
  shopName,
  onShopNameChange,
  onBlockMove
}: SettingsPanelProps) {
  
  const [activeTab, setActiveTab] = useState<TabType>('structure');
  
  const handleInputChange = (field: string, value: any) => {
    if (selectedBlock) {
      onBlockUpdate(selectedBlock.id, { [field]: value });
    }
  };

  const tabs = [
    {
      id: 'structure' as TabType,
      name: 'Структура',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
      ),
      count: blocks.length
    },
    {
      id: 'block-settings' as TabType,
      name: 'Настройки блока',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      disabled: !selectedBlock
    },
    {
      id: 'shop-settings' as TabType,
      name: 'Магазин',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    }
  ];

  const renderBlockSettings = (block: any) => {
    const data = block.data || {};

    switch (block.type) {
      case 'banner':
        return (
          <div className="space-y-4">
            <div className="settings-field">
              <label className="settings-label">Заголовок</label>
              <input
                type="text"
                value={data.title || ''}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="settings-input"
                placeholder="Заголовок баннера"
              />
            </div>
            
            <div className="settings-field">
              <label className="settings-label">Описание</label>
              <textarea
                value={data.description || ''}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="settings-textarea"
                placeholder="Описание баннера"
              />
            </div>
            
            <div className="settings-field">
              <label className="settings-label">Цвет фона</label>
              <input
                type="color"
                value={data.backgroundColor || '#f8f9fa'}
                onChange={(e) => handleInputChange('backgroundColor', e.target.value)}
                className="settings-color"
              />
            </div>
          </div>
        );

      case 'text':
        return (
          <div className="space-y-4">
            <div className="settings-field">
              <label className="settings-label">Текст</label>
              <textarea
                value={data.content || ''}
                onChange={(e) => handleInputChange('content', e.target.value)}
                className="settings-textarea"
                placeholder="Введите текст..."
              />
            </div>
            
            <div className="settings-field">
              <label className="settings-label">Цвет текста</label>
              <input
                type="color"
                value={data.color || '#333333'}
                onChange={(e) => handleInputChange('color', e.target.value)}
                className="settings-color"
              />
            </div>
          </div>
        );

      case 'button':
        return (
          <div className="space-y-4">
            <div className="settings-field">
              <label className="settings-label">Текст кнопки</label>
              <input
                type="text"
                value={data.text || ''}
                onChange={(e) => handleInputChange('text', e.target.value)}
                className="settings-input"
                placeholder="Текст кнопки"
              />
            </div>
            
            <div className="settings-field">
              <label className="settings-label">Ссылка</label>
              <input
                type="url"
                value={data.url || ''}
                onChange={(e) => handleInputChange('url', e.target.value)}
                className="settings-input"
                placeholder="https://example.com"
              />
            </div>
            
            <div className="settings-field">
              <label className="settings-label">Стиль</label>
              <select
                value={data.style || 'primary'}
                onChange={(e) => handleInputChange('style', e.target.value)}
                className="settings-select"
              >
                <option value="primary">Основной</option>
                <option value="secondary">Вторичный</option>
                <option value="outline">Контурный</option>
              </select>
            </div>
          </div>
        );

      case 'product':
        return (
          <div className="space-y-4">
            <div className="settings-field">
              <label className="settings-label">Название товара</label>
              <input
                type="text"
                value={data.name || ''}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="settings-input"
                placeholder="Название товара"
              />
            </div>
            
            <div className="settings-field">
              <label className="settings-label">Цена</label>
              <input
                type="number"
                value={data.price || ''}
                onChange={(e) => handleInputChange('price', parseInt(e.target.value))}
                className="settings-input"
                placeholder="1000"
              />
            </div>
            
            <div className="settings-field">
              <label className="settings-label">Описание</label>
              <textarea
                value={data.description || ''}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="settings-textarea"
                placeholder="Описание товара"
              />
            </div>
          </div>
        );

      case 'spacer':
        return (
          <div className="space-y-4">
            <div className="settings-field">
              <label className="settings-label">Высота</label>
              <input
                type="text"
                value={data.height || '40px'}
                onChange={(e) => handleInputChange('height', e.target.value)}
                className="settings-input"
                placeholder="40px"
              />
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-4">⚙️</div>
            <div className="text-lg font-semibold mb-2">Настройки блока</div>
            <div className="text-sm">Настройки для блока "{block.type}" в разработке</div>
          </div>
        );
    }
  };

  // Функции для перемещения блоков
  const moveBlockUp = (index: number) => {
    if (index > 0 && onBlockMove) {
      onBlockMove(index, index - 1);
    }
  };

  const moveBlockDown = (index: number) => {
    if (index < blocks.length - 1 && onBlockMove) {
      onBlockMove(index, index + 1);
    }
  };

  // Автоматическое переключение на вкладку настроек блока при выборе блока
  React.useEffect(() => {
    if (selectedBlock && activeTab === 'structure') {
      setActiveTab('block-settings');
    }
  }, [selectedBlock]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'structure':
        return (
          <div className="tab-content">
            <div className="tab-content-header">
              <div className="tab-content-title">Структура магазина</div>
              <div className="tab-content-subtitle">
                {blocks.length} {blocks.length === 1 ? 'блок' : blocks.length < 5 ? 'блока' : 'блоков'}
              </div>
            </div>

            <div className="blocks-list">
              {blocks
                .sort((a, b) => a.order - b.order)
                .map((block, index) => (
                  <div
                    key={block.id}
                    className={`blocks-list-item ${selectedBlock?.id === block.id ? 'active' : ''}`}
                    onClick={() => onBlockSelect(block.id)}
                  >
                    <div className="blocks-list-item-content">
                      <div className="blocks-list-item-name">
                        {getBlockTypeName(block.type)}
                      </div>
                      <div className="blocks-list-item-order">
                        Позиция {index + 1}
                      </div>
                    </div>
                    
                    {onBlockMove && (
                      <div className="blocks-list-item-controls">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            moveBlockUp(index);
                          }}
                          disabled={index === 0}
                          className="block-move-btn"
                          title="Переместить вверх"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            moveBlockDown(index);
                          }}
                          disabled={index === blocks.length - 1}
                          className="block-move-btn"
                          title="Переместить вниз"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
            </div>

            {blocks.length === 0 && (
              <div className="empty-state">
                <div className="empty-state-icon">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <div className="empty-state-title">Блоки не добавлены</div>
                <div className="empty-state-desc">
                  Перетащите блоки из левой панели в центр
                </div>
              </div>
            )}
          </div>
        );

      case 'block-settings':
        if (!selectedBlock) {
          return (
            <div className="tab-content">
              <div className="empty-state">
                <div className="empty-state-icon">⚙️</div>
                <div className="empty-state-title">Выберите блок</div>
                <div className="empty-state-desc">
                  Кликните на блок в предпросмотре или в структуре, чтобы настроить его
                </div>
              </div>
            </div>
          );
        }

        return (
          <div className="tab-content">
            <div className="tab-content-header">
              <div className="tab-content-title">
                {getBlockTypeName(selectedBlock.type)}
              </div>
              <div className="tab-content-subtitle">
                ID: {selectedBlock.id}
              </div>
            </div>

            <div className="block-actions">
              <button
                onClick={() => onBlockDelete(selectedBlock.id)}
                className="top-panel-btn secondary w-full"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Удалить блок
              </button>
            </div>

            <div className="settings-form">
              {renderBlockSettings(selectedBlock)}
            </div>
          </div>
        );

      case 'shop-settings':
        return (
          <div className="tab-content">
            <div className="tab-content-header">
              <div className="tab-content-title">Настройки магазина</div>
              <div className="tab-content-subtitle">
                Общие параметры вашего магазина
              </div>
            </div>

            <div className="settings-form">
              <div className="settings-field">
                <label className="settings-label">Название магазина</label>
                <input
                  type="text"
                  value={shopName}
                  onChange={(e) => onShopNameChange(e.target.value)}
                  className="settings-input"
                  placeholder="Мой магазин"
                />
              </div>

              <div className="settings-field">
                <label className="settings-label">Описание</label>
                <textarea
                  className="settings-textarea"
                  placeholder="Краткое описание магазина..."
                />
              </div>

              <div className="settings-field">
                <label className="settings-label">Основной цвет</label>
                <input
                  type="color"
                  className="settings-color"
                  defaultValue="#1f2937"
                />
              </div>

              <div className="settings-field">
                <label className="settings-label">Валюта</label>
                <select className="settings-select">
                  <option value="RUB">₽ Рубль</option>
                  <option value="USD">$ Доллар</option>
                  <option value="EUR">€ Евро</option>
                </select>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="settings-panel">
      <div className="constructor-panel-header">
        <h2 className="panel-title">Настройки</h2>
      </div>

      {/* Вкладки */}
      <div className="settings-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => !tab.disabled && setActiveTab(tab.id)}
            className={`settings-tab ${activeTab === tab.id ? 'active' : ''} ${tab.disabled ? 'disabled' : ''}`}
            disabled={tab.disabled}
          >
            <div className="settings-tab-icon">{tab.icon}</div>
            <div className="settings-tab-name">{tab.name}</div>
            {tab.count !== undefined && (
              <div className="settings-tab-count">{tab.count}</div>
            )}
          </button>
        ))}
      </div>

      {/* Содержимое вкладок */}
      <div className="constructor-panel-content">
        {renderTabContent()}
      </div>
    </div>
  );
}

function getBlockTypeName(type: string): string {
  const names: Record<string, string> = {
    banner: 'Баннер',
    text: 'Текст',
    button: 'Кнопка',
    product: 'Товар',
    spacer: 'Отступ',
    image: 'Изображение',
    'product-grid': 'Сетка товаров',
    categories: 'Категории',
    features: 'Преимущества',
    testimonials: 'Отзывы',
    form: 'Форма',
    contact: 'Контакты'
  };
  
  return names[type] || type;
} 