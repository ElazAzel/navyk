import { NextRequest, NextResponse } from 'next/server';

// Типы данных для работы с аналитикой в реальном времени
interface AnalyticsEvent {
  userId: string;
  action: string;
  timestamp: number;
  details?: object;
}

// Имитация базы данных событий (в реальном приложении должно использоваться настоящее хранилище)
let eventsDatabase: AnalyticsEvent[] = [];

// GET-обработчик для получения текущих данных
export async function GET(request: NextRequest) {
  try {
    // Получаем параметры из URL
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const action = searchParams.get('action');
    
    // Фильтруем события, если переданы параметры
    let filteredEvents = [...eventsDatabase];
    
    if (userId) {
      filteredEvents = filteredEvents.filter(event => event.userId === userId);
    }
    
    if (action) {
      filteredEvents = filteredEvents.filter(event => event.action === action);
    }
    
    // Сортируем по времени, получаем последние 100 событий
    const sortedEvents = filteredEvents
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 100);
    
    // Возвращаем результат в формате JSON
    return NextResponse.json({ events: sortedEvents });
  } catch (error) {
    console.error('Ошибка при обработке запроса событий:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}

// POST-обработчик для добавления новых событий
export async function POST(request: NextRequest) {
  try {
    // Проверяем токен авторизации
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Требуется авторизация' },
        { status: 401 }
      );
    }
    
    // Получаем данные из тела запроса
    const body = await request.json();
    
    // Валидируем полученные данные
    if (!body.event || !body.data || !body.data.userId) {
      return NextResponse.json(
        { error: 'Неверный формат данных' },
        { status: 400 }
      );
    }
    
    // Создаем новое событие
    const newEvent: AnalyticsEvent = {
      userId: body.data.userId,
      action: body.event,
      timestamp: Date.now(),
      details: body.data
    };
    
    // Добавляем событие в базу данных
    eventsDatabase.push(newEvent);
    
    // Если база данных стала слишком большой, удаляем старые события
    if (eventsDatabase.length > 10000) {
      eventsDatabase = eventsDatabase
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, 5000);
    }
    
    // Возвращаем подтверждение
    return NextResponse.json({ success: true, eventId: newEvent.timestamp });
  } catch (error) {
    console.error('Ошибка при обработке отправки события:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}

// DELETE-обработчик для очистки событий (только для администраторов)
export async function DELETE(request: NextRequest) {
  try {
    // Проверяем токен авторизации и роль администратора
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Требуется авторизация' },
        { status: 401 }
      );
    }
    
    // В реальном приложении здесь должна быть проверка роли администратора
    // через декодирование JWT токена
    
    // Очищаем базу данных событий
    eventsDatabase = [];
    
    // Возвращаем подтверждение
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Ошибка при обработке очистки событий:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
} 