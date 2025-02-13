import TournamentsTable from 'Common/Components/TournamentsTable/TournamentsTable';
import { useDocTitle } from 'Common/Hooks/useDocTitle';

function AllTournaments() {
  useDocTitle('Все турниры');

  return <TournamentsTable />;
}

export default AllTournaments;
