import ListLine from './ListLine';
import { useDocTitle } from '../../Hooks/useDocTitle';
import { useAppDispatch } from '../../Hooks/redux';
import { useEffect } from 'react';
import { playModeActions } from '../../Store/reducers/PlayModeSlice';
import { useGetTournamentsShortQuery } from '../../Store/tournamentAPI';
import './list.scss';
import { Spinner } from '../Elements/Spinner/Spinner';

function List() {
  useDocTitle('Игровой режим');

  const dispatch = useAppDispatch();

  const {
    data: tsShorts = [],
    isLoading,
    isSuccess,
  } = useGetTournamentsShortQuery(undefined);

  useEffect(() => {
    dispatch(playModeActions.resetState());
  }, [dispatch]);

  return (
    <main className='list'>
      <h3>Игровой режим</h3>
      <p>Выберите турнир</p>

      <div className='table'>
        <div className='table-header'>
          <div className='table-header-t'>№</div>
          <div className='table-header-t'>Название </div>
          <div className='table-header-t'>Вопросы </div>
          <div className='table-header-t'>Туры </div>
        </div>

        {isLoading && <Spinner />}

        {isSuccess && (
          <div className='table-body'>
            {[...tsShorts].reverse().map((v, i) => (
              <ListLine item={v} index={i} key={v.id} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default List;
