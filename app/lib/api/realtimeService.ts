import { useState, useEffect } from 'react';

// Интерфейс для имитации данных реального времени
interface RealtimeOptions {
  initialData: any;
  pollInterval?: number;
  endpoint?: string;
}

interface RealtimeReturn<T> {
  data: T;
  isLoading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
}

/**
 * Хук для имитации данных реального времени через polling вместо WebSocket
 * Это решение совместимо с Vercel, так как не использует WebSockets
 */
export function useVercelCompatibleRealtime<T>({
  initialData,
  pollInterval = 5000,
  endpoint
}: RealtimeOptions): RealtimeReturn<T> {
  const [data, setData] = useState<T>(initialData as T);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // Функция для получения свежих данных
  const fetchData = async () => {
    if (!endpoint) return;
    
    try {
      setIsLoading(true);
      const response = await fetch(endpoint);
      
      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }
      
      const newData = await response.json();
      setData(newData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Неизвестная ошибка при получении данных'));
    } finally {
      setIsLoading(false);
    }
  };

  // Настраиваем polling вместо WebSocket
  useEffect(() => {
    // Для режима разработки - имитация получения данных через интервал
    if (process.env.NODE_ENV === 'development' && !endpoint) {
      const interval = setInterval(() => {
        if (typeof initialData === 'function') {
          setData(initialData());
        }
      }, 3000);

      return () => clearInterval(interval);
    }
    
    // Для реального использования - polling с сервера
    if (endpoint) {
      // Первичная загрузка данных
      fetchData();
      
      // Настройка интервала для периодического обновления
      const interval = setInterval(fetchData, pollInterval);
      
      return () => clearInterval(interval);
    }
  }, [endpoint, pollInterval, initialData]);

  // Функция для принудительного обновления данных
  const refresh = async (): Promise<void> => {
    await fetchData();
  };

  return {
    data,
    isLoading,
    error,
    refresh
  };
}

/**
 * Функция для отправки событий на сервер через HTTP вместо WebSocket
 * Совместима с Vercel Serverless Functions
 */
export async function sendEventToServer(eventName: string, data: any, endpoint: string): Promise<any> {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event: eventName,
        data
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Ошибка при отправке события:', error);
    throw error;
  }
} 