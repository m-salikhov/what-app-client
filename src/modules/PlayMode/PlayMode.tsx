import './playmode.css';
import { useParams } from 'react-router-dom';
import { Step } from '../../Store/Slices/PlayModeSlice';
import { useAppSelector } from '../../Common/Hooks/redux';
import { useGetTournamentQuery } from '../../Store/ToolkitAPIs/tournamentAPI';
import { Spinner } from '../Elements/Spinner/Spinner';
import { TournamentType } from '../../Common/Types/tournament';
import { StepPM } from './PlayModeParts/Types/playmodeTypes';
import Start from './PlayModeParts/Steps/Start/Start';
import PMQuestion from './PlayModeParts/Steps/Components/PMQuestion/PMQuestion';
import TourEnd from './PlayModeParts/Steps/TourEnd/TourEnd';
import End from './PlayModeParts/Steps/TournamentEnd/End';
import ProgressBar from './PlayModeParts/Steps/Components/ProgressBar/ProgressBar';

function playModeStepChange(stepName: Step, tournament: TournamentType) {
  switch (stepName) {
    case StepPM.START:
      return <Start tournament={tournament} />;
    case StepPM.QUESTION:
      return <PMQuestion tournament={tournament} />;
    case StepPM.END_OF_TOUR:
      return <TourEnd tournament={tournament} />;
    case StepPM.END:
      return <End tournament={tournament} />;
    default:
      return null;
  }
}

function PlayMode() {
  const { id, title } = useParams();

  const { step } = useAppSelector((state) => state.playModeReducer);

  const { data: tournament, isLoading, isSuccess, isError } = useGetTournamentQuery(id as string);

  const showProgressBar = isSuccess && step !== 'START' && step !== 'END';

  return (
    <main>
      <h2>{title}</h2>

      {showProgressBar && <ProgressBar tournament={tournament} />}

      {isLoading && <Spinner />}

      {isError && <p className='pm-error'> Ошибка: Не удалось загрузить турнир</p>}

      {isSuccess && playModeStepChange(step, tournament)}
    </main>
  );
}

export default PlayMode;
