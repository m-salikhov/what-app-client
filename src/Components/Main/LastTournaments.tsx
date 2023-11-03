import { MouseEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { _axios } from "../../Helpers/_axios";
import { getDate } from "../../Helpers/getDate";
import { TournamentShortType } from "../../Types/tournament";
import back from "./back.svg";
import next from "./next.svg";
import { routes } from "../../constants";
import { useGetTournamentsLastShortQuery } from "../../Store/tournamentAPI";

const LastTournaments = () => {
  // const [lastTenTournaments, setLastTenTournaments] = useState<
  //   TournamentShortType[]
  // >([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  // useEffect(() => {
  //   _axios
  //     .get<TournamentShortType[]>(
  //       `${routes.tournamentsLastShort}${pageNumber * 10}`
  //     )
  //     .then((res) => {
  //       setLastTenTournaments(res.data);
  //     });
  // }, [pageNumber]);

  const { data: lastTenTournaments = [] } =
    useGetTournamentsLastShortQuery(pageNumber);

  useEffect(() => {
    _axios.get(`${routes.tournamentsLastShort}-1`).then((res) => {
      setPageCount(res.data);
    });
  }, []);

  const changePageNumber = (e: MouseEvent<HTMLDivElement>) => {
    const name = e.currentTarget.className;
    if (name === "next" && pageNumber < pageCount - 1) {
      setPageNumber((p) => ++p);
    }
    if (name === "back" && pageNumber > 0) {
      setPageNumber((p) => --p);
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
