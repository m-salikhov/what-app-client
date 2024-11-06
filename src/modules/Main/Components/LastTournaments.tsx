import { MouseEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import back from '../assets/back.svg';
import next from '../assets/next.svg';
import { getDate } from 'Common/Helpers/getDate';
import { useGetTournamentsLastShortQuery } from 'Store/ToolkitAPIs/tournamentAPI';
import { TournamentsLastShort } from 'Store/Types/tournamentAPI.types';

const initial: TournamentsLastShort = {
  tournaments: [],
  pageCount: 0,
  hasMorePage: false,
  count: 0,
};

function LastTournaments() {
  const [page, setPage] = useState(1);
  const amount = 10;

  const { data: { tournaments, pageCount } = initial } = useGetTournamentsLastShortQuery({
    amount,
    page,
    withSkip: true,
  });

  const changePageNumber = (e: MouseEvent<HTMLDivElement>) => {
    const { className } = e.currentTarget;

    if (className === 'next' && page < pageCount) {
      setPage((p) => p + 1);
    }
    if (className === 'back' && page > 1) {
      setPage((p) => p - 1);
    }
  };

  return (
    <div className='main-content-tournaments'>
      <h2>Последние добавленные турниры</h2>
      <div className='tournaments-header'>
        <h3>Название</h3>
        <h3>Добавлен</h3>
      </div>
      {tournaments.map((v) => {
        return (
          <div className='tournaments-item' key={v.id}>
            <Link to={`tournament/${v.id}`}>{v.title}</Link>
            <div>
              <h5>{getDate(v.dateUpload)}</h5>
            </div>
          </div>
        );
      })}
      <div className='tournaments-footer'>
        <div className='back' onClick={changePageNumber}>
          {' '}
          <img src={back} alt='предыдущая страница списка турниров' />
        </div>
        <p>{page}</p>
        <div className='next' onClick={changePageNumber}>
          {' '}
          <img src={next} alt='предыдущая страница списка турниров' />
        </div>
      </div>
    </div>
  );
}

export default LastTournaments;
