import { _axios } from "../../Helpers/_axios";
import { useTournamentAllShorts } from "../../Hooks/useTournament";
import "./list.scss";
import ListLine from "./ListLine";

const List = () => {
  const { ts, loading } = useTournamentAllShorts();

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
