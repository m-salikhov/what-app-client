import { QuestionType } from "../../Types/question";
import { Action } from "./helpers/reducer";

interface Props {
  q: QuestionType;
  index: number;
  dispatch: (action: Action) => void;
}

const EditFotmQuestion = ({ q, index, dispatch }: Props) => {
  return (
    <div className="edit-q__container">
      <div className="edit-q__numbers">
        <label className="edit-q__tour">
          <p> Номер вопроса:</p>
          <input
            name="qNumber"
            type="number"
            min={0}
            value={q.qNumber}
            onChange={(e) =>
              dispatch({ type: "qNumber", index, payload: +e.target.value })
            }
          />
        </label>{" "}
        <label className="edit-q__tour">
          <p> Номер тура:</p>
          <input
            name="tourNumber"
            type="number"
            min={0}
            value={q.tourNumber}
            onChange={(e) =>
              dispatch({ type: "tourNumber", index, payload: +e.target.value })
            }
          />
        </label>{" "}
      </div>
      <label>
        <p>Раздаточный материал(текст или ссылка на изображение)</p>
        <textarea
          onChange={(e) =>
            dispatch({ type: "add", index, payload: e.target.value })
          }
          value={q.add}
          rows={q.add ? 3 : 1}
        />
      </label>
      <label>
        <p>Текст вопроса</p>
        <textarea
          onChange={(e) => {
            dispatch({ type: "text", index, payload: e.target.value });
          }}
          value={q.text}
          rows={5}
        />
      </label>
      <label>
        <p>Ответ</p>
        <textarea
          onChange={(e) =>
            dispatch({ type: "answer", index, payload: e.target.value })
          }
          value={q.answer}
          rows={1}
        />
      </label>
      <label>
        <p>Зачёт</p>
        <textarea
          onChange={(e) =>
            dispatch({ type: "alterAnswer", index, payload: e.target.value })
          }
          value={q.alterAnswer}
          rows={1}
        />
      </label>
      <label>
        <p>Комментарий</p>
        <textarea
          onChange={(e) =>
            dispatch({ type: "comment", index, payload: e.target.value })
          }
          value={q.comment}
          rows={q.comment ? 5 : 1}
        />
      </label>
      <label>
        <p>Источник(и) (через точку с запятой!)</p>
        <textarea
          onChange={(e) =>
            dispatch({ type: "source", index, payload: e.target.value })
          }
          value={q.source.join(";")}
          rows={3}
        />
      </label>
      <label>
        <p>Автор(ы)</p>
        <textarea
          onChange={(e) =>
            dispatch({ type: "author", index, payload: e.target.value })
          }
          value={q.author}
          rows={1}
        />
      </label>
    </div>
  );
};

export default EditFotmQuestion;
