import { NextRequest, NextResponse } from 'next/server'

// Конфигурация API
const API_BASE_URL = 'http://localhost:8000'

export async function GET(request: NextRequest) {
  try {
    const authorization = request.headers.get('authorization')
    
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return NextResponse.json(
        { detail: 'Токен авторизации отсутствует' },
        { status: 401 }
      )
    }

    const token = authorization.slice(7) // Remove 'Bearer '

    // Отправляем запрос на backend для проверки токена
    const backendResponse = await fetch(`${API_BASE_URL}/auth/check`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })

    if (!backendResponse.ok) {
      return NextResponse.json(
        { detail: 'Токен недействителен' },
        { status: 401 }
      )
    }

    const data = await backendResponse.json()

    return NextResponse.json({
      valid: true,
      user: data.user
    })

  } catch (error) {
    console.error('Verify API error:', error)
    return NextResponse.json(
      { detail: 'Внутренняя ошибка сервера' },
      { status: 500 }
    )
  }
} 