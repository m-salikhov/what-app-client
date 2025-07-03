import { useEffect, useState } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('app-theme');
    return savedTheme || 'light';
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  function changeTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  return { theme, changeTheme };
}
