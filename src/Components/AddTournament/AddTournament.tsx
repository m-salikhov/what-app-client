import { useEffect, useState } from "react";
import { _axios } from "../../Helpers/_axios";
import { useAppDispatch, useAppSelector } from "../../Hooks/redux";
import { questionsSlice } from "../../Store/reducers/QuestionsSlice";
import { tournamentSlice } from "../../Store/reducers/TournamentSlice";
import checkTournament from "../../Helpers/checkTournament";
import AddQuestion from "./AddQuestion";
import AddTournamentInfo from "./AddTournamentInfo";
import { TournamentType } from "../../Types/tournament";
import "./add.scss";
import { AxiosError } from "axios";
import { useDocTitle } from "../../Hooks/useDocTitle";

const AddTournament = () => {
  useDocTitle("Добавить турнир");
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.userReducer);

  const [qCount, setqCount] = useState([1]);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [messageSuccess, setMessageSuccess] = useState("");

  //состояние для сохранения. Из компонентов AddTournamentInfo и AddQuestion
  const tournamentInfo = useAppSelector((state) => state.tournamentReducer);
  const questions = useAppSelector((state) => state.questionsReducer.questions);

  const nextQuestionForm = () => {
    if (qCount[qCount.length - 1] < tournamentInfo.questionsQuantity) {
      setqCount((p) => [...p, p.length + 1]);
      setErrors([]);
    } else setErrors((prev) => [...prev, "Максимальное количество вопросов"]);
  };

  const addTournament = () => {
    //турнир на отправку
    const t: TournamentType = {
      ...tournamentInfo,
      questions,
      uploader: currentUser?.username,
      uploaderUuid: currentUser?.id as string,
      dateUpload: Date.now(),
    };

    if (Boolean(messageSuccess)) {
      setMessageSuccess("");
      dispatch(tournamentSlice.actions.resetState());
      dispatch(questionsSlice.actions.resetState());
      setqCount([1]);
      return;
    }

    setLoading(true);
    setErrors([]);
    const e = checkTournament(t);
    if (e) {
      setErrors(e);
      setLoading(false);
      return;
    }

    _axios
      .post("/tournaments", t)
      .then((res) => {
        if (res.status === 201) {
          console.log("res.status", res.status);
          setMessageSuccess("Турнир сохранён");
          setLoading(false);
        }
      })
      .catch((e: AxiosError) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    return () => {
      dispatch(tournamentSlice.actions.resetState());
      dispatch(questionsSlice.actions.resetState());
    };
  }, [dispatch]);

  return (
    <main className="add__wrapper">
      <div className="add">
        <AddTournamentInfo />
        <div className="add-t__button">
          <button
            type="button"
            onClick={addTournament}
            className={loading ? "loading-t" : undefined}
          >
            <h3>
              {Boolean(messageSuccess)
                ? "Добавить ещё турнир"
                : "Отправить турнир"}
            </h3>
          </button>
          {errors.length > 0 && errors.map((e, i) => <p key={i}>{e}</p>)}
          {messageSuccess && <p>{messageSuccess}</p>}
        </div>
        <div className="add__questions">
          {qCount.map((v) => {
            return <AddQuestion key={v} numberQuestion={v} />;
          })}
        </div>
        <div className="add-q__button">
          {" "}
          <button type="button" onClick={nextQuestionForm}>
            <h3>Следующий вопрос</h3>
          </button>
        </div>
      </div>
    </main>
  );
};

export default AddTournament;
