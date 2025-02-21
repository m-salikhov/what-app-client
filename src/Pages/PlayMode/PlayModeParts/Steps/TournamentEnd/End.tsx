import { useNavigate } from 'react-router-dom';
import { ResBlock } from '../Components/ResultBlock/ResBlock';
import { QuestionPlane } from 'Shared/Components/Question/QuestionPlane';
import { Spinner } from 'Shared/Components/Spinner/Spinner';
import { extractServerErrorMessage } from 'Shared/Helpers/extractServerErrorMessage';
import { useAppSelector } from 'Shared/Hooks/redux';
import { TournamentType } from 'Shared/Types/tournament';
import { Button } from 'Shared/Components/Button/Button';
import { selectedResultQuestionNumberPM } from 'Store/Selectors/PlayModeSelectors';
import { useSaveResult } from './useSaveResult';

export function End({ tournament }: { tournament: TournamentType }) {
  const navigate = useNavigate();

  const { isLoading, isSuccess, error } = useSaveResult(tournament);

  const questionNumber = useAppSelector(selectedResultQuestionNumberPM);
  const selectedQuestion = tournament.questions.find((q) => q.qNumber === questionNumber);

  return (
    <div className='end-tournament'>
      <ResBlock />

      {isLoading && <Spinner width='30' />}

      {isSuccess && <p>Ваш результат доступен в Профиле</p>}

      {error && <p>{extractServerErrorMessage(error) || 'Ошибка при сохранении результата'}</p>}

      <Button title='К выбору турнира' onClick={() => navigate('/playmode')} />

      {selectedQuestion && <QuestionPlane q={selectedQuestion} />}
    </div>
  );
}
