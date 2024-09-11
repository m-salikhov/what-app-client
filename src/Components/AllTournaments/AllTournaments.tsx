import './allTournaments.css';
import { useDocTitle } from '../../Hooks/useDocTitle';
import useTournamentsShort from './hooks/useTournamentsShorts';
import { Spinner } from '../Elements/Spinner/Spinner';
import AllTournamentsTable from './AllTournamentsTable';
import extractServerErrorMessage from '../../Helpers/extractServerErrorMessage';
import TournamentsTable from '../Elements/TournamentsTable/TournamentsTable';

function AllTournaments() {
  useDocTitle('Все турниры');

  const { isSuccess, isLoading, error } = useTournamentsShort();

  return (
    <main>
      {/* {isLoading && <Spinner />}

      {error && <h2>{extractServerErrorMessage(error)}</h2>}

      {isSuccess && <AllTournamentsTable />} */}
      <TournamentsTable />
    </main>
  );
}

export default AllTournaments;
