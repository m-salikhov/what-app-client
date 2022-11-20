import { FC, useState } from "react";
import { QuestionType } from "../../../Types/question";
import Add from "./Add";
import Answer from "./Answer";
import ansArrow from "./arrow_down.svg";

import "./question.scss";

const Question: FC<{ q: QuestionType; random?: boolean }> = ({ q, random }) => {
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
      </div>
      <div className={showAnswer ? "ans open" : "ans close"}>
        <Answer q={q} />
      </div>
    </div>
  );
};

export default Question;
