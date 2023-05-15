import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDate } from "../../Helpers/getDate";
import Question from "../Elements/Question/Question";
import Back from "../Elements/Back/Back";
import SkeletonQuestion from "../Elements/Question/SkeletonQuestion";
import { useTournamentById } from "../../Hooks/useTournament";
import "./tournament.scss";
import { useDocTitle } from "../../Hooks/useDocTitle";

const Tournament = () => {
  const { id } = useParams();
  const { t, loading } = useTournamentById(id);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useDocTitle(t.title);

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
          Редакция: <span>{t.editors.join(", ")}</span>
        </h3>
      </div>
      <div className="tournament__content">
        <div className="back">
          <Back />
        </div>
        {loading && <SkeletonQuestion count={6} />}
        {!loading && t.questions.map((v) => <Question q={v} key={v.answer} />)}
      </div>
    </main>
  );
};

export default Tournament;
