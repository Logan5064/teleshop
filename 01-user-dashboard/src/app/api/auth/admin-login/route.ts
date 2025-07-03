import { NextRequest, NextResponse } from 'next/server'
import { API_CONFIG } from '@/lib/config'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    if (!password) {
      return NextResponse.json(
        { detail: 'Пароль обязателен' },
        { status: 400 }
      )
    }

          // Отправляем запрос на backend
      const backendResponse = await fetch(`${API_CONFIG.BACKEND_URL}/auth/admin-login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    })

    const data = await backendResponse.json()

    if (!backendResponse.ok) {
      return NextResponse.json(data, { status: backendResponse.status })
    }

    // Возвращаем данные авторизации
    return NextResponse.json({
      user: data.user || { 
        id: 0, 
        telegram_id: 'admin', 
        username: 'admin', 
        first_name: 'Администратор',
        last_name: null,
        subscription_plan: 'admin' 
      },
      admin_token: data.admin_token,
      expires_at: data.expires_at
    })

  } catch (error) {
    console.error('Admin login API error:', error)
    return NextResponse.json(
      { detail: 'Внутренняя ошибка сервера' },
      { status: 500 }
    )
  }
} 