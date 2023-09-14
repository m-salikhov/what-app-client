import { getDateYYYY_MM_DD } from "../../Helpers/getDate";
import { TournamentType } from "../../Types/tournament";
import Button from "../Elements/Button/Button";
import EditFotmQuestion from "./EditFotmQuestion";
import { Action, actionTypes } from "./helpers/reducer";

interface Props {
  t: TournamentType;
  dispatch: (action: Action) => void;
  setEdit: (edit: boolean) => void;
}

const EditForm = ({ t, dispatch, setEdit }: Props) => {
  return (
    <main
      onKeyDown={(e) => {
        if (e.key === "Enter" && e.ctrlKey) {
          setEdit(false);
        }
      }}
    >
      <Button
        title="Закончить редактирование"
        onClick={() => setEdit(false)}
      ></Button>
      <div className="edit-t">
        <div className="edit-t__top">
          {" "}
          <label className="edit-t__title">
            <p onClick={() => console.log(t)}> Название турнира</p>
            <input
              placeholder="Название турнира"
              type="text"
              onChange={(e) =>
                dispatch({ type: actionTypes.title, payload: e.target.value })
              }
              value={t.title}
            />
          </label>
          <label className="edit-t__date">
            <p> Дата отыгрыша </p>
            <input
              type="date"
              value={getDateYYYY_MM_DD(t.date)}
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
            <label className="edit-t__title">
              <p>Редакторы (через точку с запятой без пробела!)</p>
              <textarea
                placeholder="Редакторская группа"
                onChange={(e) =>
                  dispatch({
                    type: actionTypes.editors,
                    payload: e.target.value,
                  })
                }
                value={t.editors.join(";")}
                rows={3}
              />
            </label>
          </label>
        </div>
        {t.questions.map((v, i) => {
          return (
            <EditFotmQuestion q={v} index={i} dispatch={dispatch} key={i} />
          );
        })}
      </div>
    </main>
  );
};

export default EditForm;
