import './playmode.css';
import { useParams } from 'react-router-dom';
import Start from './PlayModeParts/Steps/Start/Start';
import PMQuestion from './PlayModeParts/Steps/Components/PMQuestion/PMQuestion';
import TourEnd from './PlayModeParts/Steps/TourEnd/TourEnd';
import End from './PlayModeParts/Steps/TournamentEnd/End';
import ProgressBar from './PlayModeParts/Steps/Components/ProgressBar/ProgressBar';
import { Spinner } from 'Common/Components/Spinner/Spinner';
import { useAppSelector } from 'Common/Hooks/redux';
import { TournamentType } from 'Common/Types/tournament';
import { Step } from 'Store/Slices/PlayModeSlice';
import { useGetTournamentQuery } from 'Store/ToolkitAPIs/tournamentAPI';
import { stepPM } from 'Store/Selectors/PlayModeSelectors';

function playModeStepChange(stepName: Step, tournament: TournamentType) {
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

  const step = useAppSelector(stepPM);

  const { data: tournament, isLoading, isSuccess, isError } = useGetTournamentQuery(id as string);

  const showProgressBar = isSuccess && step !== 'START' && step !== 'END';

  if (isLoading) return <Spinner />;

  return (
    <>
      <h2>{title}</h2>

      {showProgressBar && <ProgressBar tournament={tournament} />}

      {isError && <p className='pm-error'> Ошибка: Не удалось загрузить турнир</p>}

      {isSuccess && playModeStepChange(step, tournament)}
    </>
  );
}

export default PlayMode;
