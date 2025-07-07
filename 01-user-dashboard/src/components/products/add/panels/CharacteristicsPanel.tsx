import React, { useState } from 'react';
import { 
  Squares2X2Icon,
  PlusIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

interface CharacteristicsPanelProps {
  productForm: any;
  setProductForm: (updater: (prev: any) => any) => void;
  characteristicsLibrary: any[];
  setCharacteristicsLibrary: (updater: (prev: any[]) => any[]) => void;
  generateId: () => string;
}

export const CharacteristicsPanel = ({ 
  productForm, 
  setProductForm, 
  characteristicsLibrary, 
  setCharacteristicsLibrary,
  generateId 
}: CharacteristicsPanelProps) => {
  const [showCreateCharacteristic, setShowCreateCharacteristic] = useState(false);
  const [newCharacteristic, setNewCharacteristic] = useState({
    name: '',
    values: ['']
  });

  // Функции для работы с характеристиками
  const createCharacteristic = () => {
    if (!newCharacteristic.name.trim()) return;
    
    const characteristic = {
      id: generateId(),
      name: newCharacteristic.name,
      values: newCharacteristic.values
        .filter(v => v.trim())
        .map(v => ({ id: generateId(), name: v.trim() }))
    };
    
    setCharacteristicsLibrary(prev => [...prev, characteristic]);
    setNewCharacteristic({ name: '', values: [''] });
    setShowCreateCharacteristic(false);
  };

  const addValueToNewCharacteristic = () => {
    setNewCharacteristic(prev => ({
      ...prev,
      values: [...prev.values, '']
    }));
  };

  const updateNewCharacteristicValue = (index: number, value: string) => {
    setNewCharacteristic(prev => ({
      ...prev,
      values: prev.values.map((v, i) => i === index ? value : v)
    }));
  };

  const removeValueFromNewCharacteristic = (index: number) => {
    if (newCharacteristic.values.length > 1) {
      setNewCharacteristic(prev => ({
        ...prev,
        values: prev.values.filter((_, i) => i !== index)
      }));
    }
  };

  const selectCharacteristic = (characteristicId: string, valueId: string) => {
    setProductForm(prev => ({
      ...prev,
      selectedCharacteristics: {
        ...prev.selectedCharacteristics,
        [characteristicId]: valueId
      }
    }));
  };

  const removeCharacteristicFromProduct = (characteristicId: string) => {
    setProductForm(prev => ({
      ...prev,
      selectedCharacteristics: Object.fromEntries(
        Object.entries(prev.selectedCharacteristics).filter(([id]) => id !== characteristicId)
      )
    }));
  };

  const deleteCharacteristic = (characteristicId: string) => {
    const characteristic = characteristicsLibrary.find(c => c.id === characteristicId);
    if (characteristic && confirm(`Удалить характеристику "${characteristic.name}"?\n\nЭто действие нельзя отменить.`)) {
      // Удаляем характеристику из справочника
      setCharacteristicsLibrary(prev => prev.filter(c => c.id !== characteristicId));
      // Также удаляем её из выбранных для текущего товара
      removeCharacteristicFromProduct(characteristicId);
    }
  };

  // Функция для сбора всех свойств товара (базовых + кастомных)
  const getAllSelectedProperties = () => {
    const properties: Array<{
      id: string;
      name: string;
      value: string;
      type: 'basic' | 'custom';
      source?: string;
    }> = [];

    // Список уже добавленных свойств для предотвращения дублей
    const addedProperties = new Set<string>();

    // Сначала проверяем атрибуты (созданные кнопками "Создать вариации")
    productForm.attributes.forEach((attr: any) => {
      if (attr.isFromModule && attr.values.length > 0) {
        properties.push({
          id: attr.id,
          name: attr.name,
          value: attr.values.map((v: any) => v.name).join(', '),
          type: 'basic',
          source: 'attribute'
        });
        addedProperties.add(attr.name);
      }
    });

    // Базовые свойства из модулей (только если еще не добавлены как атрибуты)
    if (productForm.modules?.weight && productForm.weight && !addedProperties.has('Вес')) {
      properties.push({
        id: 'weight',
        name: 'Вес',
        value: `${productForm.weight} ${productForm.weightUnit || 'кг'}`,
        type: 'basic',
        source: 'module'
      });
    }

    if (productForm.modules?.condition && productForm.condition && !addedProperties.has('Состояние')) {
      const conditionNames = {
        'new': 'Новый',
        'used': 'Б/У', 
        'refurbished': 'Восстановленный',
        'defective': 'С дефектом'
      };
      properties.push({
        id: 'condition',
        name: 'Состояние',
        value: conditionNames[productForm.condition as keyof typeof conditionNames] || productForm.condition,
        type: 'basic',
        source: 'module'
      });
    }

    if (productForm.modules?.warranty && productForm.warrantyMonths && !addedProperties.has('Гарантия')) {
      properties.push({
        id: 'warranty',
        name: 'Гарантия',
        value: `${productForm.warrantyMonths} мес`,
        type: 'basic',
        source: 'module'
      });
    }

    if (productForm.modules?.dimensions && (productForm.dimensions?.width || productForm.dimensions?.length || productForm.dimensions?.height) && !addedProperties.has('Габариты')) {
      const dims = productForm.dimensions;
      const unit = productForm.dimensionUnit || 'см';
      properties.push({
        id: 'dimensions',
        name: 'Габариты',
        value: `${dims.width || 0}×${dims.length || 0}×${dims.height || 0} ${unit}`,
        type: 'basic',
        source: 'module'
      });
    }

    // Кастомные свойства
    Object.entries(productForm.selectedCharacteristics).forEach(([charId, valueId]) => {
      const characteristic = characteristicsLibrary.find(c => c.id === charId);
      const value = characteristic?.values.find((v: any) => v.id === valueId);
      
      if (characteristic && value) {
        properties.push({
          id: charId,
          name: characteristic.name,
          value: value.name,
          type: 'custom'
        });
      }
    });

    return properties;
  };

  // Функция для удаления базового свойства
  const removeBasicProperty = (propertyId: string, propertyName: string, source?: string) => {
    if (source === 'attribute') {
      // Удаляем атрибут (созданный кнопкой "Создать вариации")
      setProductForm(prev => ({
        ...prev,
        attributes: prev.attributes.filter((attr: any) => attr.id !== propertyId)
      }));
    } else {
      // Удаляем модульное свойство
      if (propertyName === 'Вес') {
        setProductForm(prev => ({ ...prev, weight: '', weightUnit: 'kg' }));
      } else if (propertyName === 'Состояние') {
        setProductForm(prev => ({ ...prev, condition: 'new' }));
      } else if (propertyName === 'Гарантия') {
        setProductForm(prev => ({ ...prev, warrantyMonths: '' }));
      } else if (propertyName === 'Габариты') {
        setProductForm(prev => ({ ...prev, dimensions: { width: '', length: '', height: '' } }));
      }
    }
  };

  return (
    <div className="space-y-6 pb-8">
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6">
        <h3 className="text-lg font-semibold text-emerald-900 mb-2">📋 Кастомные свойства</h3>
        <p className="text-sm text-emerald-700 mb-3">
          Создайте уникальные характеристики один раз и используйте их для всех товаров. 
          Например: создайте "Бренд" со значениями Apple, Samsung, Xiaomi, а потом для каждого товара выбирайте нужный бренд.
        </p>
        <div className="bg-emerald-100 rounded-lg p-3">
          <p className="text-xs text-emerald-800">
            💡 <strong>Как это работает:</strong> Создайте характеристику → Добавьте возможные значения → Выберите нужные для этого товара
          </p>
        </div>
      </div>

      {/* Управление справочником характеристик */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-800">Мои характеристики</h4>
            <p className="text-sm text-gray-600">Создавайте и управляйте характеристиками для товаров</p>
          </div>
          <button
            onClick={() => setShowCreateCharacteristic(!showCreateCharacteristic)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <PlusIcon className="w-4 h-4" />
            Создать характеристику
          </button>
        </div>

        {/* Форма создания новой характеристики */}
        {showCreateCharacteristic && (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <h5 className="font-medium text-gray-800 mb-3">Новая характеристика</h5>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Название характеристики</label>
                <input
                  type="text"
                  value={newCharacteristic.name}
                  onChange={(e) => setNewCharacteristic(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Например: Бренд, Материал, Размер экрана"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">Возможные значения</label>
                  <button
                    onClick={addValueToNewCharacteristic}
                    className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                  >
                    + Добавить значение
                  </button>
                </div>
                <div className="space-y-2">
                  {newCharacteristic.values.map((value, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => updateNewCharacteristicValue(index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="Например: Apple, Samsung, Xiaomi"
                      />
                      {newCharacteristic.values.length > 1 && (
                        <button
                          onClick={() => removeValueFromNewCharacteristic(index)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={createCharacteristic}
                  disabled={!newCharacteristic.name.trim() || newCharacteristic.values.filter(v => v.trim()).length === 0}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Создать характеристику
                </button>
                <button
                  onClick={() => {
                    setShowCreateCharacteristic(false);
                    setNewCharacteristic({ name: '', values: [''] });
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Отмена
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Список существующих характеристик */}
        {characteristicsLibrary.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {characteristicsLibrary.map((characteristic) => (
              <div key={characteristic.id} className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-medium text-gray-800">{characteristic.name}</h5>
                  <div className="flex items-center gap-2">
                    <div className="text-xs text-gray-500">
                      {characteristic.values.length} значений
                    </div>
                    <button
                      onClick={() => deleteCharacteristic(characteristic.id)}
                      className="p-1 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Удалить характеристику"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {characteristic.values.map((value: any) => (
                    <span key={value.id} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {value.name}
                    </span>
                  ))}
                </div>
                <div className="text-xs text-gray-500">
                  Создана для использования во всех товарах
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-xl">
            <div className="space-y-3">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto">
                <Squares2X2Icon className="w-8 h-8 text-gray-400" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700">Создайте первую характеристику</h3>
                <p className="text-xs text-gray-500 mt-1">
                  Например: Бренд, Материал, Размер экрана, Операционная система
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Выбор характеристик для текущего товара */}
      {characteristicsLibrary.length > 0 && (
        <div className="border-t border-gray-200 pt-6">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
            <h4 className="text-lg font-semibold text-blue-900 mb-2">🏷️ Характеристики этого товара</h4>
            <p className="text-sm text-blue-700">
              Выберите какие характеристики применимы к этому товару и укажите их значения
            </p>
          </div>

          <div className="space-y-4">
            {characteristicsLibrary.map((characteristic) => {
              const isSelected = characteristic.id in productForm.selectedCharacteristics;
              const selectedValue = productForm.selectedCharacteristics[characteristic.id];
              
              return (
                <div 
                  key={characteristic.id} 
                  className="bg-white border border-gray-200 rounded-xl p-4 hover:border-gray-300 transition-colors cursor-pointer" 
                  style={{ pointerEvents: 'auto' }}
                  onClick={(e) => {
                    // Запасной клик по всему контейнеру
                    if (e.target === e.currentTarget) {
                      if (isSelected) {
                        removeCharacteristicFromProduct(characteristic.id);
                      } else {
                        selectCharacteristic(characteristic.id, characteristic.values[0]?.id || '');
                      }
                    }
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3" style={{ pointerEvents: 'auto' }}>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (isSelected) {
                            removeCharacteristicFromProduct(characteristic.id);
                          } else {
                            // Выбираем первое значение по умолчанию
                            selectCharacteristic(characteristic.id, characteristic.values[0]?.id || '');
                          }
                        }}
                        className={`font-medium transition-all duration-200 hover:scale-105 cursor-pointer relative z-10 px-3 py-2 rounded-lg border ${
                          isSelected 
                            ? 'text-blue-700 hover:text-blue-800 bg-blue-50 border-blue-200' 
                            : 'text-gray-800 hover:text-blue-600 hover:bg-gray-50 border-gray-200'
                        }`}
                        style={{ pointerEvents: 'auto' }}
                        type="button"
                      >
                        {isSelected ? '✓' : '○'} {characteristic.name}
                      </button>
                      {isSelected && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded font-medium animate-pulse">
                          Активно
                        </span>
                      )}
                    </div>
                    {isSelected && (
                      <div className="flex flex-wrap gap-2">
                        {characteristic.values.map((value: any) => (
                          <button
                            key={value.id}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              selectCharacteristic(characteristic.id, value.id);
                            }}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 border ${
                              selectedValue === value.id
                                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                                : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200 hover:border-gray-300'
                            }`}
                          >
                            {value.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {!isSelected && (
                    <div>
                      <p className="text-xs text-gray-500 mb-2">Доступные значения:</p>
                      <div className="flex flex-wrap gap-1">
                        {characteristic.values.map((value: any) => (
                          <span key={value.id} className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded">
                            {value.name}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                        👆 Кликните <strong>○ {characteristic.name}</strong> или в любое место этой области чтобы выбрать для этого товара
                      </p>
                    </div>
                  )}
                  
                  {isSelected && (
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 mt-2 border border-blue-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-blue-900">
                            ✓ Выбрано для этого товара
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-blue-700 font-medium">{characteristic.name}:</span>
                            <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded font-medium">
                              {characteristic.values.find((v: any) => v.id === selectedValue)?.name}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            removeCharacteristicFromProduct(characteristic.id);
                          }}
                          className="text-blue-600 hover:text-blue-800 text-xs font-medium hover:bg-blue-100 px-2 py-1 rounded transition-colors"
                        >
                          Отменить
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Объединенная сводка всех свойств товара (базовых + кастомных) */}
          {(() => {
            const allProperties = getAllSelectedProperties();
            return allProperties.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-2xl p-6 mt-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-green-500 rounded-xl flex items-center justify-center">
                    <span className="text-white text-lg">✓</span>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900">Все свойства товара</h5>
                    <p className="text-sm text-gray-600">
                      Базовых: {allProperties.filter(p => p.type === 'basic').length} • 
                      Кастомных: {allProperties.filter(p => p.type === 'custom').length}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {allProperties.map((property) => (
                    <div 
                      key={property.id} 
                      className={`rounded-xl p-4 border ${
                        property.type === 'basic' 
                          ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200' 
                          : 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                              {property.name}
                            </p>
                            <span className={`px-1.5 py-0.5 text-xs font-medium rounded ${
                              property.type === 'basic' 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-gray-600 text-white'
                            }`}>
                              {property.type === 'basic' ? 'База' : 'Своё'}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-900 shadow-sm">
                              {property.value}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            if (property.type === 'custom') {
                              removeCharacteristicFromProduct(property.id);
                            } else {
                              removeBasicProperty(property.id, property.name, property.source);
                            }
                          }}
                          className="ml-3 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title={`Убрать ${property.name}`}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                {allProperties.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">
                        Все эти свойства будут показаны покупателям
                      </p>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-500">
                          💡 Базовые настраиваются в первой вкладке
                        </span>
                        {Object.keys(productForm.selectedCharacteristics).length > 0 && (
                          <button
                            onClick={() => setProductForm(prev => ({ ...prev, selectedCharacteristics: {} }))}
                            className="text-sm text-red-600 hover:text-red-700 font-medium hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors"
                          >
                            Очистить кастомные
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}; 
