import { FC, useState } from "react";
import { QuestionType } from "../../../Types/question";
import { Step } from "../PlayMode";
import Timer from "./Timer";

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
    setIsTimeOver(false);
  }
  const [isTimeOver, setIsTimeOver] = useState(false);
  console.log("isTimeOver", isTimeOver);
  return (
    <main>
      <Timer setIsTimeOver={setIsTimeOver} qNumber={q.qNumber} />
      {q.text}
      <div>
        <button onClick={onClick}>Следующий вопрос</button>
      </div>
      {isTimeOver && <h2>Время вышло</h2>}
    </main>
  );
};

export default PMQuestion;
