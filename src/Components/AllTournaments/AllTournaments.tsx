import { useDocTitle } from '../../Hooks/useDocTitle';
import TournamentsTable from '../Elements/TournamentsTable/TournamentsTable';

function AllTournaments() {
  useDocTitle('Все турниры');

  return (
    <main>
      <TournamentsTable />
    </main>
  );
}

export default AllTournaments;
