import { useState } from "react";
import { TournamentType } from "../../../../Types/tournament";
import Button from "../../../Elements/Button/Button";
import QuestionPlane from "../../../Elements/Question/QuestionPlane";
import { ResultType, Step } from "../../PlayMode";
import ResBlock from "./ResBlock";
import TourTable from "./TourTable";

interface Props {
  handleQCounter(): void;
  setStep(step: Step): void;
  result: ResultType;
  endedTourNumber: number;
  t: TournamentType;
}

const TourEnd = ({
  handleQCounter,
  setStep,
  endedTourNumber,
  result,
  t,
}: Props) => {
  const onClick = () => {
    handleQCounter();
    setStep(Step.Question);
  };

  const [selectedQ, setSelectedQ] = useState(0);

  return (
    <div className="tourend">
      <ResBlock tour={endedTourNumber} res={result} tours={t.tours} />
      <TourTable res={result[endedTourNumber]} setSelectedQ={setSelectedQ} />
      <Button title="Следующий тур" onClick={onClick} />
      {Boolean(selectedQ) && <QuestionPlane q={t.questions[selectedQ - 1]} />}
    </div>
  );
};

export default TourEnd;
