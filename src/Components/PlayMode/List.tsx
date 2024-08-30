import ListLine from './ListLine';
import { useDocTitle } from '../../Hooks/useDocTitle';
import { useAppDispatch } from '../../Hooks/redux';
import { useEffect, useRef, useState } from 'react';
import { playModeActions } from '../../Store/reducers/PlayModeSlice';
import { useGetTournamentsLastShortQuery } from '../../Store/tournamentAPI';
import { Spinner } from '../Elements/Spinner/Spinner';
import extractServerErrorMessage from '../../Helpers/extractServerErrorMessage';
import './list.css';
import { TournamentsLastShort } from '../../Store/Types/tournamentAPI.types';

const initial: TournamentsLastShort = {
  tournaments: [],
  pageCount: 0,
  hasMorePage: false,
  count: 0,
};

function List() {
  useDocTitle('Игровой режим');
  const dispatch = useAppDispatch();

  const [page, setPage] = useState(1);
  const amount = 20;

  const {
    data: { tournaments, hasMorePage } = initial,
    isLoading,
    isSuccess,
    error,
  } = useGetTournamentsLastShortQuery({
    amount,
    page,
    withSkip: false,
  });

  const observerCallback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      const intersecting = entry.isIntersecting;
      if (intersecting) {
        setPage((prev) => prev + 1);
      }
    });
  };

  const observer = useRef(
    new IntersectionObserver(observerCallback, { rootMargin: '-60px' })
  );
  const observerTarget = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (observerTarget.current) {
      hasMorePage
        ? observer.current.observe(observerTarget.current)
        : observer.current.unobserve(observerTarget.current);
    }
  }, [hasMorePage]);

  useEffect(() => {
    dispatch(playModeActions.resetState());
  }, [dispatch]);

  return (
    <main className='list'>
      {isLoading && <Spinner />}

      {error && <h2>{extractServerErrorMessage(error)}</h2>}

      {isSuccess && (
        <>
          <h3>Игровой режим</h3>
          <p>Выберите турнир</p>
          <div className='table'>
            <div className='table-header'>
              <div className='table-header-t'>№</div>
              <div className='table-header-t'>Название </div>
              <div className='table-header-t'>Вопросы </div>
              <div className='table-header-t'>Туры </div>
            </div>

            <div className='table-body'>
              {tournaments.map((v, i) => (
                <ListLine item={v} index={i} key={v.id} />
              ))}
            </div>
          </div>{' '}
        </>
      )}
      <div ref={observerTarget}></div>
    </main>
  );
}

export default List;
