import { useLoaderData } from 'react-router-dom';
import { TournamentType } from 'Shared/Schemas/TournamentSchema';
import { TournamentHeader } from 'Shared/Components/TournamentHeader/TournamentHeader';
import { ScrollToTop } from 'Shared/Components/ScrollToTop/ScrollToTop';
import TournamentContent from './Components/TournamentContent';
import { setDocTitle } from 'Shared/Helpers/setDocTitle';

export default function Tournament() {
  const tournament = useLoaderData() as TournamentType;

  setDocTitle(tournament.title);

  window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      <TournamentHeader tournament={tournament} />

      <TournamentContent tournament={tournament} />

      <ScrollToTop />
    </>
  );
}
