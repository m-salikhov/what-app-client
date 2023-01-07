import { useState } from "react";
import { QuestionType } from "../../../Types/question";
import Button from "../../Elements/Button/Button";
import Add from "../../Elements/Question/Add";
import Answer from "../../Elements/Question/Answer";
import { Result, Step } from "../PlayMode";
import Timer from "./Timer";

interface Props {
  q: QuestionType;
  setQCounter(qNumber: number): void;
  setStep(step: Step): void;
  nextQTourNumber: number | undefined;
  handleAnswer(tourNumber: number, qNumber: number, answer: boolean): void;
}

const PMQuestion = ({
  q,
  setQCounter,
  nextQTourNumber,
  setStep,
  handleAnswer,
}: Props) => {
  const [isTimeOver, setIsTimeOver] = useState(false);
  const [answerToQ, setAnswerToQ] = useState("");
  const [messageToQ, setMessageAnswerToQ] = useState("");

  const onClick = () => {
    if (!Boolean(answerToQ) && !isTimeOver) {
      setIsTimeOver(true);
      return;
    }
    if (!Boolean(answerToQ)) {
      setMessageAnswerToQ("Выберите ответ");
      return;
    }
    setAnswerToQ("");

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
            <Button
              onClick={() => {
                setAnswerToQ("Да");
                setMessageAnswerToQ("");
                handleAnswer(q.tourNumber, q.qNumber, true);
              }}
              title={"Да"}
            />
            <Button
              onClick={() => {
                setAnswerToQ("Нет");
                setMessageAnswerToQ("");
                handleAnswer(q.tourNumber, q.qNumber, false);
              }}
              title={"Нет"}
            />
          </div>
        </>
      )}
      {messageToQ && <p className="messageToQ">{messageToQ}</p>}
      <Button
        onClick={onClick}
        title={isTimeOver ? "Следующий вопрос" : "Готов ответ?"}
        extraClass={Boolean(answerToQ) ? "answered" : "notanswered"}
      />
    </div>
  );
};

export default PMQuestion;
