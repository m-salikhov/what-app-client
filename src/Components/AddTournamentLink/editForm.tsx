import { getDateYYYY_MM_DD } from '../../Helpers/getDate';
import { TournamentType } from '../../Types/tournament';
import Button from '../Elements/Button/Button';
import EditFormQuestion from './EditFormQuestion';
import { Action, actionTypes } from './helpers/reducer';

interface Props {
  t: TournamentType;
  dispatch: (action: Action) => void;
  setEdit: (edit: boolean) => void;
}

function EditForm({ t, dispatch, setEdit }: Props) {
  return (
    <main
      onKeyDown={(e) => {
        if (e.key === 'Enter' && e.ctrlKey) {
          setEdit(false);
        }
      }}
    >
      <Button
        title='Закончить редактирование'
        onClick={() => setEdit(false)}
      ></Button>
      <div className='edit-t'>
        <div className='edit-t-top'>
          {' '}
          <label className='edit-t-title'>
            <p> Название турнира</p>
            <input
              placeholder='Название турнира'
              type='text'
              onChange={(e) =>
                dispatch({ type: actionTypes.title, payload: e.target.value })
              }
              value={t.title}
            />
          </label>
          <label className='edit-t-date'>
            <p> Дата отыгрыша </p>
            <input
              type='date'
              value={getDateYYYY_MM_DD(t.date || Date.now())}
              onMouseDown={(e) => {
                e.preventDefault();
              }}
              onChange={(e) =>
                dispatch({
                  type: actionTypes.date,
                  payload: Date.parse(e.target.value),
                })
              }
            />
            <label className='edit-t-title'>
              <p>Редакторы (через точку с запятой без пробела!)</p>
              <textarea
                placeholder='Редакторская группа'
                onChange={(e) =>
                  dispatch({
                    type: actionTypes.editors,
                    payload: e.target.value,
                  })
                }
                value={t.editors.join(';')}
                rows={3}
              />
            </label>
          </label>
        </div>
        {t.questions.map((v) => (
          <EditFormQuestion q={v} dispatch={dispatch} key={v.id} />
        ))}
      </div>
    </main>
  );
}

export default EditForm;
