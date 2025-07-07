import { NextResponse } from 'next/server';
import { getAllTables, getTableStructure, getTableData } from '@/lib/database';

export async function GET() {
  try {
    console.log('🔍 Connecting to database...');
    
    // Получаем список всех таблиц
    const tables = await getAllTables();
    console.log('📋 Found tables:', tables.length);
    
    // Получаем структуру и данные для каждой таблицы
    const tablesWithData = await Promise.all(
      tables.map(async (table) => {
        try {
          const [structure, data] = await Promise.all([
            getTableStructure(table.tablename),
            getTableData(table.tablename, 5) // Берем только 5 записей для примера
          ]);
          
          return {
            name: table.tablename,
            schema: table.schemaname,
            owner: table.tableowner,
            structure,
            sampleData: data,
            recordCount: data.length
          };
        } catch (error: any) {
          console.error(`Error processing table ${table.tablename}:`, error);
          return {
            name: table.tablename,
            schema: table.schemaname,
            owner: table.tableowner,
            structure: [],
            sampleData: [],
            recordCount: 0,
            error: error.message
          };
        }
      })
    );
    
    console.log('✅ Database analysis complete');
    
    return NextResponse.json({
      success: true,
      totalTables: tables.length,
      tables: tablesWithData
    });
    
  } catch (error: any) {
    console.error('❌ Database error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: error.message,
        details: error.stack
      },
      { status: 500 }
    );
  }
} 