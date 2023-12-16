import { ChangeEvent, MouseEvent, useRef, useState } from "react";
import { TournamentShortType } from "../../Types/tournament";
import LineAll from "./LineAll";
import { sortFunction } from "./helpers/sortFunction";
import chart from "./bar_chart.svg";
import { useDocTitle } from "../../Hooks/useDocTitle";
import "./all.scss";
import useTournamentsShort from "./hooks/useTournamentsShorts";
import filterTournamentsShort from "./helpers/filterTournamentsShort";

type FieldName = keyof Omit<TournamentShortType, "id">;

const All = () => {
  useDocTitle("Все турниры");

  const { setTournamentsShorts, tournamentsShorts } = useTournamentsShort();
  const field = useRef("");
  const [search, setSearch] = useState("");

  function handleSort(e: MouseEvent<HTMLDivElement>) {
    const className = e.currentTarget.className as FieldName;
    if (field.current === className) {
      setTournamentsShorts((prev) => [...prev.reverse()]);
    } else {
      setTournamentsShorts((prev) => sortFunction(prev, className));
      field.current = className;
    }
  }
  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  return (
    <main>
      <label className="all_search">
        <p>поиск</p>
        <input type="text" autoFocus onChange={handleSearch} />
      </label>
      <div className="table">
        <div className="table__header">
          <div className="table__header_t">№</div>
          <div className="table__header_t">
            Название{" "}
            <div className="title" onClick={handleSort}>
              <img src={chart} alt="сортировать" />
            </div>{" "}
          </div>
          <div className="table__header_t">
            Дата{" "}
            <div className="date" onClick={handleSort}>
              <img src={chart} alt="сортировать" />
            </div>{" "}
          </div>
          <div className="table__header_t">
            Вопросы{" "}
            <div className="questionsQuantity" onClick={handleSort}>
              <img src={chart} alt="сортировать" />
            </div>{" "}
          </div>
          <div className="table__header_t">
            Туры{" "}
            <div className="tours" onClick={handleSort}>
              <img src={chart} alt="сортировать" />
            </div>{" "}
          </div>
          <div className="table__header_t">
            Добавлен{" "}
            <div className="dateUpload" onClick={handleSort}>
              <img src={chart} alt="сортировать" />
            </div>{" "}
          </div>
          <div className="table__header_t">
            Добавил{" "}
            <div className="uploader" onClick={handleSort}>
              <img src={chart} alt="сортировать" />
            </div>{" "}
          </div>
        </div>
        <div className="table__body">
          {filterTournamentsShort(tournamentsShorts, search).map((v, i) => (
            <LineAll item={v} index={i} key={v.id} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default All;
