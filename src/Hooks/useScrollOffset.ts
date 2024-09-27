import { useEffect } from 'react';

export default function useScrollOffset<T>(flag: T) {
  const body = document.querySelector('body') as HTMLBodyElement;

  useEffect(() => {
    const scrollOffset = window.innerWidth - document.body.clientWidth;

    if (flag && scrollOffset > 1) {
      body.style.overflow = 'hidden';
      body.style.paddingRight = `${scrollOffset + 0.4}px`;
    }

    return () => {
      body.style.overflow = 'auto';
      body.style.removeProperty('padding-right');
    };
  }, [flag]);
}
