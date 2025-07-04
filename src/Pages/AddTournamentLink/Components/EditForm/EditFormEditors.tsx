import styles from './edit-form.module.css';
import { TournamentType } from 'Shared/Schemas/TournamentSchema';
import { Action, actionTypes } from '../../helpers/reducer';

interface Props {
  editors: TournamentType['editors'];
  dispatch: (action: Action) => void;
}
export function EditFormEditors({ editors, dispatch }: Props) {
  return (
    <div className={styles.editors}>
      <p>Редактор(ы):</p>

      {editors.map((editor) => (
        <div key={editor.id}>
          {' '}
          <textarea
            placeholder='Редактор'
            onChange={(e) =>
              dispatch({
                type: actionTypes.editors,
                editorID: editor.id,
                payload: e.target.value,
              })
            }
            value={editor.name}
            rows={1}
          />
          <p
            onClick={() => {
              if (editors.length === 1) return;
              dispatch({ type: actionTypes.removeEditor, editorID: editor.id });
            }}
          >
            ❌
          </p>
        </div>
      ))}

      <button type='button' title='Добавить редактора' onClick={() => dispatch({ type: actionTypes.addEditor })}>
        Добавить редактора
      </button>
    </div>
  );
}
