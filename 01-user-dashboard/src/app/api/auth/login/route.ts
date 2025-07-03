import { NextRequest, NextResponse } from 'next/server'
import { API_CONFIG } from '@/lib/config'

function logRequest(request: NextRequest, details: string) {
  const timestamp = new Date().toISOString()
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
  const userAgent = request.headers.get('user-agent') || 'unknown'
  
  console.log(`[${timestamp}] 🌐 FRONTEND API REQUEST | ${details} | IP: ${ip} | UA: ${userAgent.substring(0, 50)}...`)
}

function logError(error: any, context: string) {
  const timestamp = new Date().toISOString()
  console.error(`[${timestamp}] ❌ FRONTEND API ERROR | Context: ${context}`)
  console.error(`  Error type: ${error.constructor.name}`)
  console.error(`  Error message: ${error.message}`)
  console.error(`  Stack trace:`, error.stack)
}

export async function POST(request: NextRequest) {
  const startTime = Date.now()
  
  try {
    logRequest(request, 'LOGIN ATTEMPT | POST /api/auth/login')
    
    const { code } = await request.json()
    console.log(`🔑 LOGIN REQUEST | Code provided: ${code ? 'YES' : 'NO'} | Code length: ${code?.length || 0}`)

    if (!code) {
      console.log(`❌ LOGIN FAILED | Reason: Missing code`)
      return NextResponse.json(
        { detail: 'Код авторизации обязателен' },
        { status: 400 }
      )
    }

    console.log(`🌐 REAL AUTH | Code: ${code} | Отправляем на backend: ${API_CONFIG.BASE_URL}`)

    // Реальный запрос к backend API main_secure.py
    const backendResponse = await fetch(`${API_CONFIG.BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    })

    const responseTime = Date.now() - startTime
    console.log(`📡 BACKEND RESPONSE | Status: ${backendResponse.status} | Time: ${responseTime}ms`)

    const data = await backendResponse.json()
    console.log(`📋 BACKEND DATA | Success: ${data.success} | Message: ${data.message}`)

    if (!backendResponse.ok) {
      console.log(`❌ LOGIN FAILED | Backend status: ${backendResponse.status} | Detail: ${data.detail}`)
      return NextResponse.json(data, { status: backendResponse.status })
    }

    console.log(`✅ LOGIN SUCCESS | Session token length: ${data.session_token?.length} | Expires in: ${data.expires_in}s`)

    // Создаем ответ с установкой cookie
    const response = NextResponse.json({
      success: true,
      session_token: data.session_token,
      expires_in: data.expires_in,
      message: data.message
    })

    // Устанавливаем session_token в cookies
    if (data.session_token) {
      const expires = new Date()
      expires.setSeconds(expires.getSeconds() + (data.expires_in || 86400)) // 24 часа по умолчанию
      
      response.cookies.set('session_token', data.session_token, {
        httpOnly: false, // Разрешаем доступ из JavaScript для отладки
        secure: false,   // Для localhost не требуется HTTPS
        sameSite: 'lax',
        expires: expires,
        path: '/'
      })
      
      console.log(`🍪 COOKIE SET | session_token cookie установлен | Expires: ${expires.toISOString()}`)
    }

    return response

    } catch (error: any) {
    const responseTime = Date.now() - startTime
    logError(error, `REAL AUTH ERROR | Time: ${responseTime}ms`)
    
    return NextResponse.json(
      { 
        detail: 'Ошибка подключения к серверу авторизации',
        error_type: 'connection_error'
      },
      { status: 500 }
    )
  }
} 
