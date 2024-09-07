import './allTournaments.css';
import { useDocTitle } from '../../Hooks/useDocTitle';
import useTournamentsShort from './hooks/useTournamentsShorts';
import { Spinner } from '../Elements/Spinner/Spinner';
import AllTournamentsTable from './AllTournamentsTable';
import extractServerErrorMessage from '../../Helpers/extractServerErrorMessage';

function AllTournaments() {
  useDocTitle('Все турниры');

  const {
    setTournamentsShorts,
    tournamentsShorts,
    isSuccess,
    isLoading,
    error,
  } = useTournamentsShort();

  return (
    <main>
      {isLoading && <Spinner />}

      {error && <h2>{extractServerErrorMessage(error)}</h2>}

      {isSuccess && (
        <AllTournamentsTable
          setTournamentsShorts={setTournamentsShorts}
          tournamentsShorts={tournamentsShorts}
        />
      )}
    </main>
  );
}

export default AllTournaments;
