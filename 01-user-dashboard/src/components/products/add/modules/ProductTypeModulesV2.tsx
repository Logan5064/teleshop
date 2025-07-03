import React from 'react';
import { Package, Tag, Shield, Scale, Clock, MapPin, Calendar, Award, Users, Repeat } from 'lucide-react';

interface ProductTypeModulesProps {
  productForm: any;
  setProductForm: (updater: (prev: any) => any) => void;
  generateId: () => string;
}

export const ProductTypeModulesV2 = ({ 
  productForm, 
  setProductForm, 
  generateId 
}: ProductTypeModulesProps) => {
  return (
    <>
      {/* ==================== ЦИФРОВЫЕ ТОВАРЫ ==================== */}
      {productForm.productType === 'digital' && (
        <div className="ts-spacing-section">
          {/* Блок переключателей модулей */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-6 border border-gray-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-gray-700 rounded-xl flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-gray-800 font-semibold text-lg">Модули характеристик цифрового товара</h3>
                <p className="text-gray-600 text-sm">Включите нужные модули одним кликом - экономьте время создания!</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Размер файла */}
              <div 
                className="bg-white border border-gray-200 rounded-xl p-4 cursor-pointer hover:bg-gray-50 transition-all duration-200"
                onClick={() => setProductForm((prev: any) => ({
                  ...prev,
                  modules: { ...prev.modules, fileSize: !prev.modules?.fileSize }
                }))}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Package className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="text-gray-800 font-medium">Размер файла</h4>
                      <p className="text-gray-500 text-sm">МБ, ГБ, ТБ</p>
                    </div>
                  </div>
                  <div className={`w-10 h-6 rounded-full transition-all duration-200 ${
                    productForm.modules?.fileSize ? 'bg-blue-500' : 'bg-gray-300'
                  }`}>
                    <div className={`w-4 h-4 bg-white rounded-full mt-1 transition-all duration-200 shadow-sm ${
                      productForm.modules?.fileSize ? 'ml-5' : 'ml-1'
                    }`}></div>
                  </div>
                </div>
              </div>
              
              {/* Формат файла */}
              <div 
                className="bg-white border border-gray-200 rounded-xl p-4 cursor-pointer hover:bg-gray-50 transition-all duration-200"
                onClick={() => setProductForm((prev: any) => ({
                  ...prev,
                  modules: { ...prev.modules, fileFormat: !prev.modules?.fileFormat }
                }))}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Tag className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="text-gray-800 font-medium">Формат файла</h4>
                      <p className="text-gray-500 text-sm">PDF, MP4, ZIP, EXE</p>
                    </div>
                  </div>
                  <div className={`w-10 h-6 rounded-full transition-all duration-200 ${
                    productForm.modules?.fileFormat ? 'bg-blue-500' : 'bg-gray-300'
                  }`}>
                    <div className={`w-4 h-4 bg-white rounded-full mt-1 transition-all duration-200 shadow-sm ${
                      productForm.modules?.fileFormat ? 'ml-5' : 'ml-1'
                    }`}></div>
                  </div>
                </div>
              </div>
              
              {/* Срок доступа */}
              <div 
                className="bg-white border border-gray-200 rounded-xl p-4 cursor-pointer hover:bg-gray-50 transition-all duration-200"
                onClick={() => setProductForm((prev: any) => ({
                  ...prev,
                  modules: { ...prev.modules, accessDuration: !prev.modules?.accessDuration }
                }))}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Shield className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="text-gray-800 font-medium">Срок доступа</h4>
                      <p className="text-gray-500 text-sm">Время доступа к товару</p>
                    </div>
                  </div>
                  <div className={`w-10 h-6 rounded-full transition-all duration-200 ${
                    productForm.modules?.accessDuration ? 'bg-blue-500' : 'bg-gray-300'
                  }`}>
                    <div className={`w-4 h-4 bg-white rounded-full mt-1 transition-all duration-200 shadow-sm ${
                      productForm.modules?.accessDuration ? 'ml-5' : 'ml-1'
                    }`}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Формы настроек для включенных модулей */}
          {(productForm.modules?.fileSize || productForm.modules?.fileFormat || productForm.modules?.accessDuration) && (
            <>
              <h3 className="ts-title-section mb-3">Настройки цифрового товара</h3>
              <p className="ts-text-meta mb-4">Настройте специфичные свойства цифрового товара</p>
              
              <div className="ts-grid-main gap-4">
                {/* Размер файла */}
                {productForm.modules?.fileSize && (
                  <div className="ts-card">
                    <div className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Package className="w-4 h-4 text-purple-600" />
                        </div>
                        <h4 className="font-medium text-gray-900 leading-none">Размер файла</h4>
                      </div>
                      
                      <div className="grid grid-cols-5 gap-2 mb-4">
                        <input
                          type="number"
                          step="0.1"
                          value={productForm.fileSize || ''}
                          onChange={(e) => setProductForm((prev: any) => ({ ...prev, fileSize: e.target.value }))}
                          className="ts-input col-span-4"
                          placeholder="2.5"
                        />
                        <select
                          value={productForm.fileSizeUnit || 'GB'}
                          onChange={(e) => setProductForm((prev: any) => ({ ...prev, fileSizeUnit: e.target.value }))}
                          className="ts-select col-span-1"
                        >
                          <option value="MB">МБ</option>
                          <option value="GB">ГБ</option>
                        </select>
                      </div>
                      
                      <button
                        onClick={() => {
                          if (productForm.fileSize) {
                            const sizeProperty = {
                              id: generateId(),
                              name: 'Размер файла',
                              isFromModule: true,
                              values: [{ 
                                id: generateId(), 
                                name: `${productForm.fileSize} ${productForm.fileSizeUnit || 'ГБ'}` 
                              }]
                            };
                            setProductForm((prev: any) => ({
                              ...prev,
                              attributes: prev.attributes.filter((attr: any) => attr.name !== 'Размер файла').concat([sizeProperty])
                            }));
                            alert(`✅ Размер файла "${productForm.fileSize} ${productForm.fileSizeUnit || 'ГБ'}" добавлен в свойства товара!`);
                          } else {
                            alert('⚠️ Сначала укажите размер файла');
                          }
                        }}
                        className="ts-btn-primary w-full"
                      >
                        Добавить
                      </button>
                    </div>
                  </div>
                )}

                {/* Формат файла */}
                {productForm.modules?.fileFormat && (
                  <div className="ts-card">
                    <div className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Tag className="w-4 h-4 text-indigo-600" />
                        </div>
                        <h4 className="font-medium text-gray-900 leading-none">Формат файла</h4>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {['PDF', 'MP4', 'ZIP', 'EXE', 'APK', 'EPUB'].map(format => (
                          <button
                            key={format}
                            data-format={format}
                            onClick={(e) => {
                              document.querySelectorAll('[data-format]').forEach(el => {
                                el.classList.remove('ring-2', 'ring-indigo-500', 'ring-offset-1', 'bg-indigo-50', 'text-indigo-700');
                              });
                              e.currentTarget.classList.add('ring-2', 'ring-indigo-500', 'ring-offset-1', 'bg-indigo-50', 'text-indigo-700');
                              setProductForm((prev: any) => ({ ...prev, fileFormat: format }));
                            }}
                            className="h-10 px-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md flex items-center justify-center font-medium text-gray-700 text-sm"
                          >
                            {format}
                          </button>
                        ))}
                      </div>
                      
                      <button
                        onClick={() => {
                          if (productForm.fileFormat) {
                            const formatProperty = {
                              id: generateId(),
                              name: 'Формат файла',
                              isFromModule: true,
                              values: [{ 
                                id: generateId(), 
                                name: productForm.fileFormat
                              }]
                            };
                            setProductForm((prev: any) => ({
                              ...prev,
                              attributes: prev.attributes.filter((attr: any) => attr.name !== 'Формат файла').concat([formatProperty])
                            }));
                            alert(`✅ Формат файла "${productForm.fileFormat}" добавлен в свойства товара!`);
                          } else {
                            alert('⚠️ Сначала выберите формат файла');
                          }
                        }}
                        className="ts-btn-primary w-full"
                      >
                        Добавить
                      </button>
                    </div>
                  </div>
                )}

                {/* Срок доступа */}
                {productForm.modules?.accessDuration && (
                  <div className="ts-card">
                    <div className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Shield className="w-4 h-4 text-green-600" />
                        </div>
                        <h4 className="font-medium text-gray-900 leading-none">Срок доступа</h4>
                      </div>
                      
                      <select
                        value={productForm.accessDuration || 'unlimited'}
                        onChange={(e) => setProductForm((prev: any) => ({ ...prev, accessDuration: e.target.value }))}
                        className="ts-select w-full mb-4"
                      >
                        <option value="unlimited">Без ограничений</option>
                        <option value="1_month">1 месяц</option>
                        <option value="3_months">3 месяца</option>
                        <option value="6_months">6 месяцев</option>
                        <option value="1_year">1 год</option>
                      </select>
                      
                      <button
                        onClick={() => {
                          const durationNames = {
                            'unlimited': 'Без ограничений',
                            '1_month': '1 месяц',
                            '3_months': '3 месяца',
                            '6_months': '6 месяцев',
                            '1_year': '1 год'
                          };
                          const durationProperty = {
                            id: generateId(),
                            name: 'Срок доступа',
                            isFromModule: true,
                            values: [{ 
                              id: generateId(), 
                              name: durationNames[productForm.accessDuration as keyof typeof durationNames] || productForm.accessDuration
                            }]
                          };
                          setProductForm((prev: any) => ({
                            ...prev,
                            attributes: prev.attributes.filter((attr: any) => attr.name !== 'Срок доступа').concat([durationProperty])
                          }));
                          alert(`✅ Срок доступа "${durationNames[productForm.accessDuration as keyof typeof durationNames]}" добавлен в свойства товара!`);
                        }}
                        className="ts-btn-primary w-full"
                      >
                        Добавить
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}

      {/* ==================== ЕДА И НАПИТКИ ==================== */}
      {productForm.productType === 'food' && (
        <div className="ts-spacing-section">
          {/* Блок переключателей модулей */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-6 border border-gray-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-gray-700 rounded-xl flex items-center justify-center">
                <Scale className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-gray-800 font-semibold text-lg">Модули характеристик еды и напитков</h3>
                <p className="text-gray-600 text-sm">Включите нужные модули одним кликом - экономьте время создания!</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Калории */}
              <div 
                className="bg-white border border-gray-200 rounded-xl p-4 cursor-pointer hover:bg-gray-50 transition-all duration-200"
                onClick={() => setProductForm((prev: any) => ({
                  ...prev,
                  modules: { ...prev.modules, calories: !prev.modules?.calories }
                }))}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Scale className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="text-gray-800 font-medium">Калории</h4>
                      <p className="text-gray-500 text-sm">ккал на порцию</p>
                    </div>
                  </div>
                  <div className={`w-10 h-6 rounded-full transition-all duration-200 ${
                    productForm.modules?.calories ? 'bg-blue-500' : 'bg-gray-300'
                  }`}>
                    <div className={`w-4 h-4 bg-white rounded-full mt-1 transition-all duration-200 shadow-sm ${
                      productForm.modules?.calories ? 'ml-5' : 'ml-1'
                    }`}></div>
                  </div>
                </div>
              </div>
              
              {/* Острота */}
              <div 
                className="bg-white border border-gray-200 rounded-xl p-4 cursor-pointer hover:bg-gray-50 transition-all duration-200"
                onClick={() => setProductForm((prev: any) => ({
                  ...prev,
                  modules: { ...prev.modules, spiciness: !prev.modules?.spiciness }
                }))}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Package className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="text-gray-800 font-medium">Острота</h4>
                      <p className="text-gray-500 text-sm">От 1 до 5 🌶️</p>
                    </div>
                  </div>
                  <div className={`w-10 h-6 rounded-full transition-all duration-200 ${
                    productForm.modules?.spiciness ? 'bg-blue-500' : 'bg-gray-300'
                  }`}>
                    <div className={`w-4 h-4 bg-white rounded-full mt-1 transition-all duration-200 shadow-sm ${
                      productForm.modules?.spiciness ? 'ml-5' : 'ml-1'
                    }`}></div>
                  </div>
                </div>
              </div>
              
              {/* Время приготовления */}
              <div 
                className="bg-white border border-gray-200 rounded-xl p-4 cursor-pointer hover:bg-gray-50 transition-all duration-200"
                onClick={() => setProductForm((prev: any) => ({
                  ...prev,
                  modules: { ...prev.modules, cookingTime: !prev.modules?.cookingTime }
                }))}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="text-gray-800 font-medium">Время приготовления</h4>
                      <p className="text-gray-500 text-sm">Минуты</p>
                    </div>
                  </div>
                  <div className={`w-10 h-6 rounded-full transition-all duration-200 ${
                    productForm.modules?.cookingTime ? 'bg-blue-500' : 'bg-gray-300'
                  }`}>
                    <div className={`w-4 h-4 bg-white rounded-full mt-1 transition-all duration-200 shadow-sm ${
                      productForm.modules?.cookingTime ? 'ml-5' : 'ml-1'
                    }`}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Формы настроек для включенных модулей */}
          {(productForm.modules?.calories || productForm.modules?.spiciness || productForm.modules?.cookingTime) && (
            <>
              <h3 className="ts-title-section mb-3">Настройки еды и напитков</h3>
              <p className="ts-text-meta mb-4">Настройте пищевые характеристики товара</p>
              
              <div className="ts-grid-main gap-4">
                {/* Калории */}
                {productForm.modules?.calories && (
                  <div className="ts-card">
                    <div className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Scale className="w-4 h-4 text-orange-600" />
                        </div>
                        <h4 className="font-medium text-gray-900 leading-none">Калории</h4>
                      </div>
                      
                      <div className="flex gap-2 items-center mb-4">
                        <input
                          type="number"
                          value={productForm.calories || ''}
                          onChange={(e) => setProductForm((prev: any) => ({ ...prev, calories: e.target.value }))}
                          className="ts-input flex-1"
                          placeholder="250"
                        />
                        <span className="ts-text-meta">ккал</span>
                      </div>
                      
                      <button
                        onClick={() => {
                          if (productForm.calories) {
                            const caloriesProperty = {
                              id: generateId(),
                              name: 'Калории',
                              isFromModule: true,
                              values: [{ 
                                id: generateId(), 
                                name: `${productForm.calories} ккал`
                              }]
                            };
                            setProductForm((prev: any) => ({
                              ...prev,
                              attributes: prev.attributes.filter((attr: any) => attr.name !== 'Калории').concat([caloriesProperty])
                            }));
                            alert(`✅ Калории "${productForm.calories} ккал" добавлены в свойства товара!`);
                          } else {
                            alert('⚠️ Сначала укажите калорийность');
                          }
                        }}
                        className="ts-btn-primary w-full"
                      >
                        Добавить
                      </button>
                    </div>
                  </div>
                )}

                {/* Острота */}
                {productForm.modules?.spiciness && (
                  <div className="ts-card">
                    <div className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Package className="w-4 h-4 text-red-600" />
                        </div>
                        <h4 className="font-medium text-gray-900 leading-none">Острота</h4>
                      </div>
                      
                      <div className="grid grid-cols-5 gap-1 mb-4">
                        {[1, 2, 3, 4, 5].map(level => (
                          <button
                            key={level}
                            data-spice={level}
                            onClick={(e) => {
                              document.querySelectorAll('[data-spice]').forEach(el => {
                                el.classList.remove('ring-2', 'ring-red-500', 'ring-offset-1', 'bg-red-50', 'text-red-700');
                              });
                              for (let i = 1; i <= level; i++) {
                                const btn = document.querySelector(`[data-spice="${i}"]`);
                                btn?.classList.add('ring-2', 'ring-red-500', 'ring-offset-1', 'bg-red-50', 'text-red-700');
                              }
                              setProductForm((prev: any) => ({ ...prev, spiciness: level }));
                            }}
                            className="h-10 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md flex items-center justify-center font-bold text-gray-700"
                          >
                            🌶️
                          </button>
                        ))}
                      </div>
                      
                      <button
                        onClick={() => {
                          if (productForm.spiciness) {
                            const spiceProperty = {
                              id: generateId(),
                              name: 'Острота',
                              isFromModule: true,
                              values: [{ 
                                id: generateId(), 
                                name: `${productForm.spiciness} из 5`
                              }]
                            };
                            setProductForm((prev: any) => ({
                              ...prev,
                              attributes: prev.attributes.filter((attr: any) => attr.name !== 'Острота').concat([spiceProperty])
                            }));
                            alert(`✅ Острота "${productForm.spiciness} из 5" добавлена в свойства товара!`);
                          } else {
                            alert('⚠️ Сначала выберите уровень остроты');
                          }
                        }}
                        className="ts-btn-primary w-full"
                      >
                        Добавить
                      </button>
                    </div>
                  </div>
                )}

                {/* Время приготовления */}
                {productForm.modules?.cookingTime && (
                  <div className="ts-card">
                    <div className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Clock className="w-4 h-4 text-blue-600" />
                        </div>
                        <h4 className="font-medium text-gray-900 leading-none">Время приготовления</h4>
                      </div>
                      
                      <div className="flex gap-2 items-center mb-4">
                        <input
                          type="number"
                          value={productForm.cookingTime || ''}
                          onChange={(e) => setProductForm((prev: any) => ({ ...prev, cookingTime: e.target.value }))}
                          className="ts-input flex-1"
                          placeholder="15"
                        />
                        <span className="ts-text-meta">мин</span>
                      </div>
                      
                      <button
                        onClick={() => {
                          if (productForm.cookingTime) {
                            const timeProperty = {
                              id: generateId(),
                              name: 'Время приготовления',
                              isFromModule: true,
                              values: [{ 
                                id: generateId(), 
                                name: `${productForm.cookingTime} мин`
                              }]
                            };
                            setProductForm((prev: any) => ({
                              ...prev,
                              attributes: prev.attributes.filter((attr: any) => attr.name !== 'Время приготовления').concat([timeProperty])
                            }));
                            alert(`✅ Время приготовления "${productForm.cookingTime} мин" добавлено в свойства товара!`);
                          } else {
                            alert('⚠️ Сначала укажите время приготовления');
                          }
                        }}
                        className="ts-btn-primary w-full"
                      >
                        Добавить
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}

      {/* ==================== УСЛУГИ ==================== */}
      {productForm.productType === 'service' && (
        <div className="ts-spacing-section">
          {/* Блок переключателей модулей */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-6 border border-gray-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-gray-700 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-gray-800 font-semibold text-lg">Модули характеристик услуг</h3>
                <p className="text-gray-600 text-sm">Включите нужные модули одним кликом - экономьте время создания!</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Продолжительность */}
              <div 
                className="bg-white border border-gray-200 rounded-xl p-4 cursor-pointer hover:bg-gray-50 transition-all duration-200"
                onClick={() => setProductForm((prev: any) => ({
                  ...prev,
                  modules: { ...prev.modules, serviceDuration: !prev.modules?.serviceDuration }
                }))}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="text-gray-800 font-medium">Продолжительность</h4>
                      <p className="text-gray-500 text-sm">Время оказания услуги</p>
                    </div>
                  </div>
                  <div className={`w-10 h-6 rounded-full transition-all duration-200 ${
                    productForm.modules?.serviceDuration ? 'bg-blue-500' : 'bg-gray-300'
                  }`}>
                    <div className={`w-4 h-4 bg-white rounded-full mt-1 transition-all duration-200 shadow-sm ${
                      productForm.modules?.serviceDuration ? 'ml-5' : 'ml-1'
                    }`}></div>
                  </div>
                </div>
              </div>
              
              {/* Место оказания */}
              <div 
                className="bg-white border border-gray-200 rounded-xl p-4 cursor-pointer hover:bg-gray-50 transition-all duration-200"
                onClick={() => setProductForm((prev: any) => ({
                  ...prev,
                  modules: { ...prev.modules, serviceLocation: !prev.modules?.serviceLocation }
                }))}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="text-gray-800 font-medium">Место оказания</h4>
                      <p className="text-gray-500 text-sm">Онлайн, офис, у клиента</p>
                    </div>
                  </div>
                  <div className={`w-10 h-6 rounded-full transition-all duration-200 ${
                    productForm.modules?.serviceLocation ? 'bg-blue-500' : 'bg-gray-300'
                  }`}>
                    <div className={`w-4 h-4 bg-white rounded-full mt-1 transition-all duration-200 shadow-sm ${
                      productForm.modules?.serviceLocation ? 'ml-5' : 'ml-1'
                    }`}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Формы настроек для включенных модулей */}
          {(productForm.modules?.serviceDuration || productForm.modules?.serviceLocation) && (
            <>
              <h3 className="ts-title-section mb-3">Настройки услуги</h3>
              <p className="ts-text-meta mb-4">Настройте параметры оказания услуги</p>
              
              <div className="ts-grid-main gap-4">
                {/* Продолжительность */}
                {productForm.modules?.serviceDuration && (
                  <div className="ts-card">
                    <div className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Clock className="w-4 h-4 text-green-600" />
                        </div>
                        <h4 className="font-medium text-gray-900 leading-none">Продолжительность</h4>
                      </div>
                      
                      <div className="grid grid-cols-5 gap-2 mb-4">
                        <input
                          type="number"
                          value={productForm.serviceDuration || ''}
                          onChange={(e) => setProductForm((prev: any) => ({ ...prev, serviceDuration: e.target.value }))}
                          className="ts-input col-span-3"
                          placeholder="60"
                        />
                        <select
                          value={productForm.serviceDurationUnit || 'minutes'}
                          onChange={(e) => setProductForm((prev: any) => ({ ...prev, serviceDurationUnit: e.target.value }))}
                          className="ts-select col-span-2"
                        >
                          <option value="minutes">мин</option>
                          <option value="hours">час</option>
                          <option value="days">дн</option>
                        </select>
                      </div>
                      
                      <button
                        onClick={() => {
                          if (productForm.serviceDuration) {
                            const unitNames = { 'minutes': 'мин', 'hours': 'час', 'days': 'дн' };
                            const durationProperty = {
                              id: generateId(),
                              name: 'Продолжительность',
                              isFromModule: true,
                              values: [{ 
                                id: generateId(), 
                                name: `${productForm.serviceDuration} ${unitNames[productForm.serviceDurationUnit as keyof typeof unitNames] || 'мин'}`
                              }]
                            };
                            setProductForm((prev: any) => ({
                              ...prev,
                              attributes: prev.attributes.filter((attr: any) => attr.name !== 'Продолжительность').concat([durationProperty])
                            }));
                            alert(`✅ Продолжительность "${productForm.serviceDuration} ${unitNames[productForm.serviceDurationUnit as keyof typeof unitNames] || 'мин'}" добавлена в свойства товара!`);
                          } else {
                            alert('⚠️ Сначала укажите продолжительность услуги');
                          }
                        }}
                        className="ts-btn-primary w-full"
                      >
                        Добавить
                      </button>
                    </div>
                  </div>
                )}

                {/* Место оказания */}
                {productForm.modules?.serviceLocation && (
                  <div className="ts-card">
                    <div className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-4 h-4 text-purple-600" />
                        </div>
                        <h4 className="font-medium text-gray-900 leading-none">Место оказания</h4>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {[
                          { value: 'online', label: 'Онлайн' },
                          { value: 'office', label: 'В офисе' },
                          { value: 'client', label: 'У клиента' },
                          { value: 'hybrid', label: 'Гибридно' }
                        ].map(location => (
                          <button
                            key={location.value}
                            data-location={location.value}
                            onClick={(e) => {
                              document.querySelectorAll('[data-location]').forEach(el => {
                                el.classList.remove('ring-2', 'ring-purple-500', 'ring-offset-1', 'bg-purple-50', 'text-purple-700');
                              });
                              e.currentTarget.classList.add('ring-2', 'ring-purple-500', 'ring-offset-1', 'bg-purple-50', 'text-purple-700');
                              setProductForm((prev: any) => ({ ...prev, serviceLocation: location.value }));
                            }}
                            className="h-10 px-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md flex items-center justify-center font-medium text-gray-700 text-sm"
                          >
                            {location.label}
                          </button>
                        ))}
                      </div>
                      
                      <button
                        onClick={() => {
                          if (productForm.serviceLocation) {
                            const locationNames = {
                              'online': 'Онлайн',
                              'office': 'В офисе',
                              'client': 'У клиента',
                              'hybrid': 'Гибридно'
                            };
                            const locationProperty = {
                              id: generateId(),
                              name: 'Место оказания',
                              isFromModule: true,
                              values: [{ 
                                id: generateId(), 
                                name: locationNames[productForm.serviceLocation as keyof typeof locationNames] || productForm.serviceLocation
                              }]
                            };
                            setProductForm((prev: any) => ({
                              ...prev,
                              attributes: prev.attributes.filter((attr: any) => attr.name !== 'Место оказания').concat([locationProperty])
                            }));
                            alert(`✅ Место оказания "${locationNames[productForm.serviceLocation as keyof typeof locationNames]}" добавлено в свойства товара!`);
                          } else {
                            alert('⚠️ Сначала выберите место оказания услуги');
                          }
                        }}
                        className="ts-btn-primary w-full"
                      >
                        Добавить
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}

      {/* ==================== БИЛЕТЫ/СОБЫТИЯ ==================== */}
      {productForm.productType === 'ticket' && (
        <div className="ts-spacing-section">
          {/* Блок переключателей модулей */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-6 border border-gray-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-gray-700 rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-gray-800 font-semibold text-lg">Модули характеристик билетов/событий</h3>
                <p className="text-gray-600 text-sm">Включите нужные модули одним кликом - экономьте время создания!</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Дата события */}
              <div 
                className="bg-white border border-gray-200 rounded-xl p-4 cursor-pointer hover:bg-gray-50 transition-all duration-200"
                onClick={() => setProductForm((prev: any) => ({
                  ...prev,
                  modules: { ...prev.modules, eventDate: !prev.modules?.eventDate }
                }))}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="text-gray-800 font-medium">Дата события</h4>
                      <p className="text-gray-500 text-sm">Когда проходит</p>
                    </div>
                  </div>
                  <div className={`w-10 h-6 rounded-full transition-all duration-200 ${
                    productForm.modules?.eventDate ? 'bg-blue-500' : 'bg-gray-300'
                  }`}>
                    <div className={`w-4 h-4 bg-white rounded-full mt-1 transition-all duration-200 shadow-sm ${
                      productForm.modules?.eventDate ? 'ml-5' : 'ml-1'
                    }`}></div>
                  </div>
                </div>
              </div>
              
              {/* Время события */}
              <div 
                className="bg-white border border-gray-200 rounded-xl p-4 cursor-pointer hover:bg-gray-50 transition-all duration-200"
                onClick={() => setProductForm((prev: any) => ({
                  ...prev,
                  modules: { ...prev.modules, eventTime: !prev.modules?.eventTime }
                }))}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="text-gray-800 font-medium">Время события</h4>
                      <p className="text-gray-500 text-sm">Часы и минуты</p>
                    </div>
                  </div>
                  <div className={`w-10 h-6 rounded-full transition-all duration-200 ${
                    productForm.modules?.eventTime ? 'bg-blue-500' : 'bg-gray-300'
                  }`}>
                    <div className={`w-4 h-4 bg-white rounded-full mt-1 transition-all duration-200 shadow-sm ${
                      productForm.modules?.eventTime ? 'ml-5' : 'ml-1'
                    }`}></div>
                  </div>
                </div>
              </div>
              
              {/* Возрастные ограничения */}
              <div 
                className="bg-white border border-gray-200 rounded-xl p-4 cursor-pointer hover:bg-gray-50 transition-all duration-200"
                onClick={() => setProductForm((prev: any) => ({
                  ...prev,
                  modules: { ...prev.modules, ageRestrictions: !prev.modules?.ageRestrictions }
                }))}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Award className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="text-gray-800 font-medium">Возрастные ограничения</h4>
                      <p className="text-gray-500 text-sm">18+, 16+, 12+</p>
                    </div>
                  </div>
                  <div className={`w-10 h-6 rounded-full transition-all duration-200 ${
                    productForm.modules?.ageRestrictions ? 'bg-blue-500' : 'bg-gray-300'
                  }`}>
                    <div className={`w-4 h-4 bg-white rounded-full mt-1 transition-all duration-200 shadow-sm ${
                      productForm.modules?.ageRestrictions ? 'ml-5' : 'ml-1'
                    }`}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Формы настроек для включенных модулей */}
          {(productForm.modules?.eventDate || productForm.modules?.eventTime || productForm.modules?.ageRestrictions) && (
            <>
              <h3 className="ts-title-section mb-3">Настройки билета/события</h3>
              <p className="ts-text-meta mb-4">Настройте параметры мероприятия</p>
              
              <div className="ts-grid-main gap-4">
                {/* Дата события */}
                {productForm.modules?.eventDate && (
                  <div className="ts-card">
                    <div className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-4 h-4 text-blue-600" />
                        </div>
                        <h4 className="font-medium text-gray-900 leading-none">Дата события</h4>
                      </div>
                      
                      <input
                        type="date"
                        value={productForm.eventDate || ''}
                        onChange={(e) => setProductForm((prev: any) => ({ ...prev, eventDate: e.target.value }))}
                        className="ts-input w-full mb-4"
                      />
                      
                      <button
                        onClick={() => {
                          if (productForm.eventDate) {
                            const dateProperty = {
                              id: generateId(),
                              name: 'Дата события',
                              isFromModule: true,
                              values: [{ 
                                id: generateId(), 
                                name: new Date(productForm.eventDate).toLocaleDateString('ru-RU')
                              }]
                            };
                            setProductForm((prev: any) => ({
                              ...prev,
                              attributes: prev.attributes.filter((attr: any) => attr.name !== 'Дата события').concat([dateProperty])
                            }));
                            alert(`✅ Дата события "${new Date(productForm.eventDate).toLocaleDateString('ru-RU')}" добавлена в свойства товара!`);
                          } else {
                            alert('⚠️ Сначала выберите дату события');
                          }
                        }}
                        className="ts-btn-primary w-full"
                      >
                        Добавить
                      </button>
                    </div>
                  </div>
                )}

                {/* Время события */}
                {productForm.modules?.eventTime && (
                  <div className="ts-card">
                    <div className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Clock className="w-4 h-4 text-green-600" />
                        </div>
                        <h4 className="font-medium text-gray-900 leading-none">Время события</h4>
                      </div>
                      
                      <input
                        type="time"
                        value={productForm.eventTime || ''}
                        onChange={(e) => setProductForm((prev: any) => ({ ...prev, eventTime: e.target.value }))}
                        className="ts-input w-full mb-4"
                      />
                      
                      <button
                        onClick={() => {
                          if (productForm.eventTime) {
                            const timeProperty = {
                              id: generateId(),
                              name: 'Время события',
                              isFromModule: true,
                              values: [{ 
                                id: generateId(), 
                                name: productForm.eventTime
                              }]
                            };
                            setProductForm((prev: any) => ({
                              ...prev,
                              attributes: prev.attributes.filter((attr: any) => attr.name !== 'Время события').concat([timeProperty])
                            }));
                            alert(`✅ Время события "${productForm.eventTime}" добавлено в свойства товара!`);
                          } else {
                            alert('⚠️ Сначала выберите время события');
                          }
                        }}
                        className="ts-btn-primary w-full"
                      >
                        Добавить
                      </button>
                    </div>
                  </div>
                )}

                {/* Возрастные ограничения */}
                {productForm.modules?.ageRestrictions && (
                  <div className="ts-card">
                    <div className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Award className="w-4 h-4 text-orange-600" />
                        </div>
                        <h4 className="font-medium text-gray-900 leading-none">Возрастные ограничения</h4>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {[
                          { value: '0+', label: '0+' },
                          { value: '6+', label: '6+' },
                          { value: '12+', label: '12+' },
                          { value: '16+', label: '16+' },
                          { value: '18+', label: '18+' },
                          { value: '21+', label: '21+' }
                        ].map(age => (
                          <button
                            key={age.value}
                            data-age={age.value}
                            onClick={(e) => {
                              document.querySelectorAll('[data-age]').forEach(el => {
                                el.classList.remove('ring-2', 'ring-orange-500', 'ring-offset-1', 'bg-orange-50', 'text-orange-700');
                              });
                              e.currentTarget.classList.add('ring-2', 'ring-orange-500', 'ring-offset-1', 'bg-orange-50', 'text-orange-700');
                              setProductForm((prev: any) => ({ ...prev, ageRestrictions: age.value }));
                            }}
                            className="h-10 px-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md flex items-center justify-center font-medium text-gray-700 text-sm"
                          >
                            {age.label}
                          </button>
                        ))}
                      </div>
                      
                      <button
                        onClick={() => {
                          if (productForm.ageRestrictions) {
                            const ageProperty = {
                              id: generateId(),
                              name: 'Возрастные ограничения',
                              isFromModule: true,
                              values: [{ 
                                id: generateId(), 
                                name: productForm.ageRestrictions
                              }]
                            };
                            setProductForm((prev: any) => ({
                              ...prev,
                              attributes: prev.attributes.filter((attr: any) => attr.name !== 'Возрастные ограничения').concat([ageProperty])
                            }));
                            alert(`✅ Возрастные ограничения "${productForm.ageRestrictions}" добавлены в свойства товара!`);
                          } else {
                            alert('⚠️ Сначала выберите возрастные ограничения');
                          }
                        }}
                        className="ts-btn-primary w-full"
                      >
                        Добавить
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}

      {/* ==================== ПОДПИСКИ ==================== */}
      {productForm.productType === 'subscription' && (
        <div className="ts-spacing-section">
          {/* Блок переключателей модулей */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-6 border border-gray-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-gray-700 rounded-xl flex items-center justify-center">
                <Repeat className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-gray-800 font-semibold text-lg">Модули характеристик подписок</h3>
                <p className="text-gray-600 text-sm">Включите нужные модули одним кликом - экономьте время создания!</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Тип подписки */}
              <div 
                className="bg-white border border-gray-200 rounded-xl p-4 cursor-pointer hover:bg-gray-50 transition-all duration-200"
                onClick={() => setProductForm((prev: any) => ({
                  ...prev,
                  modules: { ...prev.modules, subscriptionType: !prev.modules?.subscriptionType }
                }))}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Repeat className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="text-gray-800 font-medium">Тип подписки</h4>
                      <p className="text-gray-500 text-sm">Месячная, годовая</p>
                    </div>
                  </div>
                  <div className={`w-10 h-6 rounded-full transition-all duration-200 ${
                    productForm.modules?.subscriptionType ? 'bg-blue-500' : 'bg-gray-300'
                  }`}>
                    <div className={`w-4 h-4 bg-white rounded-full mt-1 transition-all duration-200 shadow-sm ${
                      productForm.modules?.subscriptionType ? 'ml-5' : 'ml-1'
                    }`}></div>
                  </div>
                </div>
              </div>
              
              {/* Автопродление */}
              <div 
                className="bg-white border border-gray-200 rounded-xl p-4 cursor-pointer hover:bg-gray-50 transition-all duration-200"
                onClick={() => setProductForm((prev: any) => ({
                  ...prev,
                  modules: { ...prev.modules, autoRenewal: !prev.modules?.autoRenewal }
                }))}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="text-gray-800 font-medium">Автопродление</h4>
                      <p className="text-gray-500 text-sm">Автоматическое продление</p>
                    </div>
                  </div>
                  <div className={`w-10 h-6 rounded-full transition-all duration-200 ${
                    productForm.modules?.autoRenewal ? 'bg-blue-500' : 'bg-gray-300'
                  }`}>
                    <div className={`w-4 h-4 bg-white rounded-full mt-1 transition-all duration-200 shadow-sm ${
                      productForm.modules?.autoRenewal ? 'ml-5' : 'ml-1'
                    }`}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Формы настроек для включенных модулей */}
          {(productForm.modules?.subscriptionType || productForm.modules?.autoRenewal) && (
            <>
              <h3 className="ts-title-section mb-3">Настройки подписки</h3>
              <p className="ts-text-meta mb-4">Настройте параметры подписки</p>
              
              <div className="ts-grid-main gap-4">
                {/* Тип подписки */}
                {productForm.modules?.subscriptionType && (
                  <div className="ts-card">
                    <div className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Repeat className="w-4 h-4 text-indigo-600" />
                        </div>
                        <h4 className="font-medium text-gray-900 leading-none">Тип подписки</h4>
                      </div>
                      
                      <select
                        value={productForm.subscriptionType || 'monthly'}
                        onChange={(e) => setProductForm((prev: any) => ({ ...prev, subscriptionType: e.target.value }))}
                        className="ts-select w-full mb-4"
                      >
                        <option value="weekly">Еженедельная</option>
                        <option value="monthly">Месячная</option>
                        <option value="quarterly">Квартальная</option>
                        <option value="yearly">Годовая</option>
                        <option value="lifetime">Пожизненная</option>
                      </select>
                      
                      <button
                        onClick={() => {
                          const typeNames = {
                            'weekly': 'Еженедельная',
                            'monthly': 'Месячная',
                            'quarterly': 'Квартальная',
                            'yearly': 'Годовая',
                            'lifetime': 'Пожизненная'
                          };
                          const typeProperty = {
                            id: generateId(),
                            name: 'Тип подписки',
                            isFromModule: true,
                            values: [{ 
                              id: generateId(), 
                              name: typeNames[productForm.subscriptionType as keyof typeof typeNames] || productForm.subscriptionType
                            }]
                          };
                          setProductForm((prev: any) => ({
                            ...prev,
                            attributes: prev.attributes.filter((attr: any) => attr.name !== 'Тип подписки').concat([typeProperty])
                          }));
                          alert(`✅ Тип подписки "${typeNames[productForm.subscriptionType as keyof typeof typeNames]}" добавлен в свойства товара!`);
                        }}
                        className="ts-btn-primary w-full"
                      >
                        Добавить
                      </button>
                    </div>
                  </div>
                )}

                {/* Автопродление */}
                {productForm.modules?.autoRenewal && (
                  <div className="ts-card">
                    <div className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Users className="w-4 h-4 text-green-600" />
                        </div>
                        <h4 className="font-medium text-gray-900 leading-none">Автопродление</h4>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {[
                          { value: true, label: 'Включено' },
                          { value: false, label: 'Выключено' }
                        ].map(option => (
                          <button
                            key={option.value.toString()}
                            data-renewal={option.value.toString()}
                            onClick={(e) => {
                              document.querySelectorAll('[data-renewal]').forEach(el => {
                                el.classList.remove('ring-2', 'ring-green-500', 'ring-offset-1', 'bg-green-50', 'text-green-700');
                              });
                              e.currentTarget.classList.add('ring-2', 'ring-green-500', 'ring-offset-1', 'bg-green-50', 'text-green-700');
                              setProductForm((prev: any) => ({ ...prev, autoRenewal: option.value }));
                            }}
                            className="h-10 px-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md flex items-center justify-center font-medium text-gray-700 text-sm"
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                      
                      <button
                        onClick={() => {
                          const renewalProperty = {
                            id: generateId(),
                            name: 'Автопродление',
                            isFromModule: true,
                            values: [{ 
                              id: generateId(), 
                              name: productForm.autoRenewal ? 'Включено' : 'Выключено'
                            }]
                          };
                          setProductForm((prev: any) => ({
                            ...prev,
                            attributes: prev.attributes.filter((attr: any) => attr.name !== 'Автопродление').concat([renewalProperty])
                          }));
                          alert(`✅ Автопродление "${productForm.autoRenewal ? 'Включено' : 'Выключено'}" добавлено в свойства товара!`);
                        }}
                        className="ts-btn-primary w-full"
                      >
                        Добавить
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}; 