'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { shopsApi } from '@/lib/api';
import type { Shop } from '@/types';
import { formatDate, formatCurrency } from '@/lib/utils';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  BuildingStorefrontIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

export default function ShopsPage() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        setIsLoading(true);
        const data = await shopsApi.getAll();
        setShops(data);
      } catch (err) {
        setError('Ошибка загрузки магазинов');
        console.error('Error fetching shops:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchShops();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm('Вы уверены, что хотите удалить этот магазин?')) {
      try {
        await shopsApi.delete(id);
        setShops(shops.filter(shop => shop.id !== id));
      } catch (err) {
        alert('Ошибка при удалении магазина');
      }
    }
  };

  const toggleStatus = async (shop: Shop) => {
    try {
      const updatedShop = await shopsApi.update(shop.id, {
        is_active: !shop.is_active
      });
      setShops(shops.map(s => s.id === shop.id ? updatedShop : s));
    } catch (err) {
      alert('Ошибка при изменении статуса');
    }
  };

  if (error) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 lg:ml-64">
          <div className="p-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600">{error}</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 lg:ml-64 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Категории</h1>
              <p className="text-gray-600 mt-2">
                Управление категориями товаров в системе
              </p>
            </div>
            <button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2 shadow-lg">
              <PlusIcon className="w-5 h-5" />
              <span>Создать магазин</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Всего магазинов</p>
                  <p className="text-2xl font-semibold text-gray-900">{shops.length}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <BuildingStorefrontIcon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Активные</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {shops.filter(s => s.is_active).length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <CheckCircleIcon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Неактивные</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {shops.filter(s => !s.is_active).length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                  <XCircleIcon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Список магазинов</h3>
            </div>
            
            {isLoading ? (
              <div className="p-8">
                <div className="animate-pulse space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : shops.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Магазин
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Владелец
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Статус
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Создан
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Действия
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {shops.map((shop) => (
                      <tr key={shop.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {shop.name}
                            </div>
                            {shop.description && (
                              <div className="text-sm text-gray-500">
                                {shop.description.length > 50 
                                  ? shop.description.substring(0, 50) + '...'
                                  : shop.description
                                }
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {shop.owner?.first_name} {shop.owner?.last_name}
                          </div>
                          <div className="text-sm text-gray-500">
                            @{shop.owner?.username || 'unknown'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => toggleStatus(shop)}
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              shop.is_active
                                ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                : 'bg-red-100 text-red-800 hover:bg-red-200'
                            } transition-colors cursor-pointer`}
                          >
                            {shop.is_active ? 'Активен' : 'Неактивен'}
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(shop.created_at)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end space-x-2">
                            <button className="text-indigo-600 hover:text-indigo-900 p-1 hover:bg-indigo-50 rounded">
                              <EyeIcon className="w-4 h-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-900 p-1 hover:bg-green-50 rounded">
                              <PencilIcon className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDelete(shop.id)}
                              className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded"
                            >
                              <TrashIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-8 text-center">
                <p className="text-gray-500">Магазины не найдены</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 