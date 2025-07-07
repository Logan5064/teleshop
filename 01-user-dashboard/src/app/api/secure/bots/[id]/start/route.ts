import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

interface RouteParams {
  params: {
    id: string
  }
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const cookieStore = cookies()
    const sessionToken = cookieStore.get('session_token')?.value
    
    if (!sessionToken) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const response = await fetch(`${API_BASE_URL}/secure/bots/${params.id}/start`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${sessionToken}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorData = await response.text()
      return NextResponse.json(
        { error: 'Failed to start bot', details: errorData },
        { status: response.status }
      )
    }

    const result = await response.json()
    return NextResponse.json(result)
    
  } catch (error: any) {
    console.error('Error in /api/secure/bots/[id]/start POST:', error)
    return NextResponse.json(
      { error: 'Failed to start bot' },
      { status: 500 }
    )
  }
} 