import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { getDate } from "../../Helpers/getDate";
import Question from "../Elements/Question/Question";
import Back from "../Elements/Back/Back";
import SkeletonQuestion from "../Elements/Question/SkeletonQuestion";
import { useTournamentById } from "../../Hooks/useTournament";
import { useDocTitle } from "../../Hooks/useDocTitle";
import "./tournament.scss";
import { getTourAnchors, getToursParagraphs, scroll } from "./scrollLogic";

const Tournament = () => {
  const { id } = useParams();
  const { t, loading } = useTournamentById(id);
  const ref = useRef<HTMLDivElement>(null);
  const tourAnchors = getTourAnchors(t);

  useDocTitle(t.title);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

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
        <div className="tournament__content_header">
          {" "}
          <div className="back">
            <Back />
          </div>
          <div
            className="tournament__content_tours"
            onClick={(e) => scroll(e, ref.current, tourAnchors)}
          >
            {getToursParagraphs(t.tours)}
          </div>
        </div>
        <div className="tournament__content_qs" ref={ref}>
          {loading && <SkeletonQuestion count={6} />}
          {!loading && t.questions.map((v) => <Question q={v} key={v.id} />)}
        </div>
      </div>
    </main>
  );
};

export default Tournament;
