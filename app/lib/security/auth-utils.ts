import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

// Константы для работы с куки
const TOKEN_NAME = 'navyk_auth_token';
const TOKEN_MAX_AGE = 60 * 60 * 24 * 7; // 7 дней в секундах

/**
 * Сохраняет токен в куки
 */
export function setAuthToken(token: string): void {
  // Для клиентских компонентов
  if (typeof document !== 'undefined') {
    // Установка безопасного куки (HttpOnly, Secure, SameSite=Strict)
    document.cookie = `${TOKEN_NAME}=${token}; max-age=${TOKEN_MAX_AGE}; path=/; samesite=strict; ${process.env.NODE_ENV === 'production' ? 'secure;' : ''} httponly`;
  }
}

/**
 * Получает токен из куки на клиенте
 */
export function getAuthToken(): string | null {
  // Для клиентских компонентов
  if (typeof document !== 'undefined') {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === TOKEN_NAME) {
        return value;
      }
    }
  }
  return null;
}

/**
 * Удаляет токен из куки
 */
export function removeAuthToken(): void {
  // Для клиентских компонентов
  if (typeof document !== 'undefined') {
    document.cookie = `${TOKEN_NAME}=; max-age=0; path=/`;
  }
}

/**
 * Добавляет токен в куки для ответа (серверная сторона)
 */
export function setTokenCookie(response: NextResponse, token: string): NextResponse {
  response.cookies.set({
    name: TOKEN_NAME,
    value: token,
    maxAge: TOKEN_MAX_AGE,
    path: '/',
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true
  });
  
  return response;
}

/**
 * Получает токен из куки запроса (серверная сторона)
 */
export function getTokenFromRequest(request: NextRequest): string | undefined {
  return request.cookies.get(TOKEN_NAME)?.value;
}

/**
 * Удаляет токен из куки для ответа (серверная сторона)
 */
export function removeTokenCookie(response: NextResponse): NextResponse {
  response.cookies.set({
    name: TOKEN_NAME,
    value: '',
    maxAge: 0,
    path: '/'
  });
  
  return response;
}

/**
 * Проверяет валидность JWT токена (упрощенная версия)
 */
export function isTokenValid(token: string | undefined | null): boolean {
  if (!token) return false;
  
  try {
    // Простая проверка на структуру JWT (header.payload.signature)
    const parts = token.split('.');
    return parts.length === 3;
    
    // В реальном приложении здесь должна быть полная валидация JWT
    // с проверкой подписи и срока истечения
  } catch (error) {
    console.error('Ошибка при проверке токена:', error);
    return false;
  }
}

/**
 * Проверяет, является ли токен демо-токеном
 */
export function isDemoToken(token: string | undefined | null): boolean {
  if (!token) return false;
  
  try {
    // Для демо-токенов мы используем простое кодирование base64
    // вместо полноценного JWT
    const decodedData = JSON.parse(atob(token));
    
    // Проверяем, есть ли флаг isDemo и не истек ли срок действия
    return (
      decodedData.isDemo === true && 
      decodedData.exp && 
      decodedData.exp > Math.floor(Date.now() / 1000)
    );
  } catch (error) {
    console.error('Ошибка при проверке демо-токена:', error);
    return false;
  }
}

/**
 * Получает роль из демо-токена
 */
export function getRoleFromDemoToken(token: string | undefined | null): string | null {
  if (!token) return null;
  
  try {
    const decodedData = JSON.parse(atob(token));
    return decodedData.role || null;
  } catch (error) {
    console.error('Ошибка при получении роли из демо-токена:', error);
    return null;
  }
} 