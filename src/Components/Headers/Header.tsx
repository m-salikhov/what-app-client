import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../Hooks/redux';
import owlGreen from './owlGreen.svg';
import './header.scss';
import { useGetUserLogfirstQuery, useLazyGetUserLogoutQuery, userAPI } from '../../Store/userAPI';

const Header = () => {
  const [openMobMenu, setOpenMobMenu] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data: currentUser } = useGetUserLogfirstQuery(undefined);
  const [trigger] = useLazyGetUserLogoutQuery();

  const logout = () => {
    trigger(undefined);
    dispatch(userAPI.util.resetApiState());
  };

  const handleMobMenu = () => {
    const { innerWidth } = window;

    if (innerWidth > 1050) return;
    if (innerWidth < 1050 && !openMobMenu) document.body.style.overflow = 'hidden';
    if (innerWidth < 1050 && openMobMenu) document.body.style.overflow = 'visible';

    setOpenMobMenu(!openMobMenu);
  };

  return (
    <header>
      <div onClick={() => navigate('/')}>
        <img src={owlGreen} alt='заглавное изображение' />
        <h2>База вопросов "Что? Где? Когда?"</h2>
      </div>

      <nav className={openMobMenu ? 'mob-menu' : undefined} onClick={handleMobMenu}>
        <ul>
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
      <div className={openMobMenu ? 'mob-btn open' : 'mob-btn'} onClick={handleMobMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
  );
};

export default Header;
