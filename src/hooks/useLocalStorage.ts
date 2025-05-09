import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem('Youtube Collector');
      if (item) {
        const data = JSON.parse(item);
        return data[key] || initialValue;
      }
      return initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      const item = window.localStorage.getItem('Youtube Collector');
      const data = item ? JSON.parse(item) : {};
      data[key] = storedValue;
      window.localStorage.setItem('Youtube Collector', JSON.stringify(data));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}