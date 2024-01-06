import { useEffect } from 'react';
import { useAppDispatch } from './redux';

export function useDocTitle(title = 'База вопросов') {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
