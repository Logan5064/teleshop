import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Защищенные маршруты, требующие авторизации
const protectedRoutes = [
  '/',
  '/dashboard', 
  '/bots',
  '/shops',
  '/products',
  '/orders',
  '/design-showcase',
  '/blocks-library',
  '/analytics',
  '/users',
  '/categories',
  '/profile',
  '/settings',
  '/constructor'
]

// Публичные маршруты, доступные без авторизации
const publicRoutes = [
  '/login',
  '/auth'
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  console.log('🛡️ MIDDLEWARE: processing', pathname)
  
  // Редирект с /constructor/page на /constructor
  if (pathname === '/constructor/page') {
    console.log('🛡️ MIDDLEWARE: redirecting from /constructor/page to /constructor')
    return NextResponse.redirect(new URL('/constructor', request.url))
  }
  
  // Пропускаем API маршруты
  if (pathname.startsWith('/api/')) {
    console.log('🛡️ MIDDLEWARE: skipping API route')
    return NextResponse.next()
  }
  
  // Проверяем наличие токена авторизации
  const sessionToken = request.cookies.get('session_token')?.value
  const adminToken = request.cookies.get('admin_token')?.value || 
                    request.headers.get('Authorization')?.replace('Bearer ', '')
  
  // Дополнительная информация о cookies и headers
  const allCookies = request.cookies.getAll();
  const authHeader = request.headers.get('Authorization');
  
  console.log('🛡️ MIDDLEWARE: detailed check', {
    pathname,
    sessionToken: sessionToken ? sessionToken.substring(0, 20) + '...' : 'NONE',
    adminToken: adminToken ? adminToken.substring(0, 20) + '...' : 'NONE',
    authHeader: authHeader ? authHeader.substring(0, 30) + '...' : 'NONE',
    totalCookies: allCookies.length,
    cookieNames: allCookies.map(c => c.name).join(', ')
  })
  
  const isAuthenticated = !!(sessionToken || adminToken)
  const isProtectedRoute = protectedRoutes.includes(pathname)
  const isPublicRoute = publicRoutes.includes(pathname)
  
  console.log('🛡️ MIDDLEWARE: route checks', {
    isAuthenticated,
    isProtectedRoute, 
    isPublicRoute,
    pathname
  })
  
  // Если пользователь авторизован и пытается попасть на логин - редирект на дашборд  
  if (isAuthenticated && isPublicRoute) {
    console.log('🛡️ MIDDLEWARE: AUTH USER ON PUBLIC -> redirect to /')
    return NextResponse.redirect(new URL('/', request.url))
  }
  
  // Если пользователь не авторизован и пытается попасть на защищенный маршрут - редирект на логин
  if (!isAuthenticated && isProtectedRoute) {
    console.log('🛡️ MIDDLEWARE: UNAUTH USER ON PROTECTED -> redirect to /login')
    console.log('🛡️ FORCING REDIRECT due to no auth tokens')
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }
  
  console.log('🛡️ MIDDLEWARE: PASS THROUGH')
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 