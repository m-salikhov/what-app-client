import styles from './tournaments-table.module.css';
import { Link, useLocation } from 'react-router-dom';
import { getDate } from 'Shared/Helpers/getDate';
import { linkBuilder } from './Helpers/linkBuilder';
import { TournamentShortType } from 'Shared/Schemas/TournamentSchema';
import { ScrollToTop } from '../ScrollToTop/ScrollToTop';
import { RandomTournament } from './Components/RandomTournament';
import { useTournamentListManager } from './Helpers/useTournamentListManager';
import { FaChevronDown } from 'react-icons/fa';
import { FaChevronUp } from 'react-icons/fa';
import TableTooltipDF from './Components/TableTooltipDF';

export function TournamentsTable({ tournaments }: { tournaments: TournamentShortType[] }) {
  const { pathname } = useLocation();
  const { tournamentsList, handleChangeFilterString, filterString, sortTournaments, sortField, sortDirection } =
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
            autoComplete='off'
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
            <div className={styles.headerCellData} data-field='title' onClick={sortTournaments}>
              <span>Название</span>
              <div className={styles.headerCellIcon}>
                {sortField === 'title' && sortDirection === 'asc' && <FaChevronDown />}
                {sortField === 'title' && sortDirection === 'desc' && <FaChevronUp />}
              </div>{' '}
            </div>
          </div>

          <div className={styles.headerCell}>
            <div className={styles.headerCellData} data-field='date' onClick={sortTournaments}>
              <span>Дата</span>
              <div className={styles.headerCellIcon}>
                {sortField === 'date' && sortDirection === 'asc' && <FaChevronDown />}
                {sortField === 'date' && sortDirection === 'desc' && <FaChevronUp />}
              </div>{' '}
            </div>
          </div>

          <div className={styles.headerCell}>
            <div className={styles.headerCellData} data-field='difficulty' onClick={sortTournaments}>
              <span id='tooltip-df'>DF</span>
              <TableTooltipDF anchor='tooltip-df' />
              <div className={styles.headerCellIcon}>
                {sortField === 'difficulty' && sortDirection === 'asc' && <FaChevronDown />}
                {sortField === 'difficulty' && sortDirection === 'desc' && <FaChevronUp />}
              </div>{' '}
            </div>
          </div>

          <div className={styles.headerCell}>
            <div className={styles.headerCellData} data-field='questionsQuantity' onClick={sortTournaments}>
              <span>Вопросы</span>
              <div className={styles.headerCellIcon}>
                {sortField === 'questionsQuantity' && sortDirection === 'asc' && <FaChevronDown />}
                {sortField === 'questionsQuantity' && sortDirection === 'desc' && <FaChevronUp />}
              </div>{' '}
            </div>
          </div>

          <div className={styles.headerCell}>
            <div className={styles.headerCellData} data-field='tours' onClick={sortTournaments}>
              <span>Туры</span>
              <div className={styles.headerCellIcon}>
                {sortField === 'tours' && sortDirection === 'asc' && <FaChevronDown />}
                {sortField === 'tours' && sortDirection === 'desc' && <FaChevronUp />}
              </div>{' '}
            </div>
          </div>

          <div className={styles.headerCell}>
            <div className={styles.headerCellData} data-field='dateUpload' onClick={sortTournaments}>
              <span>Добавлен</span>
              <div className={styles.headerCellIcon}>
                {sortField === 'dateUpload' && sortDirection === 'asc' && <FaChevronDown />}
                {sortField === 'dateUpload' && sortDirection === 'desc' && <FaChevronUp />}
              </div>{' '}
            </div>
          </div>

          <div className={styles.headerCell}>
            <div className={styles.headerCellData} data-field='uploader' onClick={sortTournaments}>
              <span>Добавил</span>
              <div className={styles.headerCellIcon}>
                {sortField === 'uploader' && sortDirection === 'asc' && <FaChevronDown />}
                {sortField === 'uploader' && sortDirection === 'desc' && <FaChevronUp />}
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
            <div className={styles.cell}>{item.difficulty <= 0 ? '-' : item.difficulty}</div>
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
