import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

interface RouteParams {
  params: {
    id: string
  }
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const cookieStore = cookies()
    const sessionToken = cookieStore.get('session_token')?.value
    
    if (!sessionToken) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const response = await fetch(`${API_BASE_URL}/secure/bots/${params.id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${sessionToken}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorData = await response.text()
      return NextResponse.json(
        { error: 'Failed to fetch bot', details: errorData },
        { status: response.status }
      )
    }

    const bot = await response.json()
    return NextResponse.json(bot)
    
  } catch (error: any) {
    console.error('Error in /api/secure/bots/[id] GET:', error)
    return NextResponse.json(
      { error: 'Failed to fetch bot' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const cookieStore = cookies()
    const sessionToken = cookieStore.get('session_token')?.value
    
    if (!sessionToken) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const botData = await request.json()

    const response = await fetch(`${API_BASE_URL}/secure/bots/${params.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${sessionToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(botData),
    })

    if (!response.ok) {
      const errorData = await response.text()
      return NextResponse.json(
        { error: 'Failed to update bot', details: errorData },
        { status: response.status }
      )
    }

    const updatedBot = await response.json()
    return NextResponse.json(updatedBot)
    
  } catch (error: any) {
    console.error('Error in /api/secure/bots/[id] PUT:', error)
    return NextResponse.json(
      { error: 'Failed to update bot' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const cookieStore = cookies()
    const sessionToken = cookieStore.get('session_token')?.value
    
    if (!sessionToken) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const response = await fetch(`${API_BASE_URL}/secure/bots/${params.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${sessionToken}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorData = await response.text()
      return NextResponse.json(
        { error: 'Failed to delete bot', details: errorData },
        { status: response.status }
      )
    }

    return NextResponse.json({ message: 'Bot deleted successfully' })
    
  } catch (error: any) {
    console.error('Error in /api/secure/bots/[id] DELETE:', error)
    return NextResponse.json(
      { error: 'Failed to delete bot' },
      { status: 500 }
    )
  }
} 