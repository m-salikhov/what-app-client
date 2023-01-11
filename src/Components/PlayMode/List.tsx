import { useState, useEffect } from "react";
import { _axios } from "../../Helpers/_axios";
import { TournamentShortType } from "../../Types/tournament";
import "./list.scss";
import ListLine from "./ListLine";

const List = () => {
  const [ts, setTs] = useState<TournamentShortType[]>([]);

  useEffect(() => {
    _axios.get(`/tournaments/allshort`).then((res) => {
      setTs(res.data);
    });
  }, []);

  return (
    <main className="list">
      <div className="table">
        <div className="table__header">
          <div className="table__header_t">№</div>
          <div className="table__header_t">Название </div>
          <div className="table__header_t">Вопросы </div>
          <div className="table__header_t">Туры </div>
        </div>
        <div className="table__body">
          {ts.reverse().map((v, i) => (
            <ListLine item={v} index={i} key={v.id} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default List;
