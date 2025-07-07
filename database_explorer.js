const { Pool } = require('pg');

// Подключение к PostgreSQL с правильными данными
const pool = new Pool({
  host: 'ladixoofilad.beget.app',
  port: 5432,
  database: 'default_db',
  user: 'cloud_user',
  password: 'u61e&ke&!Ty1',
  ssl: false,
});

async function exploreDatabase() {
  try {
    console.log('🔍 Подключаемся к базе данных...');
    
    // Тест подключения
    const testResult = await pool.query('SELECT NOW()');
    console.log('✅ Подключение успешно!', testResult.rows[0]);
    
    // Получаем список всех таблиц
    const tablesResult = await pool.query(`
      SELECT 
        schemaname,
        tablename,
        tableowner
      FROM pg_catalog.pg_tables 
      WHERE schemaname NOT IN ('information_schema', 'pg_catalog')
      ORDER BY schemaname, tablename;
    `);
    
    console.log(`\n📋 Найдено таблиц: ${tablesResult.rows.length}`);
    console.log('=' .repeat(80));
    
    // Анализируем каждую таблицу
    for (const table of tablesResult.rows) {
      console.log(`\n📊 ТАБЛИЦА: ${table.tablename}`);
      console.log('-'.repeat(50));
      
      try {
        // Получаем структуру таблицы
        const structureResult = await pool.query(`
          SELECT 
            column_name,
            data_type,
            is_nullable,
            column_default,
            character_maximum_length
          FROM information_schema.columns 
          WHERE table_name = $1
          ORDER BY ordinal_position;
        `, [table.tablename]);
        
        console.log('📝 Структура:');
        structureResult.rows.forEach(col => {
          const nullable = col.is_nullable === 'YES' ? 'NULL' : 'NOT NULL';
          const length = col.character_maximum_length ? `(${col.character_maximum_length})` : '';
          console.log(`  - ${col.column_name}: ${col.data_type}${length} ${nullable}`);
        });
        
        // Получаем количество записей
        const countResult = await pool.query(`SELECT COUNT(*) as count FROM ${table.tablename}`);
        console.log(`📊 Количество записей: ${countResult.rows[0].count}`);
        
        // Получаем примеры данных (первые 3 записи)
        if (parseInt(countResult.rows[0].count) > 0) {
          const sampleResult = await pool.query(`SELECT * FROM ${table.tablename} LIMIT 3`);
          console.log('📋 Примеры данных:');
          sampleResult.rows.forEach((row, index) => {
            console.log(`  Запись ${index + 1}:`, JSON.stringify(row, null, 2));
          });
        } else {
          console.log('📋 Таблица пустая');
        }
        
      } catch (error) {
        console.error(`❌ Ошибка при анализе таблицы ${table.tablename}:`, error.message);
      }
    }
    
    console.log('\n✅ Анализ базы данных завершен!');
    
  } catch (error) {
    console.error('❌ Ошибка подключения к базе данных:', error.message);
    console.error('Детали ошибки:', error);
  } finally {
    await pool.end();
  }
}

// Запускаем анализ
exploreDatabase(); 