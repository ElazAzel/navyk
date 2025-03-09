"use client";

import { Button } from "./components/ui/button";
import Link from "next/link";
import { UserIcon, AcademicCapIcon, BuildingOfficeIcon, UserGroupIcon, ShieldCheckIcon, ChartBarIcon, ChartPieIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import { Badge } from "./components/ui/badge";
import { motion } from "framer-motion";
import Footer from "./components/Footer";

// Импортируем анимированные компоненты
import { 
  AnimatedBackground,
  AnimatedDemoChart,
  AnimatedStatistics,
  AnimatedFeatureCard, 
  AnimatedDemoCard, 
  AnimatedTestimonialCard,
  AnimatedTextChanger
} from "./components/animations";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero section с анимированным фоном */}
      <section className="min-h-screen relative flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
        {/* Анимированный фон в стиле Apple */}
        <AnimatedBackground />
        
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500 dark:from-indigo-400 dark:to-blue-300">
                NAVYK
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-700 dark:text-gray-300 leading-relaxed flex items-center justify-center flex-wrap gap-2">
                Аналитика <AnimatedTextChanger /> для студентов и работодателей
              </p>
              <div className="flex gap-4 flex-wrap justify-center">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Button asChild size="lg" className="rounded-full px-8">
                    <Link href="/signup">Начать бесплатно</Link>
                  </Button>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                    <Link href="/dashboard/demo">Демо</Link>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
          
          {/* Анимированная демо-диаграмма */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-5xl mx-auto"
          >
            <AnimatedDemoChart />
          </motion.div>
        </div>
      </section>

      {/* Статистика с анимированными счетчиками */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
              Данные, которые говорят сами за себя
            </h2>
          </motion.div>
          
          <AnimatedStatistics />
        </div>
      </section>

      {/* Особенности с анимированными карточками */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-900 dark:text-white">
              Аналитика, которая работает на вас
            </h2>
            <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-16 max-w-3xl mx-auto">
              Инструменты для построения карьеры, основанные на реальных данных и искусственном интеллекте
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedFeatureCard 
              index={0}
              icon={<UserIcon className="w-6 h-6" />}
              title="Для студентов"
              description="Отслеживайте свою карьеру, находите подходящие вакансии и мероприятия, получайте персонализированные рекомендации."
              linkText="Подробнее"
              linkUrl="/students"
            />
            <AnimatedFeatureCard 
              index={1}
              icon={<BuildingOfficeIcon className="w-6 h-6" />}
              title="Для работодателей"
              description="Размещайте вакансии, отслеживайте интерес студентов и находите талантливых кандидатов с подходящими навыками."
              linkText="Подробнее"
              linkUrl="/employers"
            />
            <AnimatedFeatureCard 
              index={2}
              icon={<AcademicCapIcon className="w-6 h-6" />}
              title="Для университетов"
              description="Получайте данные об активности студентов, создавайте мероприятия и анализируйте тренды трудоустройства."
              linkText="Подробнее"
              linkUrl="/universities"
            />
          </div>
        </div>
      </section>

      {/* Демо-секция с анимированными макетами */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-900 dark:text-white">
              Исследуйте наши интерфейсы
            </h2>
            <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-16 max-w-3xl mx-auto">
              Узнайте, как работает платформа для разных типов пользователей
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedDemoCard
              index={0}
              icon={<UserIcon className="w-6 h-6" />}
              title="Интерфейс студента"
              description="Управление карьерным развитием, поиск возможностей и отслеживание прогресса."
              linkUrl="/students/profile"
              color="from-blue-500 to-indigo-600"
              features={["Карьерная дорожная карта", "Рекомендации мероприятий", "Аналитика навыков"]}
            />
            <AnimatedDemoCard
              index={1}
              icon={<BuildingOfficeIcon className="w-6 h-6" />}
              title="Интерфейс работодателя"
              description="Управление вакансиями, отслеживание кандидатов и аналитика потенциальных сотрудников."
              linkUrl="/employers/dashboard"
              color="from-purple-500 to-pink-600"
              features={["Управление вакансиями", "Аналитика кандидатов", "Отчеты по найму"]}
            />
            <AnimatedDemoCard
              index={2}
              icon={<AcademicCapIcon className="w-6 h-6" />}
              title="Интерфейс университета"
              description="Аналитика студентов, создание мероприятий и отслеживание трендов трудоустройства."
              linkUrl="/universities/dashboard"
              color="from-amber-500 to-orange-600"
              features={["Демографическая аналитика", "Статистика трудоустройства", "Анализ мероприятий"]}
            />
          </div>
        </div>
      </section>

      {/* Отзывы с анимацией */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
              Отзывы пользователей
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <AnimatedTestimonialCard 
              index={0}
              quote="NAVYK полностью изменил мой подход к развитию карьеры. Теперь я точно знаю, какие навыки мне нужно развивать дальше."
              author="Анна К."
              role="Студентка, КазНУ"
            />
            <AnimatedTestimonialCard 
              index={1}
              quote="Мы сократили время на подбор кандидатов в 3 раза! Аналитика помогает нам находить студентов с нужными навыками."
              author="Марат Т."
              role="HR-директор, IT компания"
            />
            <AnimatedTestimonialCard 
              index={2}
              quote="Данные NAVYK помогают нам адаптировать программы обучения под требования рынка труда."
              author="Сауле М."
              role="Проректор, AlmaU"
            />
          </div>
        </div>
      </section>

      {/* Призыв к действию с анимацией */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-blue-500 dark:from-indigo-800 dark:to-blue-700">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Готовы присоединиться?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Начните использовать NAVYK сегодня и раскройте потенциал данных для развития вашей карьеры или организации.
            </p>
            <Button asChild size="lg" variant="secondary" className="rounded-full px-8">
              <Link href="/signup">Регистрация бесплатна</Link>
            </Button>
          </motion.div>
        </div>
      </section>
      
      {/* Добавляем футер */}
      <Footer />
    </div>
  );
} 