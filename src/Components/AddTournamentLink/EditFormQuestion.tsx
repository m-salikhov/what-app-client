import { useState } from 'react';
import { QuestionType } from '../../Types/question';
import { Action, actionTypes } from './helpers/reducer';
import Button from '../Elements/Button/Button';

interface Props {
  q: QuestionType;
  dispatch: (action: Action) => void;
}

const btnTextOption = {
  def: 'Удалить',
  back: 'Вернуть',
};

function EditFormQuestion({ q, dispatch }: Props) {
  const [btnText, setBtnText] = useState<string>(q.qNumber !== -1 ? btnTextOption.def : btnTextOption.back);

  const removeQuestion = () => {
    setBtnText((prev) => {
      return prev === btnTextOption.def ? btnTextOption.back : btnTextOption.def;
    });
    dispatch({
      type: actionTypes.remove,
      questionID: q.id,
      payload: '',
    });
  };

  return (
    <div className='edit-q-container'>
      <div className='edit-q-numbers'>
        <label className='edit-q-tour'>
          <p> Номер вопроса:</p>
          <input
            type='number'
            min={0}
            value={q.qNumber}
            onChange={(e) =>
              dispatch({
                type: actionTypes.qNumber,
                questionID: q.id,
                payload: +e.target.value,
              })
            }
          />
        </label>{' '}
        <label className='edit-q-tour'>
          <p> Номер тура:</p>
          <input
            type='number'
            min={0}
            value={q.tourNumber}
            onChange={(e) =>
              dispatch({
                type: actionTypes.tourNumber,
                questionID: q.id,
                payload: +e.target.value,
              })
            }
          />
        </label>{' '}
        <Button
          onClick={removeQuestion}
          title={btnText}
          extraClass={btnText === btnTextOption.def ? 'def' : 'back'}
        ></Button>
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
        />
      </label>
      <label>
        <p>Источник(и) (через точку с запятой!)</p>
        <textarea
          onChange={(e) =>
            dispatch({
              type: actionTypes.source,
              questionID: q.id,
              payload: e.target.value,
            })
          }
          value={q.source.join(';')}
          rows={3}
        />
      </label>
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
        />
      </label>
    </div>
  );
}

export default EditFormQuestion;
