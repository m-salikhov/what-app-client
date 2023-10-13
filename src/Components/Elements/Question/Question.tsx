import { useState } from "react";
import { QuestionType } from "../../../Types/question";
import Add from "./Add";
import Answer from "./Answer";
import { AiOutlineDown } from "react-icons/ai";
import "./question.scss";

interface Props {
  q: QuestionType;
  random?: boolean;
}

const Question = ({ q, random }: Props) => {
  const [showAnswer, setShowAnswer] = useState(false);
  return (
    <div className="question">
      <div className="question__header">
        <h3>Вопрос {q.qNumber}</h3>
        {random && <h4>из {q.tournament?.title}</h4>}
        {!random && <h3>Тур {q.tourNumber}</h3>}
      </div>
      {q.add && <Add add={q.add} />}
      <div className="question__text">
        <p>{q.text}</p>
      </div>

      <div className="ans__arrow" onClick={() => setShowAnswer(!showAnswer)}>
        <h4>Oтвет</h4>
        <AiOutlineDown
          className={showAnswer ? "test__o" : "test__c"}
          size={"30px"}
        />
      </div>
      <div className={showAnswer ? "ans open" : "ans close"}>
        <Answer q={q} />
      </div>
    </div>
  );
};

export default Question;
