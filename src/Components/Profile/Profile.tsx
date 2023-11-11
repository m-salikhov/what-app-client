import { useEffect, useState } from "react";
import { _axios } from "../../Helpers/_axios";
import { getDate } from "../../Helpers/getDate";
import { initTournamentShort } from "../../Helpers/initValues";
import ChangePass from "./ChangePass";
import { useDocTitle } from "../../Hooks/useDocTitle";
import "./profile.scss";
import { routes } from "../../constants";
import { useGetUserLogfirstQuery } from "../../Store/userAPI";

interface Result {
  id: string;
  userId: string;
  date: string;
  tournamentId: number;
  title: string;
  tournamentLength: number;
  resultNumber: number;
}

const Profile = () => {
  useDocTitle("Профиль");
  const { data: currentUser } = useGetUserLogfirstQuery(undefined);
  const [changePass, setChangePass] = useState(false);
  const [tournaments, setTournaments] = useState([initTournamentShort]);
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    _axios
      .get(`${routes.tournamentsAllByUploader}${currentUser?.id}`)
      .then((res) => {
        setTournaments(res.data);
      });
  }, [currentUser?.id]);

  useEffect(() => {
    _axios.post(routes.userResultShort, { id: currentUser?.id }).then((res) => {
      setResults(res.data);
    });
  }, [currentUser?.id]);

  return (
    <main className="pr">
      <div className="pr-wrapper">
        <div>
          <p>Имя</p>
          <p>{currentUser?.username}</p>
        </div>
        <div>
          <p>Почта</p>
          <p>{currentUser?.email}</p>
        </div>
        <div>
          <p>Зарегистрирован</p>
          <p>{currentUser ? getDate(currentUser?.date) : null}</p>
        </div>
        <div>
          <p>Статус</p>
          <p>{currentUser?.role}</p>
        </div>
        {changePass ? (
          <ChangePass
            cancelChangePass={() => setChangePass(false)}
            id={currentUser?.id}
          />
        ) : (
          <button type="button" onClick={() => setChangePass(true)}>
            Изменить пароль
          </button>
        )}
        <section className="pr-res">
          <p>Ваши результаты :</p>
          {results.length > 0 ? (
            results.map((v) => {
              return (
                <div key={v.id}>
                  <p>{`${v.title}:`}</p>
                  <p>{`${v.resultNumber} из ${v.tournamentLength}`}</p>
                </div>
              );
            })
          ) : (
            <p>Нет сыгранных турниров</p>
          )}
        </section>
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
