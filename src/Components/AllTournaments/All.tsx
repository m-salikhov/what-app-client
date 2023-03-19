import { _axios } from "../../Helpers/_axios";
import { MouseEvent, useEffect, useState } from "react";
import { TournamentShortType } from "../../Types/tournament";
import LineAll from "./LineAll";
import { sortFunction } from "./sortFunction";
import chart from "./bar_chart.svg";
import "./all.scss";
import { useDocTile } from "../../Hooks/useDocTitle";

type FieldName = keyof Omit<TournamentShortType, "id">;

const All = () => {
  //ts = tournaments Все турниры
  const [ts, setTs] = useState<TournamentShortType[]>([]);
  const [field, setField] = useState("");

  useDocTile("Все турниры");

  useEffect(() => {
    _axios.get(`/tournaments/allshort`).then((res) => {
      setTs(res.data.reverse());
    });
  }, []);

  function sort(e: MouseEvent<HTMLDivElement>) {
    const className = e.currentTarget.className as FieldName;
    if (field === className) {
      setTs((prev) => [...prev.reverse()]);
    } else {
      setTs((prev) => sortFunction(prev, className));
      setField(className);
    }
  }

  return (
    <main>
      <div className="table">
        <div className="table__header">
          <div className="table__header_t">№</div>
          <div className="table__header_t">
            Название{" "}
            <div className="title" onClick={sort}>
              <img src={chart} alt="сортировать" />
            </div>{" "}
          </div>
          <div className="table__header_t">
            Дата{" "}
            <div className="date" onClick={sort}>
              <img src={chart} alt="сортировать" />
            </div>{" "}
          </div>
          <div className="table__header_t">
            Вопросы{" "}
            <div className="questionsQuantity" onClick={sort}>
              <img src={chart} alt="сортировать" />
            </div>{" "}
          </div>
          <div className="table__header_t">
            Туры{" "}
            <div className="tours" onClick={sort}>
              <img src={chart} alt="сортировать" />
            </div>{" "}
          </div>
          <div className="table__header_t">
            Добавлен{" "}
            <div className="dateUpload" onClick={sort}>
              <img src={chart} alt="сортировать" />
            </div>{" "}
          </div>
          <div className="table__header_t">
            Добавил{" "}
            <div className="uploader" onClick={sort}>
              <img src={chart} alt="сортировать" />
            </div>{" "}
          </div>
        </div>
        <div className="table__body">
          {ts.map((v, i) => (
            <LineAll item={v} index={i} key={v.id} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default All;
