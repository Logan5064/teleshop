import { Pool } from 'pg';

// Создаем пул подключений к PostgreSQL
const pool = new Pool({
  host: 'ladixoofilad.beget.app',
  port: 5432,
  database: 'ladixoofilad_teleshop',
  user: 'ladixoofilad_teleshop',
  password: 'Qq123456',
  ssl: false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Функция для выполнения запросов
export async function query(text: string, params?: any[]) {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } finally {
    client.release();
  }
}

// Функция для получения списка всех таблиц
export async function getAllTables() {
  const result = await query(`
    SELECT 
      schemaname,
      tablename,
      tableowner
    FROM pg_catalog.pg_tables 
    WHERE schemaname NOT IN ('information_schema', 'pg_catalog')
    ORDER BY schemaname, tablename;
  `);
  return result.rows;
}

// Функция для получения структуры таблицы
export async function getTableStructure(tableName: string) {
  const result = await query(`
    SELECT 
      column_name,
      data_type,
      is_nullable,
      column_default,
      character_maximum_length
    FROM information_schema.columns 
    WHERE table_name = $1
    ORDER BY ordinal_position;
  `, [tableName]);
  return result.rows;
}

// Функция для получения данных из таблицы
export async function getTableData(tableName: string, limit: number = 10) {
  const result = await query(`SELECT * FROM ${tableName} LIMIT $1`, [limit]);
  return result.rows;
}

export default pool; 