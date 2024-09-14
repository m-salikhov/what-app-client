// import './list.css';
import { useDocTitle } from '../../Hooks/useDocTitle';
import { useAppDispatch } from '../../Hooks/redux';
import { useEffect } from 'react';
import { playModeActions } from '../../Store/Slices/PlayModeSlice';
import TournamentsTable from '../Elements/TournamentsTable/TournamentsTable';

function List() {
  useDocTitle('Игровой режим');

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(playModeActions.resetState());
  }, [dispatch]);

  return (
    <main>
      <TournamentsTable />
    </main>
  );
}

export default List;
