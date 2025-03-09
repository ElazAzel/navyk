"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-6 bg-muted">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">NAVYK</h3>
            <p className="text-sm text-muted-foreground">
              Платформа для развития навыков и карьеры, соединяющая студентов, работодателей и университеты.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Для студентов</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/dashboard/demo?role=student" className="hover:underline">Профиль</Link></li>
              <li><Link href="/dashboard/demo?role=student" className="hover:underline">Рекомендации</Link></li>
              <li><Link href="/dashboard/demo?role=student" className="hover:underline">Мероприятия</Link></li>
              <li><Link href="/dashboard/demo?role=student" className="hover:underline">Курсы</Link></li>
              <li><Link href="/dashboard/demo?role=student" className="hover:underline">Достижения</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Для партнеров</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/dashboard/demo?role=employer" className="hover:underline">Работодателям</Link></li>
              <li><Link href="/dashboard/demo?role=university" className="hover:underline">Университетам</Link></li>
              <li><Link href="/dashboard/demo?role=mentor" className="hover:underline">Менторам</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Ресурсы</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/policy" className="hover:underline">Политика конфиденциальности</Link></li>
              <li><Link href="/terms" className="hover:underline">Условия использования</Link></li>
              <li><Link href="/faq" className="hover:underline">Часто задаваемые вопросы</Link></li>
              <li><Link href="/contact" className="hover:underline">Связаться с нами</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border pt-6 text-center text-muted-foreground text-sm">
          © {new Date().getFullYear()} NAVYK. Все права защищены.
        </div>
      </div>
    </footer>
  );
} 