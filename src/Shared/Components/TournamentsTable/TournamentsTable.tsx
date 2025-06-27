import './tournamentsTable.css';
import chart from './bar_chart.svg';
import { Link, useLocation } from 'react-router-dom';
import { getDate } from 'Shared/Helpers/getDate';
import { linkBuilder } from './Helpers/linkBuilder';
import { TournamentShortType } from 'Shared/Schemas/TournamentSchema';
import { ScrollToTop } from '../ScrollToTop/ScrollToTop';
import { RandomTournament } from './Components/RandomTournament';
import { useTournamentListManager } from './Helpers/useTournamentListManager';

export function TournamentsTable({ tournaments }: { tournaments: TournamentShortType[] }) {
  const { pathname } = useLocation();
  const { tournamentsList, handleChangeFilterString, filterString, sortTournaments } =
    useTournamentListManager(tournaments);

  return (
    <div className='tournaments-table'>
      {' '}
      <div className='tournaments-table-header'>
        <label className='tournaments-table-search'>
          <input
            type='text'
            name='tournaments-search'
            value={filterString}
            onChange={handleChangeFilterString}
            placeholder='поиск'
          />
        </label>
        <RandomTournament pathname={pathname} />
      </div>
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

        {tournamentsList.map((item, i) => (
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
      <ScrollToTop />
    </div>
  );
}
