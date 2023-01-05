import { FC } from "react";
import { QuestionType } from "../../../Types/question";
import { Step } from "../PlayMode";

interface Props {
  q: QuestionType;
  setQCounter(qNumber: number): void;
  setStep(step: Step): void;
  nextQTourNumber: number | undefined;
}

const PMQuestion: FC<Props> = ({
  q,
  setQCounter,
  nextQTourNumber,
  setStep,
}) => {
  function onClick() {
    if (typeof nextQTourNumber === "undefined") {
      setStep(Step.End);
    } else if (q.tourNumber !== nextQTourNumber) {
      setStep(Step.EndOfTour);
    } else setQCounter(q.qNumber++);
  }

  console.log("nextQTourNumber", nextQTourNumber);

  return (
    <main>
      {q.qNumber}
      {q.text}
      <div>
        <button onClick={onClick}>Следующий вопрос</button>
      </div>
    </main>
  );
};

export default PMQuestion;
