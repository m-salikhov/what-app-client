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

const PlayMode = () => {
  const { id } = useParams();
  const { t } = useTournamentById(id);
  const [step, setStep] = useState(Step.Start);
  const [qCounter, setQCounter] = useState(0);

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

  return PlayModeChange(step);
};

export default PlayMode;
