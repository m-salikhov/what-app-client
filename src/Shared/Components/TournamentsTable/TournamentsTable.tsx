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
        <div className={styles.headerLine}>
          <div className={styles.headerCell}>
            <div className={styles.headerCellData}>
              <span>№</span>
            </div>
          </div>

          <div className={styles.headerCell}>
            <div className={styles.headerCellData}>
              <span>Название</span>
              <div className={styles.headerCellIcon} id='title' onClick={sortTournaments}>
                <img src={chart} alt='сортировать по названию' />
              </div>{' '}
            </div>
          </div>

          <div className={styles.headerCell}>
            <div className={styles.headerCellData}>
              <span>Дата</span>
              <div className={styles.headerCellIcon} id='date' onClick={sortTournaments}>
                <img src={chart} alt='сортировать по дате отыгрыша' />
              </div>{' '}
            </div>
          </div>

          <div className={styles.headerCell}>
            <div className={styles.headerCellData}>
              <span>Вопросы</span>
              <div className={styles.headerCellIcon} id='questionsQuantity' onClick={sortTournaments}>
                <img src={chart} alt='сортировать по количеству вопросов' />
              </div>{' '}
            </div>
          </div>

          <div className={styles.headerCell}>
            <div className={styles.headerCellData}>
              <span>Туры</span>
              <div className={styles.headerCellIcon} id='tours' onClick={sortTournaments}>
                <img src={chart} alt='сортировать количество туров' />
              </div>{' '}
            </div>
          </div>

          <div className={styles.headerCell}>
            <div className={styles.headerCellData}>
              <span>Добавлен</span>
              <div className={styles.headerCellIcon} id='dateUpload' onClick={sortTournaments}>
                <img src={chart} alt='сортировать по дате добавления' />
              </div>{' '}
            </div>
          </div>

          <div className={styles.headerCell}>
            <div className={styles.headerCellData}>
              <span>Добавил</span>
              <div className={styles.headerCellIcon} id='uploader' onClick={sortTournaments}>
                <img src={chart} alt='сортировать по добавившему' />
              </div>{' '}
            </div>
          </div>
        </div>

        {tournamentsList.map((item, i) => (
          <div className={styles.line} key={item.id}>
            <div className={styles.cell}>{i + 1}</div>
            <div className={styles.cell}>
              <Link to={linkBuilder(item.id, item.title, pathname)}>{item.title}</Link>
            </div>
            <div className={styles.cell}>{getDate(item.date)}</div>
            <div className={styles.cell}>{item.questionsQuantity}</div>
            <div className={styles.cell}>{item.tours}</div>
            <div className={styles.cell}>{getDate(item.dateUpload)}</div>
            <div className={styles.cell}>{item.uploader}</div>
          </div>
        ))}
      </div>
      <ScrollToTop />
    </>
  );
}
