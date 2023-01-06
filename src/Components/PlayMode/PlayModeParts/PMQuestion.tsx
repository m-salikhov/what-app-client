import { useState } from "react";
import { QuestionType } from "../../../Types/question";
import Button from "../../Elements/Button/Button";
import Add from "../../Elements/Question/Add";
import Answer from "../../Elements/Question/Answer";
import { Step } from "../PlayMode";
import Timer from "./Timer";

interface Props {
  q: QuestionType;
  setQCounter(qNumber: number): void;
  setStep(step: Step): void;
  nextQTourNumber: number | undefined;
}

const PMQuestion = ({ q, setQCounter, nextQTourNumber, setStep }: Props) => {
  const [isTimeOver, setIsTimeOver] = useState(false);
  const [answerToQ, setAnswerToQ] = useState("");

  const onClick = () => {
    setAnswerToQ("");

    if (!isTimeOver) {
      setIsTimeOver(true);
      return;
    }

    if (typeof nextQTourNumber === "undefined") {
      setStep(Step.End);
    } else if (q.tourNumber !== nextQTourNumber) {
      setStep(Step.EndOfTour);
    } else setQCounter(q.qNumber++);
    setIsTimeOver(false);
  };

  return (
    <div className="pmq">
      <h3>Вопрос {q.qNumber}</h3>
      <Timer setIsTimeOver={setIsTimeOver} qNumber={q.qNumber} />
      {q.add && <Add add={q.add} />}
      <p>{q.text}</p>

      {isTimeOver && <Answer q={q} />}
      {isTimeOver && (
        <>
          <p className="isanswer__header">
            {answerToQ ? `Ответ ${answerToQ} принят` : "Вам удалось ответить?"}
          </p>
          <div className="isanswer">
            <Button onClick={() => setAnswerToQ("Да")} title={"Да"} />
            <Button onClick={() => setAnswerToQ("Нет")} title={"Нет"} />
          </div>
        </>
      )}
      <Button
        onClick={onClick}
        title={isTimeOver ? "Следующий вопрос" : "Готов ответ?"}
      />
    </div>
  );
};

export default PMQuestion;
