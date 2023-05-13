import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { _axios } from "../../../../Helpers/_axios";
import { useAppSelector } from "../../../../Hooks/redux";
import Button from "../../../Elements/Button/Button";
import QuestionPlane from "../../../Elements/Question/QuestionPlane";
import ResBlock from "./ResBlock";
import TourTable from "./TourTable";

const End = () => {
  const [selectedQ, setSelectedQ] = useState(0);
  const [isResultSaved, setIsResultSaved] = useState(false);
  const navigate = useNavigate();

  const { t, qCounter, result, answeredCount } = useAppSelector(
    (state) => state.playModeReducer
  );
  const { currentUser } = useAppSelector((state) => state.userReducer);

  const endedTourNumber = t.questions[qCounter].tourNumber;

  const renderResTables = () => {
    let resTables = [];
    for (let i = 1; i <= endedTourNumber; i++) {
      resTables.push(
        <TourTable
          res={result[i]}
          setSelectedQ={setSelectedQ}
          key={result[i][0].num}
        />
      );
    }
    return resTables;
  };

  useEffect(() => {
    if (currentUser.id) {
      const data = {
        userId: currentUser.id,
        title: t.title,
        tournamentId: t.id,
        tournamentLength: t.questionsQuantity,
        resultNumber: answeredCount,
        result,
      };

      _axios
        .post("/users/userresult", data)
        .then((res) => {
          if (res.status === 201) {
            setIsResultSaved(true);
          }
        })
        .catch((e: AxiosError) => console.log("e", e));
    }
  }, [t.questionsQuantity, t.id, t.title, currentUser.id, result]);

  return (
    <div className="endt">
      <ResBlock />
      {renderResTables()}
      {isResultSaved && <p>Ваш результат доступен в Профиле</p>}
      <Button title="К выбору турнира" onClick={() => navigate("/playmode")} />
      {Boolean(selectedQ) && <QuestionPlane q={t.questions[selectedQ - 1]} />}
    </div>
  );
};

export default End;
