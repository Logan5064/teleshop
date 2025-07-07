import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const sessionToken = cookieStore.get('session_token')?.value;
    
    if (!sessionToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const url = new URL(request.url);
    const shop_id = url.searchParams.get('shop_id');
    
    if (!shop_id) {
      return NextResponse.json({ error: 'shop_id is required' }, { status: 400 });
    }

    // Получаем пользователей бота с бэкенда
    const response = await fetch(`http://localhost:8000/secure/bot-users?shop_id=${shop_id}`, {
      headers: {
        'Authorization': `Bearer ${sessionToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json({ error: error.detail || 'Failed to fetch bot users' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Error fetching bot users:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 