import './header.css';
import owlGreen from './owlGreen.svg';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLogout } from '../../Hooks/useLogout';
import { useWindowSize } from '../../Hooks/useWindowSize';
import { useInitialLoginQuery } from '../../Store/ToolkitAPIs/userAPI';
import DarkMode from '../Elements/DarkMode/DarkMode';

function Header() {
  const [openMobMenu, setOpenMobMenu] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const { data: currentUser } = useInitialLoginQuery(undefined);

  const { width } = useWindowSize();
  const logout = useLogout();

  const handleMobMenu = () => {
    if (width > 1050) return;

    document.body.style.overflow = openMobMenu ? 'visible' : 'hidden';

    setOpenMobMenu((prev) => !prev);
  };

  return (
    <header>
      <div>
        <div onClick={() => navigate('/')}>
          <img src={owlGreen} alt='заглавное изображение' />
          <h2>База вопросов "Что? Где? Когда?"</h2>
        </div>
      </div>

      <nav
        className={openMobMenu ? 'mob-menu' : undefined}
        onClick={(e) => {
          if (
            e.target instanceof HTMLElement &&
            e.target.localName.match(/^(nav|a)$/)
          ) {
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
            <Link to='/about'>О сайте</Link>
          </li>

          <li>
            <Link to='/playmode'>Игровой режим </Link>
          </li>

          {currentUser?.role === 'superuser' && (
            <li>
              <Link to='/edit'> Редактировать</Link>
            </li>
          )}

          <li>
            <Link to='/addbylink'> Добавить турнир</Link>
          </li>

          <li>
            <Link to='/all'>Все турниры</Link>
          </li>

          {currentUser?.id && (
            <li>
              <Link to='/profile'>Профиль</Link>
            </li>
          )}

          {currentUser?.id ? (
            <li>
              <Link to='/' onClick={logout}>
                Выйти
              </Link>
            </li>
          ) : (
            <li>
              <Link to='/entry'>Войти</Link>
            </li>
          )}
        </ul>
      </nav>
      <div
        className={openMobMenu ? 'mob-btn open' : 'mob-btn'}
        onClick={handleMobMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
  );
}

export default Header;
