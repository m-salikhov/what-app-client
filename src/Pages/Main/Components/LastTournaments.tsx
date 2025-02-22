import next from '../assets/next.svg';
import back from '../assets/back.svg';
import { MouseEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDate } from 'Shared/Helpers/getDate';
import { useGetTournamentsLastShortQuery } from 'Store/ToolkitAPIs/tournamentAPI';
import { TournamentsLastShort } from 'Store/Types/tournamentAPI.types';
import { Spinner } from 'Shared/Components/Spinner/Spinner';

const initial: TournamentsLastShort = {
  tournaments: [],
  pageCount: 0,
  hasMorePage: false,
  count: 0,
};

export function LastTournaments() {
  const [page, setPage] = useState(1);
  const amount = 10;

  const {
    data: { tournaments, pageCount } = initial,
    isFetching,
    isLoading,
  } = useGetTournamentsLastShortQuery({
    amount,
    page,
    withSkip: true,
  });

  const changePageNumber = (e: MouseEvent<HTMLButtonElement>) => {
    switch (e.currentTarget.className) {
      case 'next':
        setPage((p) => p + 1);
        break;
      case 'back':
        setPage((p) => p - 1);
        break;
      default:
        break;
    }
  };

  if (isLoading) {
    return (
      <div className='main-content-tournaments-loading'>
        <Spinner />
      </div>
    );
  }

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
        <button type='button' className='back' disabled={isFetching || page === 1} onClick={changePageNumber}>
          <img src={back} alt='предыдущая страница списка турниров' />
        </button>
        <p>{page}</p>
        <button type='button' className='next' disabled={isFetching || page === pageCount} onClick={changePageNumber}>
          <img src={next} alt='следующая страница списка турниров' />
        </button>
      </div>
    </div>
  );
}
