import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { _axios } from "../../Helpers/_axios";
import { useAppSelector, useAppDispatch } from "../../Hooks/redux";
import { userSlice } from "../../Store/reducers/UserSlice";
import owlBW from "./owlBW.svg";
import "./header.scss";
import { routes } from "../../constants";

const Header = () => {
  const [openMobMenu, setOpenMobMenu] = useState(false);
  const { currentUser } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    await _axios
      .get(routes.authLogout)
      .then((res) => console.log("res.data", res.data))
      .catch(() => console.log("ошибка"));

    dispatch(userSlice.actions.resetCurrentUser());
  };
  const onClick = () => {
    if (window.innerWidth < 800 && !openMobMenu)
      document.body.style.overflow = "hidden";
    if (window.innerWidth < 800 && openMobMenu)
      document.body.style.overflow = "visible";
    setOpenMobMenu(!openMobMenu);
  };

  return (
    <header>
      <div onClick={() => navigate("/")}>
        <img src={owlBW} alt="заглавное изображение" />
        <h2>База вопросов "Что? Где? Когда?"</h2>
      </div>

      <nav className={openMobMenu ? "mob-menu" : undefined} onClick={onClick}>
        <ul>
          <li>
            <Link to="/about">О сайте</Link>
          </li>
          <li>
            <Link to="/playmode">Игровой режим </Link>
          </li>
          {currentUser?.role === "superuser" && (
            <li>
              <Link to="/edit"> Редактировать</Link>
            </li>
          )}

          <li>
            <Link to="/addbylink"> Добавить турнир</Link>
          </li>

          <li>
            <Link to="/all">Все турниры</Link>
          </li>
          {currentUser?.id && (
            <li>
              <Link to="/profile">Профиль</Link>
            </li>
          )}
          {currentUser?.id ? (
            <li>
              <Link to="/" onClick={logout}>
                Выйти
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/entry">Войти</Link>
            </li>
          )}
        </ul>
      </nav>
      <div
        className={openMobMenu ? "mob-btn open" : "mob-btn"}
        onClick={onClick}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
  );
};

export default Header;
