import React from 'react';
import {
  RectangleStackIcon,
  SwatchIcon,
  CubeIcon,
  ScaleIcon,
  TagIcon,
  ShieldCheckIcon,
  Squares2X2Icon,
  PaintBrushIcon
} from '@heroicons/react/24/outline';

interface ProductModulesProps {
  productForm: any;
  setProductForm: any;
  generateId: () => string;
}

const ProductModulesV3: React.FC<ProductModulesProps> = ({ 
  productForm, 
  setProductForm, 
  generateId 
}) => {
  const modules = [
    {
      id: 'clothingSizes',
      title: 'Размеры одежды',
      description: 'XS, S, M, L, XL, XXL',
      icon: RectangleStackIcon,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-100/80',
      borderColor: 'border-blue-300/50',
      values: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      attributeName: 'Размер одежды'
    },
    {
      id: 'shoeSizes', 
      title: 'Размеры обуви',
      description: '35-46 (12 размеров)',
      icon: Squares2X2Icon,
      iconColor: 'text-orange-600',
      bgColor: 'bg-orange-100/80',
      borderColor: 'border-orange-300/50',
      values: Array.from({length: 12}, (_, i) => (i + 35).toString()),
      attributeName: 'Размер обуви'
    },
    {
      id: 'colors',
      title: 'Цвета',
      description: '18 основных + свои',
      icon: SwatchIcon,
      iconColor: 'text-pink-600',
      bgColor: 'bg-pink-100/80',
      borderColor: 'border-pink-300/50',
      values: [],
      attributeName: 'Цвет'
    },
    {
      id: 'materials',
      title: 'Материал',
      description: '10 базовых + свои',
      icon: CubeIcon,
      iconColor: 'text-amber-600',
      bgColor: 'bg-amber-100/80',
      borderColor: 'border-amber-300/50',
      values: ['Хлопок', 'Полиэстер', 'Кожа', 'Замша', 'Дерево', 'Металл', 'Пластик', 'Стекло', 'Керамика', 'Резина'],
      attributeName: 'Материал'
    },
    {
      id: 'weight',
      title: 'Вес товара',
      description: 'Для расчета доставки',
      icon: ScaleIcon,
      iconColor: 'text-green-600',
      bgColor: 'bg-emerald-100/80',
      borderColor: 'border-emerald-300/50'
    },
    {
      id: 'dimensions',
      title: 'Габариты',
      description: 'Ширина × Длина × Высота',
      icon: RectangleStackIcon,
      iconColor: 'text-purple-600',
      bgColor: 'bg-violet-100/80',
      borderColor: 'border-violet-300/50'
    },
    {
      id: 'condition',
      title: 'Состояние',
      description: 'Для маркетплейсов',
      icon: TagIcon,
      iconColor: 'text-gray-600',
      bgColor: 'bg-gray-200/80',
      borderColor: 'border-gray-300/50'
    },
    {
      id: 'warranty',
      title: 'Гарантия',
      description: 'Срок в месяцах',
      icon: ShieldCheckIcon,
      iconColor: 'text-indigo-600',
      bgColor: 'bg-indigo-100/80',
      borderColor: 'border-indigo-300/50'
    }
  ];

  const handleModuleToggle = (moduleId: any, module: any) => {
    const enabled = !productForm.modules?.[moduleId];
    setProductForm((prev: any) => ({ 
      ...prev, 
      modules: { ...prev.modules, [moduleId]: enabled }
    }));

    // Автоматически создаем вариации для модулей с предустановленными значениями
    if (enabled && module.values && module.values.length > 0) {
      const attribute = {
        id: generateId(),
        name: module.attributeName,
        values: module.values.map((value: any) => ({ id: generateId(), name: value }))
      };
      
      setProductForm((prev: any) => ({
        ...prev,
        hasVariations: true,
        attributes: prev.attributes.filter((attr: any) => attr.name !== module.attributeName).concat([attribute])
      }));
    }
  };

  return (
    <div className="space-y-6">
      {/* Переключатели модулей */}
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-gray-300/60 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center">
            <PaintBrushIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="text-xl font-semibold text-gray-800 tracking-tight">Модули характеристик товара</h4>
            <p className="text-sm font-medium text-gray-600">Включите нужные модули одним кликом - экономьте время создания!</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {modules.map((module) => {
            const isActive = productForm.modules?.[module.id];
            const IconComponent = module.icon;
            
            return (
              <div 
                key={module.id}
                className="bg-gray-100/70 hover:bg-gray-200/80 rounded-xl transition-all duration-200 border border-gray-300/60 hover:border-gray-400/70 backdrop-blur-sm cursor-pointer p-4"
                onClick={() => handleModuleToggle(module.id, module)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${isActive ? module.bgColor : 'bg-gray-200/80'} rounded-lg flex items-center justify-center border ${isActive ? module.borderColor : 'border-gray-300/50'}`}>
                      <IconComponent className={`w-5 h-5 ${isActive ? module.iconColor : 'text-gray-600'}`} />
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-800 text-sm tracking-tight">{module.title}</h5>
                      <p className="text-xs text-gray-600">{module.description}</p>
                    </div>
                  </div>
                  
                  <div className="relative flex-shrink-0">
                    <label 
                      className="relative inline-flex items-center cursor-pointer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="checkbox"
                        checked={isActive}
                        onChange={() => handleModuleToggle(module.id, module)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Формы настроек для включенных модулей */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Вес товара */}
        {productForm.modules?.weight && (
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-gray-300/60 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-emerald-100/80 rounded-lg flex items-center justify-center border border-emerald-300/50">
                <ScaleIcon className="w-5 h-5 text-green-600" />
              </div>
              <h4 className="font-medium text-gray-900 leading-none">Вес товара</h4>
            </div>
            <div className="grid grid-cols-5 gap-2">
              <input
                type="number"
                placeholder="Введите вес"
                value={productForm.weight}
                onChange={(e) => setProductForm((prev: any) => ({ ...prev, weight: e.target.value }))}
                className="col-span-4 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <select
                value={productForm.weightUnit}
                onChange={(e) => setProductForm((prev: any) => ({ ...prev, weightUnit: e.target.value }))}
                className="col-span-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="kg">кг</option>
                <option value="g">г</option>
                <option value="lb">фунт</option>
              </select>
            </div>
          </div>
        )}

        {/* Состояние товара */}
        {productForm.modules?.condition && (
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-gray-300/60 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gray-200/80 rounded-lg flex items-center justify-center border border-gray-300/50">
                <TagIcon className="w-5 h-5 text-gray-600" />
              </div>
              <h4 className="font-medium text-gray-900 leading-none">Состояние</h4>
            </div>
            <select
              value={productForm.condition}
              onChange={(e) => setProductForm((prev: any) => ({ ...prev, condition: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="new">Новое</option>
              <option value="like-new">Как новое</option>
              <option value="good">Хорошее</option>
              <option value="acceptable">Приемлемое</option>
              <option value="worn">Изношенное</option>
            </select>
          </div>
        )}

        {/* Гарантия */}
        {productForm.modules?.warranty && (
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-gray-300/60 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-indigo-100/80 rounded-lg flex items-center justify-center border border-indigo-300/50">
                <ShieldCheckIcon className="w-5 h-5 text-indigo-600" />
              </div>
              <h4 className="font-medium text-gray-900 leading-none">Гарантия</h4>
            </div>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Срок"
                value={productForm.warrantyMonths}
                onChange={(e) => setProductForm((prev: any) => ({ ...prev, warrantyMonths: e.target.value }))}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <span className="px-3 py-2 text-gray-600 text-sm">месяцев</span>
            </div>
          </div>
        )}

        {/* Габариты */}
        {productForm.modules?.dimensions && (
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-gray-300/60 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-violet-100/80 rounded-lg flex items-center justify-center border border-violet-300/50">
                <RectangleStackIcon className="w-5 h-5 text-purple-600" />
              </div>
              <h4 className="font-medium text-gray-900 leading-none">Габариты</h4>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <input
                type="number"
                placeholder="Ш"
                value={productForm.dimensions.width}
                onChange={(e) => setProductForm((prev: any) => ({ 
                  ...prev, 
                  dimensions: { ...prev.dimensions, width: e.target.value }
                }))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <input
                type="number"
                placeholder="Д"
                value={productForm.dimensions.length}
                onChange={(e) => setProductForm((prev: any) => ({ 
                  ...prev, 
                  dimensions: { ...prev.dimensions, length: e.target.value }
                }))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <input
                type="number"
                placeholder="В"
                value={productForm.dimensions.height}
                onChange={(e) => setProductForm((prev: any) => ({ 
                  ...prev, 
                  dimensions: { ...prev.dimensions, height: e.target.value }
                }))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
            <div className="mt-2">
              <select
                value={productForm.dimensionUnit}
                onChange={(e) => setProductForm((prev: any) => ({ ...prev, dimensionUnit: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="cm">см</option>
                <option value="mm">мм</option>
                <option value="inch">дюйм</option>
              </select>
            </div>
          </div>
        )}

        {/* Цвета */}
        {productForm.modules?.colors && (
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-gray-300/60 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-pink-100/80 rounded-lg flex items-center justify-center border border-pink-300/50">
                <SwatchIcon className="w-5 h-5 text-pink-600" />
              </div>
              <h4 className="font-medium text-gray-900 leading-none">Цвета</h4>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {[
                { name: 'Красный', color: 'bg-red-500' },
                { name: 'Синий', color: 'bg-blue-500' },
                { name: 'Зеленый', color: 'bg-green-500' },
                { name: 'Желтый', color: 'bg-yellow-500' },
                { name: 'Розовый', color: 'bg-pink-500' },
                { name: 'Фиолетовый', color: 'bg-purple-500' },
                { name: 'Оранжевый', color: 'bg-orange-500' },
                { name: 'Коричневый', color: 'bg-amber-700' },
                { name: 'Серый', color: 'bg-gray-500' },
                { name: 'Черный', color: 'bg-black' },
                { name: 'Белый', color: 'bg-white border-gray-300' },
                { name: 'Бежевый', color: 'bg-amber-100' },
                { name: 'Золотой', color: 'bg-yellow-400' },
                { name: 'Серебряный', color: 'bg-gray-300' },
                { name: 'Бирюзовый', color: 'bg-teal-500' },
                { name: 'Индиго', color: 'bg-indigo-500' },
                { name: 'Лайм', color: 'bg-lime-500' },
                { name: 'Мятный', color: 'bg-emerald-400' }
              ].map((colorOption) => (
                <button
                  key={colorOption.name}
                  onClick={() => {
                    const isSelected = productForm.color === colorOption.name;
                    setProductForm((prev: any) => ({ 
                      ...prev, 
                      color: isSelected ? '' : colorOption.name 
                    }));
                  }}
                  className={`w-8 h-8 rounded-lg border-2 transition-all ${
                    productForm.color === colorOption.name 
                      ? 'border-gray-800 scale-110' 
                      : 'border-gray-300 hover:border-gray-400'
                  } ${colorOption.color}`}
                  title={colorOption.name}
                />
              ))}
            </div>
          </div>
        )}

        {/* Материалы */}
        {productForm.modules?.materials && (
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-gray-300/60 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-amber-100/80 rounded-lg flex items-center justify-center border border-amber-300/50">
                <CubeIcon className="w-5 h-5 text-amber-600" />
              </div>
              <h4 className="font-medium text-gray-900 leading-none">Материал</h4>
            </div>
            <select
              value={productForm.material || ''}
              onChange={(e) => setProductForm((prev: any) => ({ ...prev, material: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Выберите материал</option>
              <option value="cotton">Хлопок</option>
              <option value="polyester">Полиэстер</option>
              <option value="leather">Кожа</option>
              <option value="suede">Замша</option>
              <option value="wood">Дерево</option>
              <option value="metal">Металл</option>
              <option value="plastic">Пластик</option>
              <option value="glass">Стекло</option>
              <option value="ceramic">Керамика</option>
              <option value="rubber">Резина</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductModulesV3; 