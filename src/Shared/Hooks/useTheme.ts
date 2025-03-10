import { useEffect, useState } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState(localStorage.getItem('app-theme') ?? 'light');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  function changeTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  return { theme, changeTheme };
}
