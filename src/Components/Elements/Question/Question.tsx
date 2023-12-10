import { useState } from "react";
import { QuestionType } from "../../../Types/question";
import Add from "./Add";
import Answer from "./Answer";
import { AiOutlineDown } from "react-icons/ai";
import "./question.scss";
import { Link } from "react-router-dom";

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
        {random && <Link to={`tournament/${q.tournament?.id}`}>{q.tournament?.title}</Link>}
        {!random && <h3>Тур {q.tourNumber}</h3>}
      </div>
      {q.add && <Add add={q.add} />}
      <div className="question__text">
        <p>{q.text}</p>
      </div>

      <div className="ans__arrow" onClick={() => setShowAnswer(!showAnswer)}>
        <h4>Ответ</h4>
        <AiOutlineDown className={showAnswer ? "test__o" : "test__c"} size={"30px"} />
      </div>
      <div className={showAnswer ? "ans open" : "ans close"}>
        <Answer q={q} />
      </div>
    </div>
  );
};

export default Question;
