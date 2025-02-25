import './header.css';
import owlGreen from './owlGreen.svg';
import { Dispatch, SetStateAction, useState } from 'react';
import { NavigateFunction, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useLogout } from 'Shared/Hooks/useLogout';
import { useWindowSize } from 'Shared/Hooks/useWindowSize';
import { DarkMode } from 'Shared/Components/DarkMode/DarkMode';
import { useInitialLogin } from 'src/Shared/Hooks/useInitialLogin';

const logoNavigate = (
  isManePage: boolean,
  isFullSize: boolean,
  openMobMenu: boolean,
  navigate: NavigateFunction,
  setOpenMobMenu: Dispatch<SetStateAction<boolean>>
) => {
  if (isFullSize && isManePage) {
    return;
  } else if (isFullSize) {
    navigate('/');
  } else if (openMobMenu && isManePage) {
    document.body.style.overflow = 'visible';
    setOpenMobMenu(false);
  } else if (openMobMenu) {
    document.body.style.overflow = 'visible';
    setOpenMobMenu(false);
    navigate('/');
  } else if (!isManePage) {
    navigate('/');
  }
};

export function Header() {
  const [openMobMenu, setOpenMobMenu] = useState(false);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { currentUser } = useInitialLogin();

  const { isFullSize } = useWindowSize();
  const logout = useLogout();

  const handleMobMenu = () => {
    if (isFullSize) return;

    document.body.style.overflow = openMobMenu ? 'visible' : 'hidden';

    setOpenMobMenu((prev) => !prev);
  };

  return (
    <header>
      <div>
        <div onClick={() => logoNavigate(pathname === '/', isFullSize, openMobMenu, navigate, setOpenMobMenu)}>
          <img src={owlGreen} alt='заглавное изображение' />
          <h2>База вопросов "Что? Где? Когда?"</h2>
        </div>
      </div>

      <nav
        className={openMobMenu ? 'mob-menu' : undefined}
        onClick={(e) => {
          if (e.target instanceof HTMLElement && e.target.localName.match(/^(nav|a)$/)) {
            handleMobMenu();
          }
        }}
      >
        <ul>
          <li>
            {' '}
            <DarkMode />{' '}
          </li>
          <li>
            <NavLink to='/about'>О сайте</NavLink>
          </li>

          <li>
            <NavLink to='/playmode'>Игровой режим </NavLink>
          </li>

          {currentUser?.role === 'superuser' && (
            <li>
              <NavLink to='/edit'> Редактировать</NavLink>
            </li>
          )}

          <li>
            <NavLink to='/addbylink'> Добавить турнир</NavLink>
          </li>

          <li>
            <NavLink to='/all'>Все турниры</NavLink>
          </li>

          {currentUser?.id && (
            <li>
              <NavLink to='/profile'>Профиль</NavLink>
            </li>
          )}

          {currentUser?.id ? (
            <li>
              <NavLink to='/' onClick={logout}>
                Выйти
              </NavLink>
            </li>
          ) : (
            <li>
              <NavLink to='/entry'>Войти</NavLink>
            </li>
          )}
        </ul>
      </nav>
      <div className={openMobMenu ? 'mob-btn open' : 'mob-btn'} onClick={handleMobMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
  );
}
