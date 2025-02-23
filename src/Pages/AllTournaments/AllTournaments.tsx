import { Spinner } from 'Shared/Components/Spinner/Spinner';
import { TournamentsTable } from 'Shared/Components/TournamentsTable/TournamentsTable';
import { extractServerErrorMessage } from 'Shared/Helpers/extractServerErrorMessage';
import { useDocTitle } from 'Shared/Hooks/useDocTitle';
import { useGetTournamentsAllShortQuery } from 'Store/ToolkitAPIs/tournamentAPI';

function AllTournaments() {
  useDocTitle('Все турниры');

  const { data: tournaments, isSuccess, error, isLoading } = useGetTournamentsAllShortQuery(undefined);

  if (error) return <h2>{extractServerErrorMessage(error)}</h2>;

  if (isLoading) return <Spinner />;

  if (!isSuccess) return null;

  return <TournamentsTable tournaments={structuredClone(tournaments)} />;
}

export default AllTournaments;
