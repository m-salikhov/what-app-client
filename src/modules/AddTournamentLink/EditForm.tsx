import { parseDate } from '@internationalized/date';
import { getDateYYYY_MM_DD } from '../../Common/Helpers/getDate';
import { TournamentType } from '../../Common/Types/tournament';
import Button from '../Elements/Button/Button';
import EditFormQuestion from './EditFormQuestion';
import { Action, actionTypes } from './helpers/reducer';
import { DateField, Label, DateInput, DateSegment } from 'react-aria-components';

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
      <Button title='Закончить редактирование' onClick={() => setEdit(false)} />

      <div className='edit-t'>
        <div className='edit-t-top'>
          <label className='edit-t-title'>
            <p> Название турнира</p>
            <input
              placeholder='Название турнира'
              type='text'
              onChange={(e) => dispatch({ type: actionTypes.title, payload: e.target.value })}
              value={t.title}
            />
          </label>

          <DateField
            onChange={(e) => {
              dispatch({
                type: actionTypes.date,
                payload: e && e.year > 1900 ? Date.parse(e.toString()) : 0,
              });
            }}
            defaultValue={t.date ? parseDate(getDateYYYY_MM_DD(t.date)) : null}
          >
            <Label>Дата отыгрыша</Label>
            <DateInput>{(segment) => <DateSegment segment={segment} />}</DateInput>
          </DateField>

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
        </div>

        {t.questions.map((v) => (
          <EditFormQuestion q={v} dispatch={dispatch} key={v.id} />
        ))}
      </div>
    </main>
  );
}

export default EditForm;
