import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { PROTECTED_ROUTES, ROUTES } from './lib/routes'
import { isTokenValid } from './app/lib/security/auth-utils'

export function middleware(request: NextRequest) {
  // Получаем текущий путь
  const path = request.nextUrl.pathname

  // Проверяем, является ли путь защищенным
  const isProtectedRoute = Object.keys(PROTECTED_ROUTES).some(route =>
    path.startsWith(route)
  )

  if (!isProtectedRoute) {
    return NextResponse.next()
  }

  // Получаем токен из куки
  const token = request.cookies.get('navyk_auth_token')?.value

  // Если нет токена или токен невалиден, редиректим на главную
  if (!token || !isTokenValid(token)) {
    const loginUrl = new URL(ROUTES.HOME, request.url)
    return NextResponse.redirect(loginUrl)
  }

  // Здесь можно добавить дополнительную проверку роли пользователя
  // на основе декодированного токена

  return NextResponse.next()
}

// Конфигурация: указываем, для каких путей срабатывает middleware
export const config = {
  matcher: [
    '/students/:path*',
    '/employers/:path*',
    '/universities/:path*',
    '/mentors/:path*',
    '/admin/:path*',
  ],
} 