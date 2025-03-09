"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import Link from "next/link";
import { UserIcon, AcademicCapIcon, BuildingOfficeIcon } from "@heroicons/react/24/outline";
import { useRouter, useSearchParams } from "next/navigation";
import { setAuthToken } from "../../lib/security/auth-utils";

// Функция для создания демо-токена
const createDemoToken = (role: string) => {
  // Создаем фиктивные данные пользователя
  const demoUser = {
    id: `demo-${role}-${Date.now()}`,
    name: `Demo ${role === 'student' ? 'student' : role === 'employer' ? 'employer' : 'university'}`,
    email: `demo-${role}@navyk.kz`,
    role: role,
    // Специальный флаг, указывающий, что это демо-пользователь
    isDemo: true,
    // Устанавливаем срок жизни демо-сессии на 30 минут
    exp: Math.floor(Date.now() / 1000) + 30 * 60
  };

  try {
    // Используем только btoa без дополнительного кодирования
    return btoa(JSON.stringify(demoUser));
  } catch (error) {
    console.error('Ошибка создания демо-токена:', error);
    // Fallback метод, если btoa не справляется с UTF-8 символами
    return btoa(unescape(encodeURIComponent(JSON.stringify(demoUser))));
  }
};

export default function DemoPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Автоматическое перенаправление, если указан параметр роли
  useEffect(() => {
    const role = searchParams.get('role');
    const redirect = searchParams.get('redirect');
    
    if (role && ['student', 'employer', 'university', 'mentor'].includes(role)) {
      handleDemoAccess(role, redirect);
    }
  }, [searchParams]);

  const getRedirectUrl = (role: string, redirectParam?: string | null): string => {
    // Если указан параметр redirect, используем его
    if (redirectParam) {
      return redirectParam;
    }

    // Иначе используем стандартное перенаправление по роли
    switch (role) {
      case 'student':
        return '/students/profile';
      case 'employer':
        return '/employers/dashboard';
      case 'university':
        return '/universities/dashboard';
      case 'mentor':
        return '/mentors/dashboard';
      default:
        return '/';
    }
  };

  const handleDemoAccess = (role: string, redirectParam?: string | null) => {
    try {
      setIsLoading(role);
      setError(null);
      console.log(`Начало создания демо-доступа для роли: ${role}`);

      // Создаем демо-токен для выбранной роли
      const demoToken = createDemoToken(role);
      console.log(`Демо-токен создан: ${demoToken.substring(0, 20)}...`);

      // Устанавливаем токен в cookie
      setAuthToken(demoToken);
      console.log(`Токен установлен в cookie`);

      // Получаем URL для перенаправления
      const redirectUrl = getRedirectUrl(role, redirectParam);
      console.log(`Ожидание перед перенаправлением на ${redirectUrl}...`);

      // Увеличиваем задержку перед редиректом до 2 секунд
      setTimeout(() => {
        console.log(`Перенаправление на: ${redirectUrl}`);
        router.push(redirectUrl);
      }, 2000);
    } catch (error) {
      console.error("Ошибка при создании демо-доступа:", error);
      setError(`Произошла ошибка при создании демо-доступа. Пожалуйста, попробуйте снова.`);
      setIsLoading(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500 dark:from-indigo-400 dark:to-blue-300">
            Демо-режим
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300">
            Выберите тип пользователя для демонстрации интерфейса
          </p>
          
          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-800 rounded-lg">
              {error}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="relative overflow-hidden transition-all hover:shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
              <CardTitle className="flex items-center gap-2">
                <UserIcon className="w-6 h-6" />
                Студент
              </CardTitle>
              <CardDescription className="text-white text-opacity-80">
                Демонстрация интерфейса студента
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="bg-green-100 text-green-800 rounded-full p-1">✓</span>
                  Карьерная дорожная карта
                </li>
                <li className="flex items-center gap-2">
                  <span className="bg-green-100 text-green-800 rounded-full p-1">✓</span>
                  Рекомендации мероприятий
                </li>
                <li className="flex items-center gap-2">
                  <span className="bg-green-100 text-green-800 rounded-full p-1">✓</span>
                  Аналитика навыков
                </li>
              </ul>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button
                className="w-full"
                onClick={() => handleDemoAccess('student')}
                disabled={isLoading !== null}
              >
                {isLoading === 'student' ? 'Загрузка...' : 'Войти как студент'}
              </Button>
              <div className="w-full flex gap-2 text-xs">
                <Link 
                  href="/dashboard/demo?role=student&redirect=/students/profile" 
                  className="flex-1 text-center py-1 px-2 bg-gray-50 dark:bg-gray-800 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Профиль
                </Link>
                <Link 
                  href="/dashboard/demo?role=student&redirect=/students/events" 
                  className="flex-1 text-center py-1 px-2 bg-gray-50 dark:bg-gray-800 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Мероприятия
                </Link>
                <Link 
                  href="/dashboard/demo?role=student&redirect=/students/courses" 
                  className="flex-1 text-center py-1 px-2 bg-gray-50 dark:bg-gray-800 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Курсы
                </Link>
              </div>
            </CardFooter>
          </Card>

          <Card className="relative overflow-hidden transition-all hover:shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">
              <CardTitle className="flex items-center gap-2">
                <BuildingOfficeIcon className="w-6 h-6" />
                Работодатель
              </CardTitle>
              <CardDescription className="text-white text-opacity-80">
                Демонстрация интерфейса работодателя
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="bg-green-100 text-green-800 rounded-full p-1">✓</span>
                  Управление вакансиями
                </li>
                <li className="flex items-center gap-2">
                  <span className="bg-green-100 text-green-800 rounded-full p-1">✓</span>
                  Аналитика кандидатов
                </li>
                <li className="flex items-center gap-2">
                  <span className="bg-green-100 text-green-800 rounded-full p-1">✓</span>
                  Отчеты по найму
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full"
                onClick={() => handleDemoAccess('employer')}
                disabled={isLoading !== null}
              >
                {isLoading === 'employer' ? 'Загрузка...' : 'Войти как работодатель'}
              </Button>
            </CardFooter>
          </Card>

          <Card className="relative overflow-hidden transition-all hover:shadow-lg">
            <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-600 text-white">
              <CardTitle className="flex items-center gap-2">
                <AcademicCapIcon className="w-6 h-6" />
                Университет
              </CardTitle>
              <CardDescription className="text-white text-opacity-80">
                Демонстрация интерфейса университета
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="bg-green-100 text-green-800 rounded-full p-1">✓</span>
                  Демографическая аналитика
                </li>
                <li className="flex items-center gap-2">
                  <span className="bg-green-100 text-green-800 rounded-full p-1">✓</span>
                  Статистика трудоустройства
                </li>
                <li className="flex items-center gap-2">
                  <span className="bg-green-100 text-green-800 rounded-full p-1">✓</span>
                  Анализ мероприятий
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full"
                onClick={() => handleDemoAccess('university')}
                disabled={isLoading !== null}
              >
                {isLoading === 'university' ? 'Загрузка...' : 'Войти как университет'}
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Демо-режим предоставляет доступ к ограниченному функционалу. 
            Для полного доступа, пожалуйста, зарегистрируйтесь.
          </p>
          <Button variant="outline" asChild>
            <Link href="/">Вернуться на главную</Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 