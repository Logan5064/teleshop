import { NextRequest, NextResponse } from 'next/server'

// Временное хранилище дизайнов (то же что в /api/designs/route.ts)
const designs = new Map<string, any>()

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params
    const shopId = params.id

    console.log(`🔍 Загрузка дизайна для магазина: ${shopId}`)

    const design = designs.get(shopId)

    if (!design) {
      console.log(`⚠️ Дизайн для магазина ${shopId} не найден`)
      return NextResponse.json(
        { error: 'Дизайн не найден' },
        { status: 404 }
      )
    }

    console.log(`✅ Дизайн найден для магазина ${shopId}:`, {
      blocksCount: design.blocks_data?.length || 0,
      colors: {
        primary: design.primary_color,
        secondary: design.secondary_color
      }
    })

    return NextResponse.json(design)

  } catch (error) {
    console.error('❌ Ошибка загрузки дизайна магазина:', error)
    return NextResponse.json(
      { error: 'Ошибка загрузки дизайна' },
      { status: 500 }
    )
  }
} 