import { useLayoutEffect, useState } from 'react';

function useTheme() {
  const [theme, setTheme] = useState(
    localStorage.getItem('app-theme') || 'light'
  );

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  function changeTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  return { theme, changeTheme };
}

export default useTheme;
