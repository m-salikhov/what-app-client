import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { _axios } from "../../../../Helpers/_axios";
import { useAppSelector } from "../../../../Hooks/redux";
import { TournamentType } from "../../../../Types/tournament";
import Button from "../../../Elements/Button/Button";
import QuestionPlane from "../../../Elements/Question/QuestionPlane";
import { ResultType } from "../../PlayMode";
import ResBlock from "./ResBlock";
import TourTable from "./TourTable";

interface Props {
  result: ResultType;
  endedTourNumber: number;
  t: TournamentType;
}

const End = ({ endedTourNumber, result, t }: Props) => {
  const [selectedQ, setSelectedQ] = useState(0);
  const [isResultSaved, setIsResultSaved] = useState(false);
  const navigate = useNavigate();
  const userResult = { res: 0 };
  const { currentUser } = useAppSelector((state) => state.userReducer);

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
        resultNumber: userResult.res,
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
  }, [
    userResult.res,
    t.questionsQuantity,
    t.id,
    t.title,
    currentUser.id,
    result,
  ]);

  return (
    <div className="endt">
      <ResBlock
        tour={endedTourNumber}
        res={result}
        tours={t.tours}
        userResult={userResult}
      />
      {renderResTables()}
      {isResultSaved && <p>Ваш результат доступен в Профиле</p>}
      <Button title="К выбору турнира" onClick={() => navigate("/playmode")} />
      {Boolean(selectedQ) && <QuestionPlane q={t.questions[selectedQ - 1]} />}
    </div>
  );
};

export default End;
