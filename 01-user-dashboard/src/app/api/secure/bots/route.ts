import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export async function GET(request: NextRequest) {
  try {
    // Получаем токен из cookies
    const cookieStore = cookies()
    const sessionToken = cookieStore.get('session_token')?.value
    
    if (!sessionToken) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Делаем запрос к основному API
    const response = await fetch(`${API_BASE_URL}/secure/bots`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${sessionToken}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorData = await response.text()
      return NextResponse.json(
        { error: 'Failed to fetch bots', details: errorData },
        { status: response.status }
      )
    }

    const bots = await response.json()
    return NextResponse.json(bots)
    
  } catch (error) {
    console.error('Error in /api/secure/bots GET:', error)
    return NextResponse.json(
      { error: 'Failed to fetch bots' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Получаем токен из cookies
    const cookieStore = cookies()
    const sessionToken = cookieStore.get('session_token')?.value
    
    if (!sessionToken) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Получаем данные бота из запроса
    const botData = await request.json()
    
    console.log('🤖 Creating bot with data:', botData)

    // Делаем запрос к основному API
    const response = await fetch(`${API_BASE_URL}/secure/bots`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${sessionToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(botData),
    })

    const responseText = await response.text()
    console.log('🔧 Backend response:', response.status, responseText)

    if (!response.ok) {
      let errorData
      try {
        errorData = JSON.parse(responseText)
      } catch {
        errorData = { error: responseText }
      }
      
      return NextResponse.json(
        { error: 'Failed to create bot', details: errorData },
        { status: response.status }
      )
    }

    const newBot = JSON.parse(responseText)
    console.log('✅ Bot created successfully:', newBot)
    return NextResponse.json(newBot)
    
  } catch (error: any) {
    console.error('Error in /api/secure/bots POST:', error)
    return NextResponse.json(
      { error: 'Failed to create bot', details: error.message },
      { status: 500 }
    )
  }
} 