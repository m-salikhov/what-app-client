import { FC } from "react";
import { QuestionType } from "../../../Types/question";

const Answer: FC<{ q: QuestionType }> = ({ q }) => {
  return (
    <div className="answer">
      <p>
        <span>Ответ:</span> {q.answer}
      </p>
      {q.alterAnswer && (
        <p>
          <span>Зачёт:</span> {q.alterAnswer}
        </p>
      )}
      {q.comment && (
        <p>
          <span>Комментарий:</span> {q.comment}
        </p>
      )}
      {q.source?.length === 1 && (
        <p className="answer__source--one">
          <span>Источник:</span> {q.source}
        </p>
      )}
      {q.source && q.source.length > 1 && (
        <div>
          <p className="answer__source--many">Источники:</p>
          {q.source.map((v, i) => {
            return (
              <p key={i}>
                {++i}. {v}
              </p>
            );
          })}
        </div>
      )}
      <p>
        <span>Автор:</span> {q.author}
      </p>
    </div>
  );
};

export default Answer;
