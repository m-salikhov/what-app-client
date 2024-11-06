import TournamentsTable from 'Common/Components/TournamentsTable/TournamentsTable';
import { useDocTitle } from 'Common/Hooks/useDocTitle';

function AllTournaments() {
  useDocTitle('Все турниры');

  return (
    <main>
      <TournamentsTable />
    </main>
  );
}

export default AllTournaments;
