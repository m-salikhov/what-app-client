import { ChangeEvent, useEffect, useState } from "react";
import { initQuestion } from "../../Helpers/initValues";
import splitQuestion from "../../Helpers/splitQuestion";
import { QuestionType } from "../../Types/question";
import { useAppDispatch, useAppSelector } from "../../Hooks/redux";
import { questionsSlice } from "../../Store/reducers/QuestionsSlice";

interface AddQuestionProp {
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

const AddQuestion = ({ numberQuestion }: AddQuestionProp) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      questionsSlice.actions.setInitQuestion({
        ...initQuestion,
        tourNumber: getTourNumber(numberQuestion),
        qNumber: numberQuestion,
      })
    );
    dispatch(
      questionsSlice.actions.setIsSaved({ numberQuestion, value: false })
    );
  }, []);

  const [question, setQuestion] = useState<QuestionType>({
    ...initQuestion,
    tourNumber: getTourNumber(numberQuestion),
    qNumber: numberQuestion,
  });

  const isSaved = useAppSelector(
    (state) => state.questionsReducer.isSaved[numberQuestion - 1]
  );
  const rawText = useAppSelector(
    (state) => state.questionsReducer[numberQuestion]
  );

  const onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setQuestion({ ...question, [e.target.name]: e.target.value });
    // setIsSaved(false);
  };

  const onChangeRTK = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    if (e.target.name === "text") {
      dispatch(
        questionsSlice.actions.setRawText({
          numberQuestion,
          text: e.target.value,
        })
      );
    }
  };

  const onAddQ = async () => {
    const qSplited = await splitQuestion(rawText);
    dispatch(
      questionsSlice.actions.setQuestion({
        numberQuestion,
        q: qSplited as QuestionType,
      })
    );
  };
  const stateQ = useAppSelector((state) => state.questionsReducer);
  console.log("stateQ", stateQ);
  return (
    <div className="add-q">
      <div className="add-q__header">
        <div className="add-q__number">
          <p>
            {" "}
            Номер вопроса: <span> {numberQuestion}</span>{" "}
          </p>
        </div>{" "}
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
          onChange={onChangeRTK}
          value={rawText}
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
