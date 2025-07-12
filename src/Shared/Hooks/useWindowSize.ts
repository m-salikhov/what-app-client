import { useState, useLayoutEffect } from 'react';

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
    isDesktop: true,
  });

  useLayoutEffect(() => {
    const handler = () => {
      const isDesktop = window.innerWidth > 1110;

      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        isDesktop,
      });
    };

    handler();
    window.addEventListener('resize', handler);

    return () => {
      window.removeEventListener('resize', handler);
    };
  }, []);

  return windowSize;
}
