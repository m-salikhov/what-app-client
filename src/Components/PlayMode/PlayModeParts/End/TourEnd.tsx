import { TournamentType } from "../../../../Types/tournament";
import Button from "../../../Elements/Button/Button";
import { Result, Step } from "../../PlayMode";
import TourTable from "./TourTable";

interface Props {
  handleQCounter(): void;
  setStep(step: Step): void;
  result: Result;
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
  const calcTourResult = (tour: number, res: Result) => {
    const tourResArrBoolean = res[tour];
    let count = 0;
    tourResArrBoolean.forEach((v) => {
      if (v.ans) count++;
    });
    return [count, res[tour].length];
  };

  const calcFullResult = (res: Result) => {
    let countTrue = 0;
    let countAll = 0;
    for (const tour in res) {
      res[tour].forEach((v) => {
        countAll++;
        if (v.ans) countTrue++;
      });
    }
    return [countTrue, countAll];
  };

  const [TourCount, TourLength] = calcTourResult(endedTourNumber, result);
  const [TourneyCount, TourneyLength] = calcFullResult(result);

  return (
    <div className="tourend">
      <div className="resblock">
        <p>
          {`Результат ${endedTourNumber}-го тура:`}
          <span>{`${TourCount} из ${TourLength}`}</span>{" "}
        </p>
        {endedTourNumber > 1 && (
          <p>
            {`Результат общий:`}
            <span>{`${TourneyCount} из ${TourneyLength}`}</span>{" "}
          </p>
        )}
      </div>
      <TourTable res={result[endedTourNumber]} />
      <Button title="Следующий тур" onClick={onClick} />
    </div>
  );
};

export default TourEnd;
