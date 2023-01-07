import { useEffect, useState } from "react";
import { getDate } from "../../Helpers/getDate";
import { initTournamentShort } from "../../Helpers/initValues";
import { _axios } from "../../Helpers/_axios";
import { useAppSelector } from "../../Hooks/redux";
import ChangePass from "./ChangePass";
import "./profile.scss";

const Profile = () => {
  const { currentUser } = useAppSelector((state) => state.userReducer);
  const [changePass, setChangePass] = useState(false);
  const [tournaments, setTournaments] = useState([initTournamentShort]);

  useEffect(() => {
    _axios.get(`/tournaments/allbyuploader/${currentUser.id}`).then((res) => {
      setTournaments(res.data);
    });
  }, [currentUser.id]);
  return (
    <main className="pr">
      <div className="pr-wrapper">
        <div>
          <p>Имя</p>
          <p>{currentUser.username}</p>
        </div>
        <div>
          <p>Почта</p>
          <p>{currentUser.email}</p>
        </div>
        <div>
          <p>Зарегистрирован</p>
          <p>{getDate(currentUser.date)}</p>
        </div>
        <div>
          <p>Статус</p>
          <p>{currentUser.role}</p>
        </div>
        {changePass ? (
          <ChangePass
            cancelChangePass={() => setChangePass(false)}
            id={currentUser.id}
          />
        ) : (
          <button type="button" onClick={() => setChangePass(true)}>
            Изменить пароль
          </button>
        )}
        <section className="pr-ts">
          <p>Добавленные вами турниры:</p>
          {tournaments.length > 0 ? (
            tournaments.map((v) => {
              return <p key={v.id}>{v.title}</p>;
            })
          ) : (
            <p>Вы пока что ничего не добавили</p>
          )}
        </section>
      </div>
    </main>
  );
};

export default Profile;
