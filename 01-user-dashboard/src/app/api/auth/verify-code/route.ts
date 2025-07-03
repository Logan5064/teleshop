import { NextRequest, NextResponse } from 'next/server'

import { API_CONFIG } from '@/lib/config';
const BASE_URL = API_CONFIG.BASE_URL;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Проксируем запрос к Python backend
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code: body.code }),
    })

    const data = await response.json()

    if (response.ok) {
      // Создаем ответ с установкой cookies для сессии
      const nextResponse = NextResponse.json(data)
      
      // Устанавливаем HTTP-only cookie с токеном
      if (data.session_token) {
        nextResponse.cookies.set('session_token', data.session_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60 * 12, // 12 часов
        })
      }
      
      return nextResponse
    } else {
      return NextResponse.json(data, { status: response.status })
    }
  } catch (error) {
    console.error('Auth proxy error:', error)
    return NextResponse.json(
      { message: 'Ошибка подключения к серверу авторизации' },
      { status: 500 }
    )
  }
}
