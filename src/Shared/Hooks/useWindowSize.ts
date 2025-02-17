import { useState, useEffect } from 'react';

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
    isFullSize: true,
  });

  useEffect(() => {
    const handler = () => {
      const isFullSize = window.innerWidth > 1050;

      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        isFullSize,
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
