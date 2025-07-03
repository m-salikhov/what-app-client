import './header.css';
import owlGreen from './owlGreen.svg';
import { NavLink } from 'react-router-dom';
import { useLogout } from 'Shared/Hooks/useLogout';
import { DarkMode } from 'Shared/Components/DarkMode/DarkMode';
import { useGetCurrentUserQuery } from 'Store/ToolkitAPIs/userAPI';
import { usePrefetch } from 'Store/ToolkitAPIs/tournamentAPI';
import { Squash as Hamburger } from 'hamburger-react';
import { useHeaderNavigation } from './helpers/useHeaderNavigation';

export function Header() {
  const prefetchTournaments = usePrefetch('getTournamentsAllShort');
  const { data: currentUser } = useGetCurrentUserQuery(undefined);
  const logout = useLogout();
  const { logoNavigate, handleMobMenu, isOpenMobMenu, isDesktop } = useHeaderNavigation();

  return (
    <header>
      <div>
        <div onClick={logoNavigate}>
          <img src={owlGreen} alt='Логотип Базы вопросов Что? Где? Когда?' />
          <h2>База вопросов "Что? Где? Когда?"</h2>
        </div>
      </div>

      <nav
        className={isOpenMobMenu ? 'mob-menu' : undefined}
        onClick={(e) => {
          if (e.target instanceof HTMLElement && /^(nav|a)$/.test(e.target.localName)) {
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

          <li onMouseEnter={() => prefetchTournaments(undefined)}>
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

          <li onMouseEnter={() => prefetchTournaments(undefined)}>
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

      {!isDesktop && <Hamburger size={25} toggled={isOpenMobMenu} onToggle={handleMobMenu} color='var(--h-color)' />}
    </header>
  );
}
