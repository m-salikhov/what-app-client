import './tournament.css';
import { useParams } from 'react-router-dom';
import { Spinner } from 'Common/Components/Spinner/Spinner';
import extractServerErrorMessage from 'Common/Helpers/extractServerErrorMessage';
import { useDocTitle } from 'Common/Hooks/useDocTitle';
import { useGetTournamentQuery } from 'Store/ToolkitAPIs/tournamentAPI';
import TournamentContent from './Components/TournamentContent';

function Tournament() {
  const { id = '' } = useParams();

  const { data: tournament, isSuccess, isLoading, error } = useGetTournamentQuery(id);

  useDocTitle(tournament?.title || 'Турнир');

  window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <main className='tournament-container'>
      {isLoading && <Spinner />}

      {error && <h2>{extractServerErrorMessage(error)}</h2>}

      {isSuccess && <TournamentContent tournament={tournament} />}
    </main>
  );
}

export default Tournament;
