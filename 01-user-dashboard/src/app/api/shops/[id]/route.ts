import { NextRequest, NextResponse } from 'next/server'

// Временные данные магазинов (позже заменим на БД)
const shops = new Map<string, any>([
  ['1', {
    id: '1',
    name: 'Тестовый магазин',
    description: 'Описание тестового магазина',
    owner_id: 'test_user',
    bot_token: 'test_token',
    is_active: true,
    created_at: new Date().toISOString()
  }]
])

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params
    const shopId = params.id
    console.log(`🔍 Загрузка данных магазина: ${shopId}`)

    let shop = shops.get(shopId)

    if (!shop) {
      // Создаем магазин на лету если его нет
      shop = {
        id: shopId,
        name: `Магазин ${shopId}`,
        description: 'Описание магазина',
        owner_id: 'demo_user',
        bot_token: 'demo_token',
        is_active: true,
        created_at: new Date().toISOString()
      }
      shops.set(shopId, shop)
      console.log(`✅ Создан новый магазин: ${shopId}`)
    }

    return NextResponse.json(shop)

  } catch (error) {
    console.error('❌ Ошибка загрузки данных магазина:', error)
    return NextResponse.json(
      { error: 'Ошибка загрузки данных магазина' },
      { status: 500 }
    )
  }
} 