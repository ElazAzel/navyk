"use client";

import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();
  
  // Если мы находимся на защищенной странице, не показываем навбар
  if (pathname.startsWith('/students/') ||
      pathname.startsWith('/employers/') ||
      pathname.startsWith('/universities/')) {
    return null;
  }

  // Если мы находимся на странице демо-режима, также не показываем навбар
  if (pathname.startsWith('/dashboard/demo')) {
    return null;
  }

  return (
    <header className="py-3 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 sticky top-0 z-40">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
          NAVYK
        </Link>

        <nav className="flex-1 hidden md:flex justify-center">
          <ul className="flex space-x-8">
            <li>
              <Link 
                href="/" 
                className={`text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 ${
                  pathname === '/' ? 'text-indigo-600 dark:text-indigo-400 font-medium' : ''
                }`}
              >
                Главная
              </Link>
            </li>
            <li>
              <Link 
                href="/about" 
                className={`text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 ${
                  pathname === '/about' ? 'text-indigo-600 dark:text-indigo-400 font-medium' : ''
                }`}
              >
                О платформе
              </Link>
            </li>
            <li>
              <Link 
                href="/dashboard/demo" 
                className={`text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 ${
                  pathname === '/dashboard/demo' ? 'text-indigo-600 dark:text-indigo-400 font-medium' : ''
                }`}
              >
                Демо
              </Link>
            </li>
            <li>
              <Link 
                href="/contact" 
                className={`text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 ${
                  pathname === '/contact' ? 'text-indigo-600 dark:text-indigo-400 font-medium' : ''
                }`}
              >
                Контакты
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/login">Войти</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/signup">Регистрация</Link>
          </Button>
        </div>
      </div>
    </header>
  );
} 