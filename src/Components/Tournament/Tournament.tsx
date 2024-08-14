import { useParams } from 'react-router-dom';
import { useDocTitle } from '../../Hooks/useDocTitle';
import { useGetTournamentQuery } from '../../Store/tournamentAPI';
import extractServerErrorMessage from '../../Helpers/extractServerErrorMessage';
import { Spinner } from '../Elements/Spinner/Spinner';
import TournamentContent from './TournamentContent';
import './tournament.scss';

function Tournament() {
  const { id = '' } = useParams();
  const {
    data: tournament,
    isSuccess,
    isLoading,
    error,
  } = useGetTournamentQuery(id);

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
