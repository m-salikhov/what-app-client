import { useState } from "react";
import { useParams } from "react-router-dom";
import "./playmode.scss";
import Start from "./PlayModeParts/Start";
import PMQuestion from "./PlayModeParts/PMQuestion/PMQuestion";
import TourEnd from "./PlayModeParts/End/TourEnd";
import End from "./PlayModeParts/End/End";
import { useTournamentById } from "../../Hooks/useTournamentById";

export enum Step {
  Start = "START",
  Question = "QUESTION",
  EndOfTour = "ENDOFTOUR",
  End = "END",
}

export type Result = {
  [key: number]: { num: number; ans: boolean }[];
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
      let qNumberInTour = qNumber;

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
        qNumberInTour = qNumber - sumPlayedQ;
      }

      res[tourNumber][qNumberInTour - 1] = { ans: answer, num: qNumber };
      return res;
    });
  };
  const handleQCounter = () => {
    setQCounter((prev) => prev + 1);
  };

  function PlayModeChange(stepName: string) {
    switch (stepName) {
      case Step.Start:
        return <Start t={t} setStep={setStep} />;
      case Step.Question:
        return (
          <PMQuestion
            handleQCounter={handleQCounter}
            handleAnswer={handleAnswer}
            q={t.questions[qCounter]}
            nextQTourNumber={t.questions[qCounter + 1]?.tourNumber}
            setStep={setStep}
          />
        );
      case Step.EndOfTour:
        return (
          <TourEnd
            handleQCounter={handleQCounter}
            setStep={setStep}
            result={result}
            endedTourNumber={t.questions[qCounter].tourNumber}
            t={t}
          />
        );
      case Step.End:
        return (
          <End
            result={result}
            endedTourNumber={t.questions[qCounter].tourNumber}
            t={t}
          />
        );
      default:
        return null;
    }
  }

  return (
    <main>
      <h2>{t.title}</h2>
      {PlayModeChange(step)}
    </main>
  );
};

export default PlayMode;
