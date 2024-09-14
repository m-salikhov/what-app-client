import './tournamentsTable.css';
import chart from './bar_chart.svg';
import { Link, useLocation } from 'react-router-dom';
import { useGetTournamentsShortQuery } from '../../../Store/ToolkitAPIs/tournamentAPI';
import { getDate } from '../../../Helpers/getDate';
import { useEffect, useState, MouseEvent } from 'react';
import { TournamentShortType } from '../../../Types/tournament';
import extractServerErrorMessage from '../../../Helpers/extractServerErrorMessage';

type FieldName = keyof Omit<TournamentShortType, 'id'>;

function filterTournamentsShort(
  tournaments: TournamentShortType[],
  searchString: string
) {
  if (searchString.length > 1) {
    return tournaments.filter((t) =>
      t.title.toLowerCase().includes(searchString.toLowerCase())
    );
  } else return tournaments;
}

const sortFunction = (arr: TournamentShortType[], fieldName: FieldName) => {
  return [
    ...arr.sort(function (a, b) {
      if (a[fieldName] > b[fieldName]) {
        return 1;
      } else if (a[fieldName] < b[fieldName]) {
        return -1;
      } else return 0;
    }),
  ];
};

const linkBuilder = (pathname: string, tournament: TournamentShortType) => {
  if (pathname.includes('all')) {
    return `/tournament/${tournament.id}`;
  }
  if (pathname.includes('playmode')) {
    return `/playmode/${tournament.id}/${tournament.title}`;
  } else return '';
};

export default function TournamentsTable() {
  const { data, isSuccess, error } = useGetTournamentsShortQuery(undefined);

  const { pathname } = useLocation();

  const [search, setSearch] = useState('');
  const [field, setField] = useState<FieldName | null>(null);

  const [tournamentsShorts, setTournamentsShorts] = useState<
    TournamentShortType[]
  >([]);

  function handleSort(e: MouseEvent<HTMLDivElement>) {
    const id = e.currentTarget.id as FieldName;
    if (field === id) {
      setTournamentsShorts((prev) => [...prev.reverse()]);
    } else {
      setTournamentsShorts((prev) => sortFunction(prev, id));
      setField(id);
    }
  }

  useEffect(() => {
    if (isSuccess) {
      const ts = structuredClone(data);
      setTournamentsShorts([...ts].reverse());
    }
  }, [isSuccess]);

  if (error) {
    return <h2>{extractServerErrorMessage(error)}</h2>;
  }

  return (
    <>
      {' '}
      <label className='tournaments-table-search'>
        <p>поиск</p>
        <input
          type='text'
          name='tournaments-search'
          onChange={(e) => setSearch(e.target.value)}
        />
      </label>
      <div className='tournaments-table-wrapper'>
        <div className='tournaments-table-line'>
          <div>№</div>

          <div>
            Название
            <div
              className='tournaments-table-icon'
              id='title'
              onClick={handleSort}
            >
              <img src={chart} alt='сортировать' />
            </div>{' '}
          </div>

          <div>
            Дата отыгрыша{' '}
            <div
              className='tournaments-table-icon'
              id='date'
              onClick={handleSort}
            >
              <img src={chart} alt='сортировать' />
            </div>{' '}
          </div>

          <div>
            Вопросы{' '}
            <div
              className='tournaments-table-icon'
              id='questionsQuantity'
              onClick={handleSort}
            >
              <img src={chart} alt='сортировать' />
            </div>{' '}
          </div>

          <div>
            Туры{' '}
            <div
              className='tournaments-table-icon'
              id='tours'
              onClick={handleSort}
            >
              <img src={chart} alt='сортировать' />
            </div>{' '}
          </div>

          <div>
            Добавлен{' '}
            <div
              className='tournaments-table-icon'
              id='dateUpload'
              onClick={handleSort}
            >
              <img src={chart} alt='сортировать' />
            </div>{' '}
          </div>

          <div>
            Добавил{' '}
            <div
              className='tournaments-table-icon'
              id='uploader'
              onClick={handleSort}
            >
              <img src={chart} alt='сортировать' />
            </div>{' '}
          </div>
        </div>

        {filterTournamentsShort(tournamentsShorts, search).map((item, i) => (
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
