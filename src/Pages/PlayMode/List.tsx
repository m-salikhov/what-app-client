import { useDocTitle } from 'Shared/Hooks/useDocTitle';
import { TournamentsTable } from 'Shared/Components/TournamentsTable/TournamentsTable';
import { Spinner } from 'Shared/Components/Spinner/Spinner';
import { useGetTournamentsAllShortQuery } from 'Store/ToolkitAPIs/tournamentAPI';

function List() {
  useDocTitle('Игровой режим');

  const { data: tournaments, isSuccess, error, isLoading } = useGetTournamentsAllShortQuery(undefined);

  if (error) return <h2>Ошибка при получении турниров</h2>;

  if (isLoading) return <Spinner />;

  if (!isSuccess) return null;

  return <TournamentsTable tournaments={tournaments} />;
}

export default List;
