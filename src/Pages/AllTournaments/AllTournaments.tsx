import { Spinner } from 'Shared/Components/Spinner/Spinner';
import { TournamentsTable } from 'Shared/Components/TournamentsTable/TournamentsTable';
import { useDocTitle } from 'Shared/Hooks/useDocTitle';
import { useGetTournamentsAllShortQuery } from 'Store/ToolkitAPIs/tournamentAPI';

function AllTournaments() {
  useDocTitle('Все турниры');

  const { data: tournaments, isSuccess, error, isLoading } = useGetTournamentsAllShortQuery(undefined);

  if (error) return <h2>Ошибка при получении турниров</h2>;

  if (isLoading) return <Spinner />;

  if (!isSuccess) return null;

  return <TournamentsTable tournaments={tournaments} />;
}

export default AllTournaments;
