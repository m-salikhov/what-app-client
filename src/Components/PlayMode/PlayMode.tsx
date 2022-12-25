import { useEffect, useState } from "react";
import { TournamentType } from "../../Types/tournament";
import { useParams } from "react-router-dom";
import { _axios } from "../../Helpers/_axios";

import "./playmode.scss";
import { initTournament } from "../../Helpers/initValues";
import { getDate } from "../../Helpers/getDate";

const PlayMode = () => {
  const [t, setT] = useState<TournamentType>(initTournament);
  const { id } = useParams();

  useEffect(() => {
    _axios
      .get(`/tournaments/${id}`)
      .then((res) => {
        setT(res.data);
      })
      .catch((e: any) => console.log(e.response.data.message));
  }, [id]);

  return (
    <main className="pm-info">
      <h2>{t.title}</h2>
      <div>
        <p>Вопросов: {t.questionsQuantity}</p>
        <p>Туров: {t.tours}</p>
        <p>Дата: {getDate(t.date)}</p>
      </div>
      <div>
        <p>Редактор(ы):</p>
        {t.editors.map((v) => {
          return <p key={v}>{v}</p>;
        })}
      </div>
      <div>
        <button>Начать игру</button>
      </div>
    </main>
  );
};

export default PlayMode;
