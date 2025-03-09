# Деплой проекта Navyk на Vercel

Этот документ содержит инструкции по деплою проекта на платформу Vercel.

## Предварительные требования

1. Аккаунт на [Vercel](https://vercel.com)
2. Репозиторий проекта на GitHub, GitLab или Bitbucket
3. Node.js версии 18 или выше

## Шаги для деплоя

### 1. Настройка переменных окружения

Перед деплоем необходимо настроить следующие переменные окружения в Vercel:

```
CLIENT_URL=https://navyk.kz
JWT_SECRET=your_secure_jwt_secret_for_production
ML_SERVICE_URL=https://ml-api.navyk.kz
NEXT_PUBLIC_SITE_URL=https://navyk.kz
NEXT_PUBLIC_JWT_SECRET=your_secure_jwt_secret_for_production
NEXT_PUBLIC_SOCKET_URL=https://api.navyk.kz
```

> **Важно**: Для `JWT_SECRET` и `NEXT_PUBLIC_JWT_SECRET` обязательно используйте надежные случайные значения в продакшене.

### 2. Деплой через Vercel Dashboard

1. Войдите в [Vercel Dashboard](https://vercel.com/dashboard)
2. Нажмите "Add New" -> "Project"
3. Выберите репозиторий с проектом
4. Настройте параметры проекта:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: npm run build
   - Output Directory: .next
5. Добавьте переменные окружения в разделе "Environment Variables"
6. Нажмите "Deploy"

### 3. Деплой через Vercel CLI

Alternatively you can deploy using the Vercel CLI:

1. Установите Vercel CLI:
   ```
   npm install -g vercel
   ```

2. Войдите в аккаунт Vercel:
   ```
   vercel login
   ```

3. Настройте проект (в корневой директории проекта):
   ```
   vercel
   ```

4. Следуйте инструкциям для настройки проекта
5. Для продакшен-деплоя используйте:
   ```
   vercel --prod
   ```

## Особенности архитектуры на Vercel

### Realtime функциональность

В этом проекте реализована альтернативная реализация для работы с данными в реальном времени:

- Вместо WebSocket используется HTTP long polling через Vercel Serverless функции
- API маршрут `/api/realtime` обрабатывает запросы данных
- Хук `useVercelCompatibleRealtime` предоставляет интерфейс, аналогичный Socket.io

### Аутентификация

- Используется аутентификация на основе JWT-токенов
- Токены хранятся в HttpOnly cookie для большей безопасности
- Middleware проверяет наличие токена для защищенных маршрутов

## Проверка после деплоя

После деплоя рекомендуется проверить:

1. Корректную работу аутентификации
2. Функциональность получения данных в реальном времени
3. Работу защищенных маршрутов
4. Работу всех API-эндпоинтов

## Известные ограничения

- Vercel не поддерживает WebSockets, поэтому используется long polling
- Серверный компонент Socket.io не может быть запущен на Vercel
- Memory-based хранение данных в Serverless-функциях сбрасывается между запросами

## Дополнительные ресурсы

- [Документация Vercel по деплою Next.js](https://vercel.com/docs/frameworks/nextjs)
- [Руководство по оптимизации Next.js на Vercel](https://vercel.com/guides/deploying-nextjs-with-vercel)
- [Настройка кастомных доменов](https://vercel.com/docs/projects/domains/add-a-domain) 