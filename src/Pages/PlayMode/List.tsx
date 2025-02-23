import { useDocTitle } from 'Shared/Hooks/useDocTitle';
import { useAppDispatch } from 'Shared/Hooks/redux';
import { playModeActions } from 'Store/Slices/PlayModeSlice';
import { TournamentsTable } from 'Shared/Components/TournamentsTable/TournamentsTable';
import { Spinner } from 'Shared/Components/Spinner/Spinner';
import { extractServerErrorMessage } from 'Shared/Helpers/extractServerErrorMessage';
import { useGetTournamentsAllShortQuery } from 'Store/ToolkitAPIs/tournamentAPI';

function List() {
  useDocTitle('Игровой режим');

  const { data: tournaments, isSuccess, error, isLoading } = useGetTournamentsAllShortQuery(undefined);

  if (error) return <h2>{extractServerErrorMessage(error)}</h2>;

  if (isLoading) return <Spinner />;
  if (!isSuccess) return null;

  const dispatch = useAppDispatch();

  dispatch(playModeActions.resetState());

  return <TournamentsTable tournaments={structuredClone(tournaments)} />;
}

export default List;
