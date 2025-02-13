import { useDocTitle } from 'src/Common/Hooks/useDocTitle';
import { useAppDispatch } from 'src/Common/Hooks/redux';
import { playModeActions } from 'src/Store/Slices/PlayModeSlice';
import TournamentsTable from 'Common/Components/TournamentsTable/TournamentsTable';

function List() {
  useDocTitle('Игровой режим');

  const dispatch = useAppDispatch();

  dispatch(playModeActions.resetState());

  return <TournamentsTable />;
}

export default List;
