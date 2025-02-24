import './tournament.css';
import { useParams } from 'react-router-dom';
import { Spinner } from 'Shared/Components/Spinner/Spinner';
import { extractServerErrorMessage } from 'Shared/Helpers/extractServerErrorMessage';
import { useDocTitle } from 'Shared/Hooks/useDocTitle';
import { useGetTournamentQuery } from 'Store/ToolkitAPIs/tournamentAPI';
import { TournamentContent } from './Components/TournamentContent';
import { skipToken } from '@reduxjs/toolkit/query';

export default function Tournament() {
  const { id } = useParams();

  const { data: tournament, isSuccess, isLoading, error } = useGetTournamentQuery(id ?? skipToken);

  useDocTitle(tournament?.title || 'Турнир');

  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (error) return <h2>{extractServerErrorMessage(error)}</h2>;

  if (isLoading) return <Spinner />;

  return <div className='tournament-container'>{isSuccess && <TournamentContent tournament={tournament} />}</div>;
}
