import { ChangeEvent, FC, useState } from "react";
import { TournamentType } from "../../Types/tournament";

interface AddTournamentInfoProp {
  handleChange: (field: Partial<TournamentType>) => void;
}

const AddTournamentInfo: FC<AddTournamentInfoProp> = ({ handleChange }) => {
  const [editors, setEditors] = useState<string[]>([]);
  const [editorsCount, setEditorsCount] = useState([1]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "date") {
      handleChange({ [e.target.name]: Date.parse(e.target.value) });
    } else handleChange({ [e.target.name]: e.target.value });
  };
  return (
    <div className="add-t">
      <div className="add-t__top">
        <label className="add-t__title">
          <p> Название турнира</p>
          <input
            name="title"
            placeholder="Название турнира"
            type="text"
            onChange={onChange}
          />
        </label>
        <label className="add-t__tours">
          <p> Кол-во туров</p>
          <input name="tours" type="text" onChange={onChange} />
        </label>
        <label className="add-t__questionsQuantity">
          <p> Кол-во вопросов</p>
          <input name="questionsQuantity" type="text" onChange={onChange} />
        </label>
      </div>
      <div className="add-t__bottom">
        <label className="add-t__editors">
          <p> Редакторы </p>
          {editorsCount.map((v, i) => (
            <input
              key={v}
              name="editors"
              placeholder="Редактор"
              type="text"
              onChange={(e) => {
                editors[i] = e.target.value;
                handleChange({ editors: editors });
                setEditors(editors);
              }}
            />
          ))}
        </label>
        <label className="add-t__date">
          <p> Дата отыгрыша </p>
          <input
            name="date"
            type="date"
            onChange={onChange}
            onMouseDown={(e) => {
              e.preventDefault();
            }}
          />
        </label>
      </div>
      <p
        onClick={() => {
          setEditorsCount((p) => [...p, p.length + 1]);
        }}
      >
        Добавить редактора +
      </p>
    </div>
  );
};

export default AddTournamentInfo;
