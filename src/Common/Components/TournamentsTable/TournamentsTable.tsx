import './tournamentsTable.css';
import chart from './bar_chart.svg';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import extractServerErrorMessage from 'Common/Helpers/extractServerErrorMessage';
import { getDate } from 'Common/Helpers/getDate';
import { TournamentShortType } from 'Common/Types/tournament';
import { useTournamentsTableFilter } from './hooks/useTournamentsTableFilter';

function filterTournamentsByTitleSearchString(tournaments: TournamentShortType[], searchString: string) {
  if (searchString.length > 1) {
    return tournaments.filter((t) => t.title.toLowerCase().includes(searchString.toLowerCase()));
  } else return tournaments;
}

const linkBuilder = (pathname: string, tournament: TournamentShortType) => {
  if (pathname.includes('all')) {
    return `/tournament/${tournament.id}`;
  }
  if (pathname.includes('playmode')) {
    return `/playmode/${tournament.id}/${tournament.title}`;
  } else return '';
};

export default function TournamentsTable() {
  const { tournamentsShorts, handleSort, error } = useTournamentsTableFilter();

  const { pathname } = useLocation();

  const [search, setSearch] = useState('');

  if (error) {
    return <h2>{extractServerErrorMessage(error)}</h2>;
  }

  return (
    <>
      {' '}
      <label className='tournaments-table-search'>
        <input type='text' name='tournaments-search' onChange={(e) => setSearch(e.target.value)} placeholder='поиск' />
      </label>
      <div className='tournaments-table-wrapper'>
        <div className='tournaments-table-line'>
          <div>№</div>

          <div>
            Название
            <div className='tournaments-table-icon' id='title' onClick={handleSort}>
              <img src={chart} alt='сортировать' />
            </div>{' '}
          </div>

          <div>
            Дата отыгрыша{' '}
            <div className='tournaments-table-icon' id='date' onClick={handleSort}>
              <img src={chart} alt='сортировать' />
            </div>{' '}
          </div>

          <div>
            Вопросы{' '}
            <div className='tournaments-table-icon' id='questionsQuantity' onClick={handleSort}>
              <img src={chart} alt='сортировать' />
            </div>{' '}
          </div>

          <div>
            Туры{' '}
            <div className='tournaments-table-icon' id='tours' onClick={handleSort}>
              <img src={chart} alt='сортировать' />
            </div>{' '}
          </div>

          <div>
            Добавлен{' '}
            <div className='tournaments-table-icon' id='dateUpload' onClick={handleSort}>
              <img src={chart} alt='сортировать' />
            </div>{' '}
          </div>

          <div>
            Добавил{' '}
            <div className='tournaments-table-icon' id='uploader' onClick={handleSort}>
              <img src={chart} alt='сортировать' />
            </div>{' '}
          </div>
        </div>

        {filterTournamentsByTitleSearchString(tournamentsShorts, search).map((item, i) => (
          <div className='tournaments-table-line' key={item.id}>
            <div>{i + 1}</div>
            <div className='link'>
              <Link to={linkBuilder(pathname, item)}>{item.title}</Link>
            </div>
            <div>{getDate(item.date)}</div>
            <div>{item.questionsQuantity}</div>
            <div>{item.tours}</div>
            <div>{getDate(item.dateUpload)}</div>
            <div>{item.uploader}</div>
          </div>
        ))}
      </div>
    </>
  );
}
