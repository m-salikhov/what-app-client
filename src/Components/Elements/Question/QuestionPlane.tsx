import { QuestionType } from "../../../Types/question";
import Add from "./Add";
import Answer from "./Answer";
import "./question.scss";

interface Props {
  q: QuestionType;
}

const QuestionPlane = ({ q }: Props) => {
  return (
    <div className="question">
      <div className="question__header">
        <h3>Вопрос {q.qNumber}</h3>
        <h3>Тур {q.tourNumber}</h3>
      </div>
      {q.add && <Add add={q.add} />}
      <div className="question__text">
        <p>{q.text}</p>
      </div>

      <Answer q={q} />
    </div>
  );
};

export default QuestionPlane;
