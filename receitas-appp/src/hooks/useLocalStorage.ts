import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

// Custom hook: funciona como useState, mas persiste o valor no localStorage
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? (JSON.parse(stored) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignora erros de armazenamento (modo privado, cota cheia etc.)
    }
  }, [key, value]);

  return [value, setValue];
}
