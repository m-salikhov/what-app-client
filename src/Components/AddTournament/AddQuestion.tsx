import { ChangeEvent, useEffect, useState } from "react";
import { initQuestion } from "../../Helpers/initValues";
import splitQuestion from "../../Helpers/splitQuestion";
import { QuestionType } from "../../Types/question";
import { useAppDispatch, useAppSelector } from "../../Hooks/redux";
import { questionsSlice } from "../../Store/reducers/QuestionsSlice";

interface AddQuestionProp {
  numberQuestion: number;
}

const AddQuestion = ({ numberQuestion }: AddQuestionProp) => {
  const dispatch = useAppDispatch();
  //Номер тура для данного вопроса при стандартном размере тура в 12
  const tourNumber = Math.ceil(numberQuestion / 12);

  const isSaved = useAppSelector(
    (state) => state.questionsReducer.isSaved[numberQuestion - 1]
  );
  const rawText = useAppSelector(
    (state) => state.questionsReducer[numberQuestion]
  );
  const add = useAppSelector(
    (state) => state.questionsReducer.questions[numberQuestion - 1]?.add
  );
  const type = useAppSelector(
    (state) => state.questionsReducer.questions[numberQuestion - 1]?.type
  );

  useEffect(() => {
    dispatch(
      questionsSlice.actions.setInitQuestion({
        ...initQuestion,
        tourNumber,
        qNumber: numberQuestion,
      })
    );
    dispatch(
      questionsSlice.actions.setIsSaved({ numberQuestion, value: false })
    );
  }, []);

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
    } else {
      dispatch(
        questionsSlice.actions.setQuestionField({
          numberQuestion,
          field: e.target.name,
          value: e.target.value,
        })
      );
    }
  };

  const onAddQ = () => {
    const qSplited = splitQuestion(rawText);
    dispatch(
      questionsSlice.actions.setQuestion({
        numberQuestion,
        q: qSplited as QuestionType,
      })
    );
  };
  console.log("Q", numberQuestion);
  return (
    <div className="add-q">
      <div className="add-q__header">
        <div className="add-q__number">
          <p>
            {" "}
            Номер вопроса: <span>{numberQuestion}</span>{" "}
          </p>
        </div>{" "}
        <label className="add-t__tour">
          <p> Номер тура:</p>
          <input
            name="tourNumber"
            type="text"
            // onChange={onChange}
            defaultValue={tourNumber}
          />
        </label>{" "}
        <label>
          {" "}
          <p>Тип вопроса:</p>
          <select name="type" onChange={onChangeRTK}>
            <option defaultValue="regular" value={type}>
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
            onChange={onChangeRTK}
            value={add}
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
