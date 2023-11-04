import { MouseEvent, useState } from "react";
import { Link } from "react-router-dom";
import { getDate } from "../../Helpers/getDate";
import back from "./back.svg";
import next from "./next.svg";
import {
  useGetTournamentsAmountPagesQuery,
  useGetTournamentsLastShortQuery,
} from "../../Store/tournamentAPI";

const LastTournaments = () => {
  const [pageNumber, setPageNumber] = useState(0);

  const { data: lastTenTournaments = [] } = useGetTournamentsLastShortQuery(
    pageNumber * 10
  );

  const { data: amountPages = 0 } =
    useGetTournamentsAmountPagesQuery(undefined);

  const changePageNumber = (e: MouseEvent<HTMLDivElement>) => {
    const { className } = e.currentTarget;

    if (className === "next" && pageNumber < amountPages - 1) {
      setPageNumber((p) => p + 1);
    }
    if (className === "back" && pageNumber > 0) {
      setPageNumber((p) => p - 1);
    }
  };

  return (
    <>
      <h2>Последние добавленные турниры</h2>
      <div className="tournaments__header">
        <h3>Название</h3>
        <h3>Добавлен</h3>
      </div>
      {lastTenTournaments.map((v) => {
        return (
          <div className="tournaments__item" key={v.id}>
            <Link to={`tournament/${v.id}`}>{v.title}</Link>
            <h5>{getDate(v.dateUpload)}</h5>
          </div>
        );
      })}
      <div className="tournaments__footer">
        <div className="back" onClick={changePageNumber}>
          {" "}
          <img src={back} alt="обновить случайные" />
        </div>
        <p>{pageNumber + 1}</p>
        <div className="next" onClick={changePageNumber}>
          {" "}
          <img src={next} alt="обновить случайные" />
        </div>
      </div>
    </>
  );
};

export default LastTournaments;
