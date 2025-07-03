import styles from './tournaments-table.module.css';
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
    <>
      {' '}
      <div className={styles.header}>
        <label className={styles.search}>
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
      <div className={styles.table}>
        <div className={styles.line}>
          <div className={styles.column}>№</div>

          <div className={styles.column}>
            Название
            <div className={styles.columnIcon} id='title' onClick={sortTournaments}>
              <img src={chart} alt='сортировать по названию' />
            </div>{' '}
          </div>

          <div className={styles.column}>
            Дата отыгрыша{' '}
            <div className={styles.columnIcon} id='date' onClick={sortTournaments}>
              <img src={chart} alt='сортировать по дате отыгрыша' />
            </div>{' '}
          </div>

          <div className={styles.column}>
            Вопросы{' '}
            <div className={styles.columnIcon} id='questionsQuantity' onClick={sortTournaments}>
              <img src={chart} alt='сортировать по количеству вопросов' />
            </div>{' '}
          </div>

          <div className={styles.column}>
            Туры{' '}
            <div className={styles.columnIcon} id='tours' onClick={sortTournaments}>
              <img src={chart} alt='сортировать количество туров' />
            </div>{' '}
          </div>

          <div className={styles.column}>
            Добавлен{' '}
            <div className={styles.columnIcon} id='dateUpload' onClick={sortTournaments}>
              <img src={chart} alt='сортировать по дате добавления' />
            </div>{' '}
          </div>

          <div className={styles.column}>
            Добавил{' '}
            <div className={styles.columnIcon} id='uploader' onClick={sortTournaments}>
              <img src={chart} alt='сортировать по добавившему' />
            </div>{' '}
          </div>
        </div>

        {tournamentsList.map((item, i) => (
          <div className={styles.line} key={item.id}>
            <div className={styles.column}>{i + 1}</div>
            <div className={styles.column}>
              <Link to={linkBuilder(item.id, item.title, pathname)}>{item.title}</Link>
            </div>
            <div className={styles.column}>{getDate(item.date)}</div>
            <div className={styles.column}>{item.questionsQuantity}</div>
            <div className={styles.column}>{item.tours}</div>
            <div className={styles.column}>{getDate(item.dateUpload)}</div>
            <div className={styles.column}>{item.uploader}</div>
          </div>
        ))}
      </div>
      <ScrollToTop />
    </>
  );
}
