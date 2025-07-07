import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    // Получаем токен из cookies
    const cookieStore = cookies();
    const sessionToken = cookieStore.get('session_token')?.value;
    
    if (!sessionToken) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Делаем запрос к основному API
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/auth/telegram-profile`, {
      headers: {
        'Authorization': `Bearer ${sessionToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        );
      }
      throw new Error(`API responded with status ${response.status}`);
    }

    const profileData = await response.json();
    return NextResponse.json(profileData);
    
  } catch (error) {
    console.error('Error in /api/auth/telegram-profile:', error);
    return NextResponse.json(
      { error: 'Failed to get Telegram profile' },
      { status: 500 }
    );
  }
} 