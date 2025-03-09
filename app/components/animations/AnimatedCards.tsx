"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface AnimatedFeatureCardProps {
  index: number;
  icon: ReactNode;
  title: string;
  description: string;
  linkText: string;
  linkUrl: string;
}

export function AnimatedFeatureCard({ index, icon, title, description, linkText, linkUrl }: AnimatedFeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
      viewport={{ once: true, margin: "-100px" }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow"
    >
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{description}</p>
      <Link 
        href={linkUrl} 
        className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
      >
        {linkText}
        <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </Link>
    </motion.div>
  );
}

interface AnimatedDemoCardProps {
  index: number;
  icon: ReactNode;
  title: string;
  description: string;
  linkUrl: string;
  color: string;
  features?: string[];
}

export function AnimatedDemoCard({ index, icon, title, description, linkUrl, color, features }: AnimatedDemoCardProps) {
  // Создаем токен непосредственно в компоненте
  const handleDemoAccess = async (url: string) => {
    try {
      // Определяем роль на основе URL
      const role = getDemoRole(url);
      
      // Перенаправляем на страницу генерации демо-токена с указанной ролью
      window.location.href = `/dashboard/demo?role=${role}`;
    } catch (error) {
      console.error('Ошибка при генерации демо-доступа:', error);
    }
  };

  // Извлекаем роль из URL
  const getDemoRole = (url: string): string => {
    if (url.includes('/students/')) return 'student';
    if (url.includes('/employers/')) return 'employer';
    if (url.includes('/universities/')) return 'university';
    if (url.includes('/mentors/')) return 'mentor';
    return 'student'; // По умолчанию студент
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
      viewport={{ once: true, margin: "-100px" }}
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 group hover:shadow-xl transition-shadow"
    >
      <div className={`h-3 bg-gradient-to-r ${color}`}></div>
      <div className="p-6">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{description}</p>
        
        {features && features.length > 0 && (
          <ul className="space-y-2 mb-6">
            {features.map((feature, i) => (
              <motion.li 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 + i * 0.1 + 0.4 }}
                viewport={{ once: true }}
                className="flex items-center text-gray-700 dark:text-gray-300"
              >
                <svg className="w-4 h-4 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {feature}
              </motion.li>
            ))}
          </ul>
        )}
        
        <button
          onClick={() => handleDemoAccess(linkUrl)}
          className="inline-block w-full py-2 text-center bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          Посмотреть демо
        </button>
      </div>
    </motion.div>
  );
}

interface AnimatedTestimonialCardProps {
  index: number;
  quote: string;
  author: string;
  role: string;
}

export function AnimatedTestimonialCard({ index, quote, author, role }: AnimatedTestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
      viewport={{ once: true, margin: "-100px" }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
    >
      <svg className="w-8 h-8 text-indigo-500 mb-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>
      <p className="text-gray-700 dark:text-gray-300 mb-4">{quote}</p>
      <div className="flex items-center">
        <div className="ml-0">
          <p className="font-medium text-gray-900 dark:text-white">{author}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>
        </div>
      </div>
    </motion.div>
  );
} 