import "./tournament.scss";
import { useEffect, useState } from "react";
import { TournamentType } from "../../Types/tournament";
import { getDate } from "../../Helpers/getDate";
import { initTournament } from "../../Helpers/initValues";
import Question from "../Elements/Question/Question";
import Back from "../Elements/Back/Back";
import { useParams } from "react-router-dom";
import SkeletonQuestion from "../Elements/Question/SkeletonQuestion";
import { _axios } from "../../Helpers/_axios";

const Tournament = () => {
  const [t, setT] = useState<TournamentType>(initTournament);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    _axios
      .get(`/tournaments/${id}`)
      .then((res) => {
        setT(res.data);
        setLoading(false);
      })
      .catch((e: any) => console.log(e.response.data.message));
  }, [id]);

  return (
    <main className="tournament__container">
      <div className="tournament__header">
        <div className="tournament__header-t">
          <h2>{t?.title}</h2>
          <p>
            <span>добавил </span>
            {t.uploader}
          </p>
        </div>
        <div className="tournament__header-m">
          <h3>
            Дата отыгрыша: <span>{getDate(t.date)}</span>
          </h3>
          <h3>
            Туры: <span>{t.tours}</span>
          </h3>
          <h3>
            Вопросы: <span>{t.questionsQuantity}</span>
          </h3>
        </div>
        <h3>
          Редакция:{" "}
          {t.editors.map((v, i) => (
            <span key={i}>
              {v}
              {i < t.editors.length - 1 ? "," : null}{" "}
            </span>
          ))}
        </h3>
      </div>
      <div className="tournament__content">
        <div className="back">
          <Back />
        </div>
        {loading && <SkeletonQuestion count={6} />}
        {!loading && t.questions.map((v) => <Question q={v} key={v.id} />)}
      </div>
    </main>
  );
};

export default Tournament;
