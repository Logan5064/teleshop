'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '@/components/Sidebar';
import { CompactCardSkeleton, ContentLoader } from '@/components/LoadingStates';
import {
  TableCellsIcon,
  EyeIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CircleStackIcon
} from '@heroicons/react/24/outline';

interface TableInfo {
  name: string;
  schema: string;
  owner: string;
  structure: Array<{
    column_name: string;
    data_type: string;
    is_nullable: string;
    column_default: string;
    character_maximum_length: number;
  }>;
  sampleData: Array<any>;
  recordCount: number;
  error?: string;
}

interface DatabaseResponse {
  success: boolean;
  totalTables: number;
  tables: TableInfo[];
  error?: string;
}

export default function DatabasePage() {
  const [data, setData] = useState<DatabaseResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedTables, setExpandedTables] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadDatabaseInfo();
  }, []);

  const loadDatabaseInfo = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/database/tables');
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to load database info');
      }
      
      setData(result);
    } catch (err: any) {
      console.error('Error loading database info:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleTable = (tableName: string) => {
    const newExpanded = new Set(expandedTables);
    if (newExpanded.has(tableName)) {
      newExpanded.delete(tableName);
    } else {
      newExpanded.add(tableName);
    }
    setExpandedTables(newExpanded);
  };

  if (loading) {
    return (
      <div className="ts-page-bg">
        <div className="flex h-screen">
          <Sidebar />
          <main className="ts-main-content">
            <div className="ts-container">
              <div className="p-6 w-full">
                <div className="flex items-center justify-between mb-8">
                  <div className="h-9 bg-gray-200 rounded w-48 animate-pulse"></div>
                  <div className="flex space-x-4">
                    <div className="h-10 bg-gray-200 rounded-xl w-24 animate-pulse"></div>
                    <div className="h-10 bg-gray-200 rounded-xl w-24 animate-pulse"></div>
                  </div>
                </div>

                <div className="space-y-6">
                  {[...Array(5)].map((_, i) => (
                    <CompactCardSkeleton key={i} />
                  ))}
                </div>

                <div className="mt-8">
                  <ContentLoader text="Загружаем структуру базы данных..." />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ts-page-bg">
        <div className="flex h-screen">
          <Sidebar />
          <main className="ts-main-content">
            <div className="ts-container">
              <div className="p-6 w-full">
                <h1 className="text-3xl font-semibold text-gray-800 tracking-tight mb-8">База данных</h1>
                <div className="bg-red-50/50 border border-red-200/60 rounded-2xl p-8">
                  <div className="flex items-center mb-4">
                    <CircleStackIcon className="w-8 h-8 text-red-500 mr-4" />
                    <h3 className="text-xl font-semibold text-red-900">Ошибка подключения</h3>
                  </div>
                  <p className="text-red-600 mb-4">{error}</p>
                  <button
                    onClick={loadDatabaseInfo}
                    className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
                  >
                    Попробовать снова
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="ts-page-bg">
      <div className="flex h-screen">
        <Sidebar />
        <main className="ts-main-content">
          <div className="ts-container">
            <div className="p-6 w-full">
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-semibold text-gray-800 tracking-tight">База данных</h1>
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100/80 px-4 py-2 rounded-xl">
                    <span className="text-blue-800 font-medium">
                      {data?.totalTables || 0} таблиц
                    </span>
                  </div>
                  <button
                    onClick={loadDatabaseInfo}
                    className="px-4 py-2 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors"
                  >
                    Обновить
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {data?.tables.map((table, index) => (
                  <motion.div
                    key={table.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/95 backdrop-blur-sm rounded-2xl border border-gray-300/60 shadow-sm"
                  >
                    <div
                      className="p-6 cursor-pointer hover:bg-gray-50/50 transition-colors"
                      onClick={() => toggleTable(table.name)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-100/80 rounded-xl flex items-center justify-center">
                            <TableCellsIcon className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900">{table.name}</h3>
                            <p className="text-gray-600">
                              {table.structure.length} колонок • {table.recordCount} записей
                            </p>
                            {table.error && (
                              <p className="text-red-600 text-sm mt-1">Ошибка: {table.error}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {expandedTables.has(table.name) ? (
                            <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      </div>
                    </div>

                    {expandedTables.has(table.name) && !table.error && (
                      <div className="border-t border-gray-200/60 p-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          {/* Структура таблицы */}
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-4">Структура</h4>
                            <div className="overflow-x-auto">
                              <table className="min-w-full">
                                <thead>
                                  <tr className="border-b border-gray-200/60">
                                    <th className="text-left py-2 px-3 text-sm font-medium text-gray-600">Колонка</th>
                                    <th className="text-left py-2 px-3 text-sm font-medium text-gray-600">Тип</th>
                                    <th className="text-left py-2 px-3 text-sm font-medium text-gray-600">Null</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {table.structure.map((column, i) => (
                                    <tr key={i} className="border-b border-gray-100/60">
                                      <td className="py-2 px-3 text-sm font-medium text-gray-900">
                                        {column.column_name}
                                      </td>
                                      <td className="py-2 px-3 text-sm text-gray-600">
                                        {column.data_type}
                                        {column.character_maximum_length && `(${column.character_maximum_length})`}
                                      </td>
                                      <td className="py-2 px-3 text-sm text-gray-600">
                                        {column.is_nullable === 'YES' ? 'Да' : 'Нет'}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>

                          {/* Примеры данных */}
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-4">Примеры данных</h4>
                            {table.sampleData.length > 0 ? (
                              <div className="bg-gray-50/50 rounded-xl p-4 max-h-96 overflow-auto">
                                <pre className="text-sm text-gray-700">
                                  {JSON.stringify(table.sampleData, null, 2)}
                                </pre>
                              </div>
                            ) : (
                              <p className="text-gray-500 italic">Нет данных</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 
