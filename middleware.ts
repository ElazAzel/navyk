import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { PROTECTED_ROUTES, ROUTES } from './lib/routes'
import { isTokenValid, isDemoToken, getRoleFromDemoToken } from './app/lib/security/auth-utils'

export function middleware(request: NextRequest) {
  // Получаем текущий путь
  const path = request.nextUrl.pathname

  // Пропускаем путь демо-страницы
  if (path.startsWith('/dashboard/demo')) {
    return NextResponse.next();
  }

  // Проверяем, является ли путь защищенным
  const isProtectedRoute = Object.keys(PROTECTED_ROUTES).some(route =>
    path.startsWith(route)
  );

  if (!isProtectedRoute) {
    return NextResponse.next()
  }

  // Получаем токен из куки
  const token = request.cookies.get('navyk_auth_token')?.value

  // Проверяем, является ли токен демо-токеном
  const isDemo = isDemoToken(token);

  if (isDemo) {
    // Для демо-токена проверяем соответствие роли маршруту
    const role = getRoleFromDemoToken(token);
    
    // Получаем требуемые роли для текущего маршрута
    let requiredRoles: Array<string> = [];
    
    // Проходим по всем защищенным маршрутам и проверяем соответствие текущему пути
    Object.entries(PROTECTED_ROUTES).forEach(([route, roles]) => {
      if (path.startsWith(route)) {
        // Преобразуем readonly массив в изменяемый массив
        requiredRoles = [...roles];
      }
    });

    // Проверяем, есть ли роль пользователя в списке требуемых ролей
    if (role && requiredRoles.includes(role)) {
      return NextResponse.next();
    } else {
      // Если роль не соответствует, перенаправляем на главную
      const loginUrl = new URL(ROUTES.HOME, request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Если токен обычный (не демо), проверяем его валидность
  if (!token || !isTokenValid(token)) {
    const loginUrl = new URL(ROUTES.HOME, request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Здесь можно добавить дополнительную проверку роли пользователя
  // на основе декодированного токена

  return NextResponse.next();
}

// Конфигурация: указываем, для каких путей срабатывает middleware
export const config = {
  matcher: [
    '/students/:path*',
    '/employers/:path*',
    '/universities/:path*',
    '/mentors/:path*',
    '/admin/:path*',
    '/dashboard/demo/:path*',
  ],
} 