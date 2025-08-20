import styles from './edit-form.module.css';
import { useState } from 'react';
import { Action, actionTypes } from '../../helpers/reducer';
import { Button } from 'Shared/Components/UI/Button/Button';
import { QuestionType } from 'Shared/Schemas/TournamentSchema';

interface Props {
  q: QuestionType;
  dispatch: (action: Action) => void;
}

const btnTextOption = {
  del: 'Удалить',
  back: 'Вернуть',
};

export function EditFormQuestion({ q, dispatch }: Props) {
  const [btnText, setBtnText] = useState<string>(q.qNumber === -1 ? btnTextOption.back : btnTextOption.del);

  const removeQuestion = () => {
    setBtnText((prev) => {
      return prev === btnTextOption.del ? btnTextOption.back : btnTextOption.del;
    });
    dispatch({
      type: actionTypes.removeQuestion,
      questionID: q.id,
    });
  };

  return (
    <div
      className={btnText === btnTextOption.del ? styles.questionContainer : `${styles.questionContainer} ${styles.del}`}
    >
      <div className={styles.questionHeader}>
        <p>Номер вопроса: {q.qNumber}</p>
        <p>Номер тура: {q.tourNumber}</p>

        <Button onClick={removeQuestion} title={btnText}></Button>
      </div>

      <label>
        <p>Раздаточный материал(текст или ссылка на изображение)</p>
        <textarea
          onChange={(e) =>
            dispatch({
              type: actionTypes.add,
              questionID: q.id,
              payload: e.target.value,
            })
          }
          value={q.add}
          rows={q.add ? 3 : 1}
          disabled={q.qNumber === -1 ? true : false}
        />
      </label>

      <label>
        <p>Текст вопроса</p>
        <textarea
          onChange={(e) =>
            dispatch({
              type: actionTypes.text,
              questionID: q.id,
              payload: e.target.value,
            })
          }
          value={q.text}
          rows={5}
          disabled={q.qNumber === -1 ? true : false}
        />
      </label>

      <label>
        <p>Ответ</p>
        <textarea
          onChange={(e) => {
            dispatch({
              type: actionTypes.answer,
              questionID: q.id,
              payload: e.target.value,
            });
          }}
          value={q.answer}
          rows={1}
          disabled={q.qNumber === -1 ? true : false}
        />
      </label>

      <label>
        <p>Зачёт</p>
        <textarea
          onChange={(e) =>
            dispatch({
              type: actionTypes.alterAnswer,
              questionID: q.id,
              payload: e.target.value,
            })
          }
          value={q.alterAnswer}
          rows={1}
          disabled={q.qNumber === -1 ? true : false}
        />
      </label>

      <label>
        <p>Комментарий</p>
        <textarea
          onChange={(e) =>
            dispatch({
              type: actionTypes.comment,
              questionID: q.id,
              payload: e.target.value,
            })
          }
          value={q.comment}
          rows={q.comment ? 5 : 1}
          disabled={q.qNumber === -1 ? true : false}
        />
      </label>

      <p>Источник(и):</p>
      {q.source?.map((v, i) => {
        return (
          <div key={i} className={styles.questionSource}>
            <textarea
              title='Источник'
              onChange={(e) =>
                dispatch({
                  type: actionTypes.source,
                  questionID: q.id,
                  sourceID: v.id,
                  payload: e.target.value,
                })
              }
              value={v.link}
              disabled={q.qNumber === -1 ? true : false}
            />
            <p
              onClick={() => {
                if (q.source?.length === 1) return;
                dispatch({ type: actionTypes.removeSource, questionID: q.id, sourceID: v.id });
              }}
            >
              ❌
            </p>
          </div>
        );
      })}
      <button
        className={styles.addSource}
        onClick={() => dispatch({ type: actionTypes.addSource, questionID: q.id })}
        type='button'
        disabled={q.qNumber === -1 ? true : false}
      >
        Добавить источник
      </button>

      <label>
        <p>Автор(ы)</p>
        <textarea
          onChange={(e) =>
            dispatch({
              type: actionTypes.author,
              questionID: q.id,
              payload: e.target.value,
            })
          }
          value={q.author}
          rows={1}
          disabled={q.qNumber === -1 ? true : false}
        />
      </label>
    </div>
  );
}
