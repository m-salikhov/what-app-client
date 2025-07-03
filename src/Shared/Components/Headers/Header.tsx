import styles from './header.module.css';
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
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.logoContainer} onClick={logoNavigate}>
          <img src={owlGreen} className={styles.logoImage} alt='Логотип Базы вопросов Что? Где? Когда?' />
          <h2 className={styles.logoText}>База вопросов "Что? Где? Когда?"</h2>
        </div>
      </div>

      <nav
        className={`${styles.nav} ${isOpenMobMenu ? styles.mobMenu : ''}`}
        onClick={(e) => {
          if (e.target instanceof HTMLElement && /^(nav|a)$/.test(e.target.localName)) {
            handleMobMenu();
          }
        }}
      >
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <DarkMode />
          </li>
          <li className={styles.navItem}>
            <NavLink
              to='/about'
              className={({ isActive }) => (isActive ? `${styles.navLink} ${styles.active}` : styles.navLink)}
            >
              О сайте
            </NavLink>
          </li>

          <li className={styles.navItem} onMouseEnter={() => prefetchTournaments(undefined)}>
            <NavLink
              to='/playmode'
              className={({ isActive }) => (isActive ? `${styles.navLink} ${styles.active}` : styles.navLink)}
            >
              Игровой режим
            </NavLink>
          </li>

          {currentUser?.role === 'superuser' && (
            <li className={styles.navItem}>
              <NavLink
                to='/edit'
                className={({ isActive }) => (isActive ? `${styles.navLink} ${styles.active}` : styles.navLink)}
              >
                Редактировать
              </NavLink>
            </li>
          )}

          <li className={styles.navItem}>
            <NavLink
              to='/addbylink'
              className={({ isActive }) => (isActive ? `${styles.navLink} ${styles.active}` : styles.navLink)}
            >
              Добавить турнир
            </NavLink>
          </li>

          <li className={styles.navItem} onMouseEnter={() => prefetchTournaments(undefined)}>
            <NavLink
              to='/all'
              className={({ isActive }) => (isActive ? `${styles.navLink} ${styles.active}` : styles.navLink)}
            >
              Все турниры
            </NavLink>
          </li>

          {currentUser?.id && (
            <li className={styles.navItem}>
              <NavLink
                to='/profile'
                className={({ isActive }) => (isActive ? `${styles.navLink} ${styles.active}` : styles.navLink)}
              >
                Профиль
              </NavLink>
            </li>
          )}

          {currentUser?.id ? (
            <li className={styles.navItem}>
              <NavLink to='/' onClick={logout} className={styles.navLink}>
                Выйти
              </NavLink>
            </li>
          ) : (
            <li className={styles.navItem}>
              <NavLink
                to='/entry'
                className={({ isActive }) => (isActive ? `${styles.navLink} ${styles.active}` : styles.navLink)}
              >
                Войти
              </NavLink>
            </li>
          )}
        </ul>
      </nav>

      {!isDesktop && <Hamburger size={25} toggled={isOpenMobMenu} onToggle={handleMobMenu} color='var(--h-color)' />}
    </header>
  );
}
