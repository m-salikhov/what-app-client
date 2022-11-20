import { FC, FormEvent, useState } from "react";
import { _axios } from "../../Helpers/_axios";

interface ChangePassProp {
  cancelChangePass: () => void;
  id?: string;
}

const ChangePass: FC<ChangePassProp> = ({ cancelChangePass, id }) => {
  const [newPass, setNewPass] = useState("");
  const [newPassRepeat, setNewPassRepeat] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = async (e: FormEvent<EventTarget>) => {
    e.preventDefault();
    if (message) {
      setMessage("");
    }
    if (!newPass || newPass !== newPassRepeat) {
      setMessage("Пароль не совпадает");
      return;
    }
    await _axios
      .put<string>("/users", { newPass, id })
      .then((res) => {
        setMessage(res.data);
        setNewPass("");
        setNewPassRepeat("");
      })
      .catch(() => setMessage("Ошибка сервера"));
  };

  const onCancel = () => {
    if (message) {
      setMessage("");
    }
    cancelChangePass();
  };

  return (
    <form className="pr-pass">
      <label>
        <p>Новый пароль</p>
        <input
          type="password"
          onChange={(e) => setNewPass(e.target.value)}
          value={newPass}
          autoComplete="off"
        />
      </label>
      <label>
        <p>Повторите пароль</p>
        <input
          type="password"
          onChange={(e) => setNewPassRepeat(e.target.value)}
          value={newPassRepeat}
          autoComplete="off"
        />
      </label>
      {message && <p className="pr-error">{message}</p>}
      <div className="pr-pass__control">
        <button type="button" onClick={onCancel}>
          Закрыть
        </button>
        <button type="submit" onClick={onSubmit}>
          Отправить
        </button>
      </div>
    </form>
  );
};

export default ChangePass;
