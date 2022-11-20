import AddTournamentInfo from "./AddTournamentInfo";
import "./add.scss";
import { useState } from "react";
import AddQuestion from "./AddQuestion";
import { TournamentType } from "../../Types/tournament";
import { QuestionType } from "../../Types/question";
import { useAppSelector } from "../../Hooks/redux";
import { _axios } from "../../Helpers/_axios";
import { initTournament } from "../../Helpers/initValues";

const AddTournament = () => {
  const [tournament, setTournament] = useState<TournamentType>(initTournament);
  const [qCount, setqCount] = useState([1]);
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
    await _axios.post("/tournaments", {
      ...tournament,
      dateUpload: Date.now(),
      uploaderUuid: currentUser?.id,
      uploader: currentUser?.username,
    });
  };

  console.log("tournament", tournament);

  return (
    <main className="add__wrapper">
      <div className="add">
        <AddTournamentInfo handleChange={handleChange} />
        <div className="add-t__button">
          <button onClick={addTournament}>
            <h3>Отправить турнир</h3>
          </button>
        </div>
        <div className="add__questions">
          {qCount.map((v) => {
            return (
              <AddQuestion
                key={v}
                numberQuestion={v}
                handleChangeQuestion={handleChangeQuestion}
              />
            );
          })}
        </div>
        <div className="add-q__button">
          {" "}
          <button onClick={() => setqCount((p) => [...p, p.length + 1])}>
            <h3>Следующий вопрос</h3>
          </button>
        </div>
      </div>
    </main>
  );
};

export default AddTournament;
