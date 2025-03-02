import './DarkMode.css';
import Sun from './Sun.svg?react';
import Moon from './Moon.svg?react';
import { useState } from 'react';
import { useTheme } from 'Shared/Hooks/useTheme';

export function DarkMode() {
  const { theme, changeTheme } = useTheme();
  const [checked, setChecked] = useState(theme === 'light' ? false : true);

  return (
    <div className='dark-mode'>
      <input
        className='dark-mode-input'
        title='Toggle dark mode'
        type='checkbox'
        id='darkmode-toggle'
        onClick={() => changeTheme()}
        onChange={() => setChecked(!checked)}
        checked={checked}
      />
      <label className='dark-mode-label' htmlFor='darkmode-toggle'>
        <Sun />
        <Moon />
      </label>
    </div>
  );
}
