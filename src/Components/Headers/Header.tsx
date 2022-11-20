import "./header.scss";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../Hooks/redux";
import { _axios } from "../../Helpers/_axios";
import { userSlice } from "../../Store/reducers/UserSlice";
import owlBW from "./owlBW.svg";

const Header = () => {
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

      <nav>
        <ul>
          {currentUser?.id === "superuser" && (
            <li>
              <Link to="/edit"> Редактировать</Link>
            </li>
          )}
          {/* Только админ */}
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
          {/* TODO только у пользователя и админа */}
          {currentUser?.id && (
            <li>
              <Link to="/profile">Профиль</Link>
            </li>
          )}
          {/* TODO войти/выйти  */}
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
    </header>
  );
};

export default Header;
