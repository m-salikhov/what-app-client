import { useParams } from 'react-router-dom';
import Start from './PlayModeParts/Start';
import PMQuestion from './PlayModeParts/PMQuestion/PMQuestion';
import TourEnd from './PlayModeParts/End/TourEnd';
import End from './PlayModeParts/End/End';
import { Step } from '../../Store/reducers/PlayModeSlice';
import { useAppSelector } from '../../Hooks/redux';
import { useGetTournamentQuery } from '../../Store/tournamentAPI';
import { Spinner } from '../Elements/Spinner/Spinner';
import { TournamentType } from '../../Types/tournament';
import './playmode.scss';

function PlayModeChange(stepName: Step, tournament: TournamentType) {
  switch (stepName) {
    case 'START':
      return <Start tournament={tournament} />;
    case 'QUESTION':
      return <PMQuestion tournament={tournament} />;
    case 'END_OF_TOUR':
      return <TourEnd tournament={tournament} />;
    case 'END':
      return <End tournament={tournament} />;
    default:
      return null;
  }
}

function PlayMode() {
  const { id, title } = useParams();

  const { step } = useAppSelector((state) => state.playModeReducer);

  const { data: tournament, isLoading, isSuccess, isError } = useGetTournamentQuery(id as string);

  return (
    <main>
      <h2>{title}</h2>
      {isLoading && <Spinner />}
      {isError && <p className='pm_error'> Ошибка: Не удалось загрузить турнир</p>}
      {isSuccess && PlayModeChange(step, tournament)}
    </main>
  );
}

export default PlayMode;
