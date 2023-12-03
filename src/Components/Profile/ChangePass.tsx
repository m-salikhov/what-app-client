import { FormEvent, useState } from "react";
import { useChangePasswordMutation } from "../../Store/userAPI";

interface ChangePassProp {
  setChangePass: (flag: boolean) => void;
  id: string;
}

const ChangePass = ({ setChangePass, id }: ChangePassProp) => {
  const [newPass, setNewPass] = useState("");
  const [newPassRepeat, setNewPassRepeat] = useState("");
  const [message, setMessage] = useState("");

  const [changePassword, { isSuccess, isError }] = useChangePasswordMutation();

  const onSubmit = async (e: FormEvent<EventTarget>) => {
    e.preventDefault();
    if (message) {
      setMessage("");
    }
    if (!newPass || newPass !== newPassRepeat) {
      setMessage("Пароль не совпадает");
      return;
    }

    await changePassword({ newPass, id })
      .then(() => {
        setNewPass("");
        setNewPassRepeat("");
      })
      .catch(() => setMessage("Ошибка сервера"));
  };

  const onCancel = () => {
    if (message) {
      setMessage("");
    }
    setChangePass(false);
  };

  return (
    <form className="pr-pass">
      <label>
        <p>Новый пароль</p>
        <input type="password" onChange={(e) => setNewPass(e.target.value)} value={newPass} autoComplete="off" />
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
      {(message || isError) && <p className="pr-error">{message}</p>}
      {isSuccess && <p>{"Пароль успешно сохранён"}</p>}
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
