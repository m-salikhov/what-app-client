import { useState } from "react";
import { useParams } from "react-router-dom";
import "./playmode.scss";
import Start from "./PlayModeParts/Start";
import PMQuestion from "./PlayModeParts/PMQuestion";
import TourEnd from "./PlayModeParts/TourEnd";
import End from "./PlayModeParts/End";
import { useTournamentById } from "../../Hooks/useTournamentById";

export enum Step {
  Start = "START",
  Question = "QUESTION",
  EndOfTour = "ENDOFTOUR",
  End = "END",
}

export type Result = {
  [key: number]: boolean[];
};

const PlayMode = () => {
  const { id } = useParams();
  const { t } = useTournamentById(id);
  const [step, setStep] = useState(Step.Start);
  const [qCounter, setQCounter] = useState(0);
  const [result, setResult] = useState<Result>({});

  const handleAnswer = (
    tourNumber: number,
    qNumber: number,
    answer: boolean
  ) => {
    setResult((prev) => {
      const res = { ...prev };

      if (typeof res[tourNumber] === "undefined") {
        res[tourNumber] = [];
      }

      //Высчитывает положение вопроса в отдельном туре(кроме первого тура)
      if (tourNumber > 1) {
        let i = tourNumber - 1;
        let sumPlayedQ = 0;
        while (i > 0) {
          sumPlayedQ = sumPlayedQ + res[i].length;
          i--;
        }
        qNumber = qNumber - sumPlayedQ;
      }

      res[tourNumber][qNumber - 1] = answer;
      return res;
    });
  };

  function PlayModeChange(stepName: string) {
    switch (stepName) {
      case Step.Start:
        return <Start t={t} setStep={setStep} />;
      case Step.Question:
        return (
          <PMQuestion
            q={t.questions[qCounter]}
            setQCounter={setQCounter}
            setStep={setStep}
            nextQTourNumber={t.questions[qCounter + 1]?.tourNumber}
            handleAnswer={handleAnswer}
          />
        );
      case Step.EndOfTour:
        return (
          <TourEnd
            setQCounter={setQCounter}
            qCounter={qCounter}
            setStep={setStep}
          />
        );
      case Step.End:
        return <End />;
      default:
        return null;
    }
  }

  console.log("result", result);

  return (
    <main>
      <h2>{t.title}</h2>
      {PlayModeChange(step)}
    </main>
  );
};

export default PlayMode;
