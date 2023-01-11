import { useState } from "react";
import { TournamentType } from "../../../../Types/tournament";
import QuestionPlane from "../../../Elements/Question/QuestionPlane";
import { Result } from "../../PlayMode";
import ResBlock from "./ResBlock";
import TourTable from "./TourTable";

interface Props {
  result: Result;
  endedTourNumber: number;
  t: TournamentType;
}

const End = ({ endedTourNumber, result, t }: Props) => {
  const [selectedQ, setSelectedQ] = useState(0);

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

  return (
    <div className="endt">
      <ResBlock tour={endedTourNumber} res={result} />
      {renderResTables()}

      {Boolean(selectedQ) && <QuestionPlane q={t.questions[selectedQ - 1]} />}
    </div>
  );
};

export default End;
