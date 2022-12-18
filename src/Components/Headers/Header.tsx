import "./header.scss";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../Hooks/redux";
import { _axios } from "../../Helpers/_axios";
import { userSlice } from "../../Store/reducers/UserSlice";
import owlBW from "./owlBW.svg";
import { useState } from "react";

const Header = () => {
  const [openMobMenu, setOpenMobMenu] = useState(false);
  const { currentUser } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    await _axios
      .get("/auth/logout")
      .then((res) => console.log("res.data", res.data))
      .catch(() => console.log("ошибка"));

    dispatch(userSlice.actions.resetCurrentUser());
  };

  return (
    <header>
      <div onClick={() => navigate("/")}>
        <img src={owlBW} alt="заглавное изображение" />
        <h2>База вопросов</h2>
      </div>

      <nav
        className={openMobMenu ? "mob-menu" : undefined}
        onClick={() => {
          if (openMobMenu === false) {
            document.body.style.overflow = "hidden";
          } else document.body.style.overflow = "visible";
          setOpenMobMenu(false);
        }}
      >
        <ul>
          {currentUser?.role === "superuser" && (
            <li>
              <Link to="/edit"> Редактировать</Link>
            </li>
          )}
          {currentUser?.id && (
            <li>
              <Link to="/add"> Добавить турнир</Link>
            </li>
          )}
          {/* TODO перенести в Турниры на главную */}
          {/* <li>
            <Link to="/">Режим</Link>
          </li> */}
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
        onClick={() => {
          if (openMobMenu === false) {
            document.body.style.overflow = "hidden";
          } else document.body.style.overflow = "visible";
          setOpenMobMenu(!openMobMenu);
        }}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
  );
};

export default Header;
