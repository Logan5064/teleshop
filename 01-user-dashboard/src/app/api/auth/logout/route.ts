import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const authorization = request.headers.get('authorization')
    
    if (authorization && authorization.startsWith('Bearer ')) {
      const token = authorization.slice(7)

              // Отправляем запрос на backend для инвалидации токена
        try {
          await fetch(`${API_CONFIG.BACKEND_API_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
      } catch {
        // Игнорируем ошибки backend, главное - ответить клиенту
      }
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Logout API error:', error)
    return NextResponse.json(
      { detail: 'Внутренняя ошибка сервера' },
      { status: 500 }
    )
  }
} 