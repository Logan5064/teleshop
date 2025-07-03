import { NextRequest, NextResponse } from 'next/server'

// Пока будем хранить дизайны в памяти (позже заменим на БД)
const designs = new Map<string, any>()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { shopId, userId, blocks, colors, name } = body

    if (!shopId || !blocks) {
      return NextResponse.json(
        { error: 'shopId и blocks обязательны' },
        { status: 400 }
      )
    }

    const designId = `${shopId}_${Date.now()}`
    const design = {
      id: designId,
      shop_id: shopId,
      user_id: userId,
      name: name || 'Новый дизайн',
      blocks_data: blocks, // Новый формат из конструктора
      primary_color: colors?.primary || '#007bff',
      secondary_color: colors?.secondary || '#6c757d',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    designs.set(shopId, design)

    console.log(`✅ Дизайн сохранен для магазина ${shopId}:`, {
      blocksCount: blocks.length,
      colors: colors
    })

    return NextResponse.json({
      success: true,
      design_id: designId,
      message: 'Дизайн успешно сохранен'
    })

  } catch (error) {
    console.error('❌ Ошибка сохранения дизайна:', error)
    return NextResponse.json(
      { error: 'Ошибка сохранения дизайна' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'userId обязателен' },
        { status: 400 }
      )
    }

    // Возвращаем все дизайны пользователя
    const userDesigns = Array.from(designs.values()).filter(
      design => design.user_id === userId
    )

    return NextResponse.json(userDesigns)

  } catch (error) {
    console.error('❌ Ошибка загрузки дизайнов:', error)
    return NextResponse.json(
      { error: 'Ошибка загрузки дизайнов' },
      { status: 500 }
    )
  }
} 