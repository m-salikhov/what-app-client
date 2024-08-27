import {
  ChangeEvent,
  Dispatch,
  MouseEvent,
  SetStateAction,
  useRef,
  useState,
} from 'react';
import filterTournamentsShort from './helpers/filterTournamentsShort';
import sortFunction from './helpers/sortFunction';
import LineAll from './LineAll';
import { TournamentShortType } from '../../Types/tournament';
import chart from './bar_chart.svg';

type FieldName = keyof Omit<TournamentShortType, 'id'>;

interface Props {
  setTournamentsShorts: Dispatch<SetStateAction<TournamentShortType[]>>;
  tournamentsShorts: TournamentShortType[];
}

export default function AllTournamentsTable({
  setTournamentsShorts,
  tournamentsShorts,
}: Props) {
  const field = useRef('');
  const [search, setSearch] = useState('');

  function handleSort(e: MouseEvent<HTMLDivElement>) {
    const className = e.currentTarget.className as FieldName;
    if (field.current === className) {
      setTournamentsShorts((prev) => [...prev.reverse()]);
    } else {
      setTournamentsShorts((prev) => sortFunction(prev, className));
      field.current = className;
    }
  }

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  return (
    <>
      <label className='all-search'>
        <p>поиск</p>
        <input type='text' onChange={handleSearch} />
      </label>

      <div className='table'>
        <div className='table-header'>
          <div className='table-header-t'>№</div>
          <div className='table-header-t'>
            Название{' '}
            <div className='title' onClick={handleSort}>
              <img src={chart} alt='сортировать' />
            </div>{' '}
          </div>
          <div className='table-header-t'>
            Дата{' '}
            <div className='date' onClick={handleSort}>
              <img src={chart} alt='сортировать' />
            </div>{' '}
          </div>
          <div className='table-header-t'>
            Вопросы{' '}
            <div className='questionsQuantity' onClick={handleSort}>
              <img src={chart} alt='сортировать' />
            </div>{' '}
          </div>
          <div className='table-header-t'>
            Туры{' '}
            <div className='tours' onClick={handleSort}>
              <img src={chart} alt='сортировать' />
            </div>{' '}
          </div>
          <div className='table-header-t'>
            Добавлен{' '}
            <div className='dateUpload' onClick={handleSort}>
              <img src={chart} alt='сортировать' />
            </div>{' '}
          </div>
          <div className='table-header-t'>
            Добавил{' '}
            <div className='uploader' onClick={handleSort}>
              <img src={chart} alt='сортировать' />
            </div>{' '}
          </div>
        </div>

        <div className='table-body'>
          {filterTournamentsShort(tournamentsShorts, search).map((v, i) => (
            <LineAll item={v} index={i} key={v.id} />
          ))}
        </div>
      </div>
    </>
  );
}
