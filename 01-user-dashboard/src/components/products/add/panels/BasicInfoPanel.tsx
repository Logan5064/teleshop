import React from 'react';
import { PhotoIcon } from '@heroicons/react/24/outline';

interface BasicInfoPanelProps {
  productForm: any;
  setProductForm: (updater: (prev: any) => any) => void;
}

export const BasicInfoPanel = ({ productForm, setProductForm }: BasicInfoPanelProps) => {
  return (
    <div className="space-y-6 pb-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Название товара *</label>
          <input
            type="text"
            value={productForm.name}
            onChange={(e) => setProductForm(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
            placeholder="Введите название товара"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Единица измерения</label>
          <select
            value={productForm.unit}
            onChange={(e) => setProductForm(prev => ({ ...prev, unit: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
          >
            <option value="штука">Штука</option>
            <option value="упаковка">Упаковка</option>
            <option value="килограмм">Килограмм</option>
            <option value="литр">Литр</option>
            <option value="метр">Метр</option>
            <option value="комплект">Комплект</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Описание</label>
        <textarea
          rows={4}
          value={productForm.description}
          onChange={(e) => setProductForm(prev => ({ ...prev, description: e.target.value }))}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
          placeholder="Введите описание товара"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Изображения</label>
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-gray-400 transition-colors">
          <PhotoIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">Перетащите изображения сюда или</p>
          <button className="text-blue-600 hover:text-blue-700 font-medium">выберите файлы</button>
        </div>
      </div>
    </div>
  );
}; 