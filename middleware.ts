import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { PROTECTED_ROUTES, ROUTES } from './lib/routes'
import { isTokenValid, isDemoToken, getRoleFromDemoToken } from './app/lib/security/auth-utils'

export function middleware(request: NextRequest) {
  // Получаем текущий путь
  const path = request.nextUrl.pathname
  console.log(`Middleware: проверка доступа к пути ${path}`);

  // Пропускаем путь демо-страницы
  if (path.startsWith('/dashboard/demo')) {
    console.log('Middleware: путь демо-страницы, пропускаем проверку');
    return NextResponse.next();
  }

  // Проверяем, является ли путь защищенным
  const isProtectedRoute = Object.keys(PROTECTED_ROUTES).some(route =>
    path.startsWith(route)
  );

  if (!isProtectedRoute) {
    console.log('Middleware: путь не защищен, пропускаем проверку');
    return NextResponse.next()
  }

  console.log(`Middleware: путь ${path} защищен, проверяем токен`);

  // Получаем токен из куки
  const token = request.cookies.get('navyk_auth_token')?.value
  console.log(`Middleware: токен ${token ? 'найден' : 'не найден'}`);

  // Проверяем, является ли токен демо-токеном
  const isDemo = isDemoToken(token);
  console.log(`Middleware: токен ${isDemo ? 'является' : 'не является'} демо-токеном`);

  if (isDemo) {
    // Для демо-токена проверяем соответствие роли маршруту
    const role = getRoleFromDemoToken(token);
    console.log(`Middleware: роль из демо-токена: ${role || 'не определена'}`);

    // Получаем требуемые роли для текущего маршрута
    let requiredRoles: Array<string> = [];

    // Проходим по всем защищенным маршрутам и проверяем соответствие текущему пути
    Object.entries(PROTECTED_ROUTES).forEach(([route, roles]) => {
      if (path.startsWith(route)) {
        // Преобразуем readonly массив в изменяемый массив
        requiredRoles = [...roles];
        console.log(`Middleware: для пути ${path} требуются роли: ${requiredRoles.join(', ')}`);
      }
    });

    // Проверяем, есть ли роль пользователя в списке требуемых ролей
    if (role && requiredRoles.includes(role)) {
      console.log(`Middleware: роль ${role} имеет доступ к пути ${path}`);
      return NextResponse.next();
    } else {
      // Если роль не соответствует, перенаправляем на главную
      console.log(`Middleware: роль ${role} не имеет доступа к пути ${path}, перенаправляем на главную`);
      const loginUrl = new URL(ROUTES.HOME, request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Если токен обычный (не демо), проверяем его валидность
  console.log(`Middleware: проверяем валидность обычного токена`);
  if (!token || !isTokenValid(token)) {
    console.log(`Middleware: токен невалиден, перенаправляем на главную`);
    const loginUrl = new URL(ROUTES.HOME, request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Здесь можно добавить дополнительную проверку роли пользователя
  // на основе декодированного токена
  console.log(`Middleware: токен валиден, разрешаем доступ к ${path}`);
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