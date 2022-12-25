import { TournamentShortType } from "../../Types/tournament";
import { FC } from "react";
import { Link } from "react-router-dom";

interface LineProp {
  item: TournamentShortType;
  index: number;
}

const ListLine: FC<LineProp> = ({ item, index }) => {
  return (
    <div className="table__line">
      <p>{index + 1}</p>
      <div className="link">
        <Link to={`../playmode/${item.id}`}>{item.title}</Link>
      </div>
      <p>{item.questionsQuantity}</p>
      <p>{item.tours}</p>
    </div>
  );
};

export default ListLine;
