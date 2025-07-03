import { NextRequest, NextResponse } from 'next/server'

/**
 * 🎨 Mock Constructor API Endpoints
 * Временные endpoints для тестирования интеграции конструктора
 * Порт: 3000 (вместо 8001)
 */

// Временное хранилище в памяти
let designs: any[] = []
let nextId = 1

// POST /api/constructor/designs - Создать дизайн
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const design = {
      id: nextId++,
      name: data.name || `Design ${Date.now()}`,
      user_id: data.user_id,
      telegram_id: data.telegram_id,
      blocks: data.blocks || [],
      metadata: data.metadata || {},
      is_published: data.is_published || false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    
    designs.push(design)
    
    console.log('🎨 Design created via Mock API:', {
      id: design.id,
      name: design.name,
      blocks_count: design.blocks.length,
      telegram_id: design.telegram_id
    })
    
    return NextResponse.json({
      design_id: design.id,
      message: "Дизайн успешно сохранен через Mock API",
      status: "success",
      blocks_count: design.blocks.length,
      api_type: "mock"
    })
    
  } catch (error) {
    console.error('❌ Mock API Error:', error)
    return NextResponse.json(
      { error: "Ошибка создания дизайна", details: String(error) },
      { status: 400 }
    )
  }
}

// GET /api/constructor/designs - Получить все дизайны  
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const telegram_id = searchParams.get('telegram_id')
  
  if (telegram_id) {
    // Фильтруем по пользователю
    const userDesigns = designs.filter(d => d.telegram_id === telegram_id)
    
    return NextResponse.json({
      telegram_id,
      count: userDesigns.length,
      designs: userDesigns,
      api_type: "mock"
    })
  }
  
  // Возвращаем все дизайны
  return NextResponse.json({
    total_designs: designs.length,
    designs: designs,
    api_type: "mock"
  })
} 