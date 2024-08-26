import Sun from './Sun.svg?react';
import Moon from './Moon.svg?react';
import useTheme from '../../../Hooks/useTheme';
import { useState } from 'react';
import './DarkMode.css';

function DarkMode() {
  const { theme, changeTheme } = useTheme();
  const [checked, setChecked] = useState(theme === 'light' ? false : true);

  return (
    <div className='dark_mode'>
      <input
        className='dark_mode_input'
        type='checkbox'
        id='darkmode-toggle'
        onClick={() => changeTheme()}
        onChange={() => setChecked(!checked)}
        checked={checked}
      />
      <label className='dark_mode_label' htmlFor='darkmode-toggle'>
        <Sun />
        <Moon />
      </label>
    </div>
  );
}

export default DarkMode;
