import { NextRequest, NextResponse } from 'next/server'
import { API_CONFIG } from '@/lib/config'

export async function GET(request: NextRequest) {
  try {
    // Получаем токен из cookies (сначала session_token, потом admin_token)
    const sessionToken = request.cookies.get('session_token')?.value;
    const adminToken = request.cookies.get('admin_token')?.value;
    const token = sessionToken || adminToken;
    
    if (!token) {
      return NextResponse.json(
        { detail: 'Токен авторизации отсутствует' },
        { status: 401 }
      )
    }

    // Отправляем запрос на backend для проверки токена через cookies
    const backendResponse = await fetch(`${API_CONFIG.BASE_URL}/auth/check`, {
      method: 'GET',
      headers: {
        'Cookie': `${sessionToken ? 'session_token' : 'admin_token'}=${token}`,
        'Content-Type': 'application/json',
      },
    })

    if (!backendResponse.ok) {
      return NextResponse.json(
        { detail: 'Сессия истекла или недействительна' },
        { status: 401 }
      )
    }

    const data = await backendResponse.json()

    return NextResponse.json({
      valid: true,
      authenticated: data.authenticated,
      user_id: data.user_id,
      telegram_id: data.telegram_id,
      username: data.username,
      message: data.message
    })

  } catch (error) {
    console.error('Verify API error:', error)
    return NextResponse.json(
      { detail: 'Внутренняя ошибка сервера' },
      { status: 500 }
    )
  }
} 