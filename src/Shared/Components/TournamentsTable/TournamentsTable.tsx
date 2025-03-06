import './tournamentsTable.css';
import chart from './bar_chart.svg';
import { Link, useLocation } from 'react-router-dom';
import { useState, MouseEvent } from 'react';
import { getDate } from 'Shared/Helpers/getDate';
import { linkBuilder } from './Helpers/linkBuilder';
import { filterTournaments } from './Helpers/filterTournaments';
import { TournamentShortType } from 'Shared/Schemas/TournamentSchema';
import { z } from 'zod';

const fieldNameSchema = z.enum(['title', 'date', 'tours', 'questionsQuantity', 'uploader', 'dateUpload']);

export function TournamentsTable({ tournaments }: { tournaments: TournamentShortType[] }) {
  const [search, setSearch] = useState('');
  const [filterField, setFilterField] = useState('dsc');

  const { pathname } = useLocation();

  function sortTournaments(e: MouseEvent<HTMLDivElement>) {
    const filter = fieldNameSchema.parse(e.currentTarget.id);

    if (filter === 'uploader' || filter === 'title') {
      tournaments.sort(function (a, b) {
        return filterField === 'asc' ? b[filter].localeCompare(a[filter]) : a[filter].localeCompare(b[filter]);
      });
    } else {
      tournaments.sort(function (a, b) {
        return filterField === 'asc' ? b[filter] - a[filter] : a[filter] - b[filter];
      });
    }

    setFilterField(filterField === 'asc' ? 'desc' : 'asc');
  }

  return (
    <div className='tournaments-table'>
      {' '}
      <label className='tournaments-table-search'>
        <input type='text' name='tournaments-search' onChange={(e) => setSearch(e.target.value)} placeholder='поиск' />
      </label>
      <div className='tournaments-table-wrapper'>
        <div className='tournaments-table-line'>
          <div>№</div>

          <div>
            Название
            <div className='tournaments-table-icon' id='title' onClick={sortTournaments}>
              <img src={chart} alt='сортировать по названию' />
            </div>{' '}
          </div>

          <div>
            Дата отыгрыша{' '}
            <div className='tournaments-table-icon' id='date' onClick={sortTournaments}>
              <img src={chart} alt='сортировать по дате отыгрыша' />
            </div>{' '}
          </div>

          <div>
            Вопросы{' '}
            <div className='tournaments-table-icon' id='questionsQuantity' onClick={sortTournaments}>
              <img src={chart} alt='сортировать по количеству вопросов' />
            </div>{' '}
          </div>

          <div>
            Туры{' '}
            <div className='tournaments-table-icon' id='tours' onClick={sortTournaments}>
              <img src={chart} alt='сортировать количество туров' />
            </div>{' '}
          </div>

          <div>
            Добавлен{' '}
            <div className='tournaments-table-icon' id='dateUpload' onClick={sortTournaments}>
              <img src={chart} alt='сортировать по дате добавления' />
            </div>{' '}
          </div>

          <div>
            Добавил{' '}
            <div className='tournaments-table-icon' id='uploader' onClick={sortTournaments}>
              <img src={chart} alt='сортировать по добавившему' />
            </div>{' '}
          </div>
        </div>

        {filterTournaments(tournaments, search).map((item, i) => (
          <div className='tournaments-table-line' key={item.id}>
            <div>{i + 1}</div>
            <div className='link'>
              <Link to={linkBuilder(item.id, item.title, pathname)}>{item.title}</Link>
            </div>
            <div>{getDate(item.date)}</div>
            <div>{item.questionsQuantity}</div>
            <div>{item.tours}</div>
            <div>{getDate(item.dateUpload)}</div>
            <div>{item.uploader}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
