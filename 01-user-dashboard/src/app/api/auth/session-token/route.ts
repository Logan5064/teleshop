import { NextResponse } from 'next/server';

// GET /api/auth/session-token - проверка токена сессии
export async function GET(request: Request) {
  try {
    const authToken = request.headers.get('Authorization');
    
    if (!authToken || !authToken.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }
    
    const token = authToken.substring(7); // Remove 'Bearer ' prefix
    
    // Простая проверка токена (для демо)
    if (token === 'demo_token' || token.length > 10) {
      return NextResponse.json({ 
        valid: true, 
        user: { id: 'demo_user', username: 'demo_user' }
      });
    }
    
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  } catch (error) {
    console.error('Session token error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/auth/session-token - создание нового токена
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { telegramId, username } = body;
    
    if (!telegramId) {
      return NextResponse.json({ error: 'Telegram ID required' }, { status: 400 });
    }
    
    // Генерируем простой токен (для демо)
    const sessionToken = `session_${telegramId}_${Date.now()}`;
    
    return NextResponse.json({
      success: true,
      token: sessionToken,
      user: { id: telegramId, username: username || 'demo_user' }
    });
  } catch (error) {
    console.error('Session token creation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 