import { useEffect } from 'react';

export function useDocTitle(title = 'База вопросов') {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
