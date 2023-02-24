import { ChangeEvent, useState } from "react";
import { getDate } from "../../Helpers/getDate";
import { useAppDispatch, useAppSelector } from "../../Hooks/redux";
import { tournamentSlice } from "../../Store/reducers/TournamentSlice";
import { TournamentType } from "../../Types/tournament";

const AddTournamentInfo = () => {
  const dispatch = useAppDispatch();
  const s = useAppSelector((state) => state.tournamentReducer);

  const onChangeRTK = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "title") {
      dispatch(tournamentSlice.actions.setTitle(e.target.value));
      return;
    }
    if (e.target.type === "number") {
      const action = {
        field: e.target.name as "date" | "tours" | "questionsQuantity",
        value: +e.target.value,
      };
      dispatch(tournamentSlice.actions.setNumberField(action));
      return;
    }
    if (e.target.name === "date") {
      const action = {
        field: e.target.name as "date",
        value: Date.parse(e.target.value),
      };
      dispatch(tournamentSlice.actions.setNumberField(action));
      return;
    }
    if (e.target.name === "editors") {
      dispatch(tournamentSlice.actions.setEditors(e.target.value));
      return;
    }
  };

  console.log("Info");

  return (
    <div className="add-t">
      <div className="add-t__top">
        <label className="add-t__title">
          <p> Название турнира</p>
          <input
            name="title"
            placeholder="Название турнира"
            type="text"
            onChange={onChangeRTK}
            value={s.title}
          />
        </label>
        <label className="add-t__tours">
          <p> Кол-во туров</p>
          <input
            name="tours"
            type="number"
            onChange={onChangeRTK}
            value={s.tours}
          />
        </label>
        <label className="add-t__questionsQuantity">
          <p> Кол-во вопросов</p>
          <input
            name="questionsQuantity"
            type="number"
            onChange={onChangeRTK}
            value={s.questionsQuantity}
          />
        </label>
      </div>
      <div className="add-t__bottom">
        <label className="add-t__editors">
          <p> Редакторы(через запятую) </p>
          <input
            name="editors"
            placeholder="Редактор"
            type="text"
            onChange={onChangeRTK}
            value={s.editorsString}
          />
        </label>
        <label className="add-t__date">
          <p> Дата отыгрыша </p>
          <input
            name="date"
            type="date"
            onChange={onChangeRTK}
            onMouseDown={(e) => {
              e.preventDefault();
            }}
          />
        </label>
      </div>
    </div>
  );
};
export default AddTournamentInfo;
