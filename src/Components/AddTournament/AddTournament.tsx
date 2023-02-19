import AddTournamentInfo from "./AddTournamentInfo";
import "./add.scss";
import { useState } from "react";
import AddQuestion from "./AddQuestion";
import { TournamentType } from "../../Types/tournament";
import { QuestionType } from "../../Types/question";
import { useAppSelector } from "../../Hooks/redux";
import { _axios } from "../../Helpers/_axios";
import { initTournament } from "../../Helpers/initValues";
import checkTournament from "../../Helpers/checkTournament";

const AddTournament = () => {
  const [tournament, setTournament] = useState<TournamentType>(initTournament);
  const [qCount, setqCount] = useState([1]);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [messageSuccess, setMessageSuccess] = useState("");
  const { currentUser } = useAppSelector((state) => state.userReducer);

  const handleChange = (field: Partial<TournamentType>) => {
    setTournament((prev) => ({ ...prev, ...field }));
  };
  const handleChangeQuestion = (q: QuestionType) => {
    const i = tournament.questions.findIndex((v) => v.qNumber === q.qNumber);
    if (i === -1) {
      const questions = [...tournament.questions, q];
      setTournament((prev) => ({ ...prev, questions }));
    } else {
      const questions = tournament.questions;
      questions[i] = q;
      setTournament((prev) => ({ ...prev, questions }));
    }
  };
  const addTournament = async () => {
    if (Boolean(messageSuccess)) {
      setMessageSuccess("");
      setTournament(initTournament);
      return;
    }

    setLoading(true);
    setErrors([]);
    const e = checkTournament(tournament);

    if (e) {
      setErrors(e);
      setLoading(false);
      return;
    }

    await _axios
      .post("/tournaments", {
        ...tournament,
        dateUpload: Date.now(),
        uploaderUuid: currentUser?.id,
        uploader: currentUser?.username,
      })
      .then((res) => {
        console.log("res", res);
        if (res.status === 201) {
          console.log("res.status", res.status);
          setMessageSuccess("Турнир сохранён");
          setLoading(false);
        }
      })
      .catch((e: any) => {
        console.log(e.response.data.message);
        setLoading(false);
      });
  };

  return (
    <main className="add__wrapper">
      <div className="add">
        <AddTournamentInfo handleChange={handleChange} />
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
          <button
            type="button"
            onClick={() => setqCount((p) => [...p, p.length + 1])}
          >
            <h3>Следующий вопрос</h3>
          </button>
        </div>
      </div>
    </main>
  );
};

export default AddTournament;
