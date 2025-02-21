import { TournamentsTable } from 'Shared/Components/TournamentsTable/TournamentsTable';
import { useDocTitle } from 'Shared/Hooks/useDocTitle';

function AllTournaments() {
  useDocTitle('Все турниры');

  return <TournamentsTable />;
}

export default AllTournaments;
