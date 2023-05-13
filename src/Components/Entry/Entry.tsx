import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Hooks/redux";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { _axios } from "../../Helpers/_axios";
import { UserType } from "../../Types/user";
import {
  loginUser,
  resetError,
  setCurrentUser,
  userSlice,
} from "../../Store/reducers/UserSlice";
import ModalReg from "./ModalReg";
import { initUser } from "../../Helpers/initValues";
import entryImg from "./entry_img.svg";
import { useDocTitle } from "../../Hooks/useDocTitle";
import "./entry.scss";

const testEmail = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;

const Entry = () => {
  const dispatch = useAppDispatch();
  useDocTitle("Вход");

  const [form, setForm] = useState<UserType>(initUser);
  const [passRepeat, setPassRepeat] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [reg, setReg] = useState(false);

  const onSubmit = async (e: FormEvent<EventTarget>) => {
    e.preventDefault();

    dispatch(resetError());
    setErrorMessage("");

    if (!testEmail.test(form.email)) {
      setErrorMessage("Неверный email");
      return;
    }
    if (!form.password) {
      setErrorMessage("Введите пароль");
      return;
    }
    if (reg && form.password !== passRepeat) {
      setErrorMessage("Повторите пароль");
      return;
    }
    if (reg && !form.username) {
      setErrorMessage("Выберите псевдоним");
      return;
    }

    if (reg) {
      await _axios
        .post<UserType>("/users", form)
        .then((res) => {
          console.log("res", res);
          dispatch(setCurrentUser(res.data));
          setIsModalOpen(true);
        })
        .catch(() => setErrorMessage("Email уже зарегистрирован"));
      return;
    }
    dispatch(loginUser({ email: form.email, password: form.password }));
    setIsAuth(true);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const { currentUser, error } = useAppSelector((state) => state.userReducer);

  useEffect(() => {
    return () => {
      dispatch(resetError());
      setErrorMessage("");
    };
  }, [dispatch]);

  if (isAuth && currentUser?.id) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      {/* окно при успешной регистрации */}
      {isModalOpen ? <ModalReg /> : null}

      <main className="entry__wrapper">
        <div className="entry">
          <div className="entry__container">
            <div className="entry__img">
              <img src={entryImg} alt="заглавное изображение" />
            </div>
            <form className="entry__form" onSubmit={onSubmit}>
              <label className="entry__input">
                <h2>Почта</h2>
                <input
                  type="email"
                  onChange={onChange}
                  name="email"
                  autoComplete="on"
                  placeholder="email"
                />
              </label>
              <label className={reg ? "entry__input" : "entry__input reg"}>
                <h2>Псевдоним</h2>
                <input
                  type="text"
                  onChange={onChange}
                  name="username"
                  autoComplete="off"
                  placeholder="username"
                />
              </label>
              <label className="entry__input">
                <h2>Пароль</h2>
                <input
                  type="password"
                  onChange={onChange}
                  name="password"
                  autoComplete="on"
                  placeholder="password"
                />{" "}
              </label>
              <label className={reg ? "entry__input" : "entry__input reg"}>
                <h2>Повторите пароль</h2>
                <input
                  autoComplete="on"
                  type="password"
                  name="repeatPassword"
                  placeholder="repeat password"
                  onChange={(e) => setPassRepeat(e.target.value)}
                />{" "}
              </label>
              {(errorMessage || error) && (
                <div className="entry__error">
                  <div className="entry__error--block"></div>
                  <p>{errorMessage || error}</p>
                </div>
              )}

              <div className="entry__buttons">
                <button type="submit">Отправить</button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setErrorMessage("");
                    dispatch(userSlice.actions.resetError());
                    setReg(!reg);
                    setIsAuth(false);
                  }}
                >
                  {reg ? "Авторизироваться" : "Зарегистрироваться"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Entry;
