import { _axios } from "../../Helpers/_axios";
import { useTournamentAllShorts } from "../../Hooks/useTournament";
import ListLine from "./ListLine";
import "./list.scss";

const List = () => {
  const { ts, loading } = useTournamentAllShorts();

  return (
    <main className="list">
      <h3>Игровой режим</h3>
      <p>Выберите турнир</p>
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
