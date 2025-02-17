import { useDocTitle } from 'Shared/Hooks/useDocTitle';
import { useAppDispatch } from 'Shared/Hooks/redux';
import { playModeActions } from 'Store/Slices/PlayModeSlice';
import TournamentsTable from 'Shared/Components/TournamentsTable/TournamentsTable';

function List() {
  useDocTitle('Игровой режим');

  const dispatch = useAppDispatch();

  dispatch(playModeActions.resetState());

  return <TournamentsTable />;
}

export default List;
