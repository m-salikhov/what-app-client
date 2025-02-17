import './tournamentsTable.css';
import chart from './bar_chart.svg';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import extractServerErrorMessage from 'Shared/Helpers/extractServerErrorMessage';
import { getDate } from 'Shared/Helpers/getDate';
import { useSortByColumns } from './hooks/useSortByColumns';
import { useGetAllTournamentsShorts } from './hooks/useGetAllTournamentsShorts';
import { Spinner } from 'Shared/Components/Spinner/Spinner';
import { linkBuilder } from './Helpers/linkBuilder';
import { filterTournamentsByTitleSearchString } from './Helpers/filterTournamentsByTitleSearchString';

export default function TournamentsTable() {
  const { error, tournaments, setTournaments, isLoading } = useGetAllTournamentsShorts();
  const { handleSort } = useSortByColumns(setTournaments);
  const [search, setSearch] = useState('');
  const { pathname } = useLocation();

  if (error) return <h2>{extractServerErrorMessage(error)}</h2>;

  if (isLoading) return <Spinner />;

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
              <img src={chart} alt='сортировать по названию' />
            </div>{' '}
          </div>

          <div>
            Дата отыгрыша{' '}
            <div className='tournaments-table-icon' id='date' onClick={handleSort}>
              <img src={chart} alt='сортировать по дате отыгрыша' />
            </div>{' '}
          </div>

          <div>
            Вопросы{' '}
            <div className='tournaments-table-icon' id='questionsQuantity' onClick={handleSort}>
              <img src={chart} alt='сортировать по количеству вопросов' />
            </div>{' '}
          </div>

          <div>
            Туры{' '}
            <div className='tournaments-table-icon' id='tours' onClick={handleSort}>
              <img src={chart} alt='сортировать количество туров' />
            </div>{' '}
          </div>

          <div>
            Добавлен{' '}
            <div className='tournaments-table-icon' id='dateUpload' onClick={handleSort}>
              <img src={chart} alt='сортировать по дате добавления' />
            </div>{' '}
          </div>

          <div>
            Добавил{' '}
            <div className='tournaments-table-icon' id='uploader' onClick={handleSort}>
              <img src={chart} alt='сортировать по добавившему' />
            </div>{' '}
          </div>
        </div>

        {filterTournamentsByTitleSearchString(tournaments, search).map((item, i) => (
          <div className='tournaments-table-line' key={item.id}>
            <div>{i + 1}</div>
            <div className='link'>
              <Link to={linkBuilder(item, pathname)}>{item.title}</Link>
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
