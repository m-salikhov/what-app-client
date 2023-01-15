import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const userResult = { res: 0 };

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
    console.log("res 1", userResult);

    return () => {
      console.log("res 2", userResult);
    };
  }, []);

  return (
    <div className="endt">
      <ResBlock
        tour={endedTourNumber}
        res={result}
        tours={t.tours}
        userResult={userResult}
      />
      {renderResTables()}
      <Button title="К выбору турнира" onClick={() => navigate("/playmode")} />
      <Button
        title="Result"
        onClick={() => console.log("userResult", userResult)}
      />

      {Boolean(selectedQ) && <QuestionPlane q={t.questions[selectedQ - 1]} />}
    </div>
  );
};

export default End;
