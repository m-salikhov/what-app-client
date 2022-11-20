import { ChangeEvent, FC, useState } from "react";
import splitQuestion from "../../Helpers/splitQuestion";
import { QuestionType } from "../../Types/question";

interface AddQuestionProp {
  handleChangeQuestion: (q: QuestionType) => void;
  numberQuestion: number;
}

const getTourNumber = (n: number) => {
  if (n === 0) {
    return 0;
  } else if (n > 0 && n < 13) {
    return 1;
  } else if (n > 12 && n < 25) {
    return 2;
  } else {
    return 3;
  }
};

const AddQuestion: FC<AddQuestionProp> = ({
  handleChangeQuestion,
  numberQuestion,
}) => {
  const [question, setQuestion] = useState<QuestionType>({
    type: "regular",
    qNumber: numberQuestion,
    tourNumber: getTourNumber(numberQuestion),
    text: "",
    answer: "",
    source: [],
    author: "",
  });
  const [isSaved, setIsSaved] = useState(false);

  const onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setQuestion({ ...question, [e.target.name]: e.target.value });
    setIsSaved(false);
  };

  const onAddQ = () => {
    handleChangeQuestion(question);
    setIsSaved(true);
  };

  return (
    <div className="add-q">
      <button onClick={() => console.log("question", question)}>button</button>
      <div className="add-q__header">
        <label className="add-q__number">
          <p> Номер вопроса:</p>
          <input
            name="qNumber"
            type="text"
            onChange={onChange}
            defaultValue={numberQuestion}
          />
        </label>{" "}
        <label className="add-t__tour">
          <p> Номер тура:</p>
          <input
            name="tourNumber"
            type="text"
            onChange={onChange}
            defaultValue={getTourNumber(numberQuestion)}
          />
        </label>{" "}
        <label>
          {" "}
          <p>Тип вопроса:</p>
          <select name="type" onChange={onChange}>
            <option defaultValue="regular" value="regular">
              Обычный
            </option>
            <option value="double">Дуплет</option>
            <option value="triple">Блиц</option>
            <option value="other">Другой</option>
            <option value="outside">Вне турнира</option>
          </select>
        </label>
      </div>
      <div className="add-q__addition ">
        <label>
          <p> Раздатка:</p>
          <input
            name="add"
            placeholder="Ссылка на изображение или текст раздатки"
            type="text"
            onChange={onChange}
          />
        </label>
      </div>
      <div className="add-q__text">
        <p>Текст вопроса:</p>
        <textarea
          rows={4}
          placeholder="Введите текст вопроса..."
          onChange={(e) =>
            setQuestion((prev) => {
              setIsSaved(false);
              return {
                ...prev,
                ...splitQuestion(e.target.value),
              };
            })
          }
          name="text"
        />
      </div>

      <div className="add-q__footer">
        <button
          type="button"
          className={isSaved ? "save" : undefined}
          onClick={onAddQ}
        >
          {isSaved ? "Вопрос добавлен" : "Добавить вопрос"}
        </button>
      </div>
    </div>
  );
};

export default AddQuestion;
