import ListLine from './ListLine';
import { useDocTitle } from '../../Hooks/useDocTitle';
import { useAppDispatch } from '../../Hooks/redux';
import { useEffect } from 'react';
import { playModeActions } from '../../Store/reducers/PlayModeSlice';
import { useGetTornamentsShortQuery } from '../../Store/tournamentAPI';
import './list.scss';

function List() {
  useDocTitle('Игровой режим');

  const dispatch = useAppDispatch();

  const { data: tsShorts = [] } = useGetTornamentsShortQuery(undefined);

  useEffect(() => {
    dispatch(playModeActions.resetState());
  }, [dispatch]);

  return (
    <main className='list'>
      <h3>Игровой режим</h3>
      <p>Выберите турнир</p>
      <div className='table'>
        <div className='table__header'>
          <div className='table__header_t'>№</div>
          <div className='table__header_t'>Название </div>
          <div className='table__header_t'>Вопросы </div>
          <div className='table__header_t'>Туры </div>
        </div>
        <div className='table__body'>
          {[...tsShorts].reverse().map((v, i) => (
            <ListLine item={v} index={i} key={v.id} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default List;
