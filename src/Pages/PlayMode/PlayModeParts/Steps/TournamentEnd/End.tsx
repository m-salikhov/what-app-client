import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ResBlock from '../Components/ResultBlock/ResBlock';
import QuestionPlane from 'Shared/Components/Question/QuestionPlane';
import { Spinner } from 'Shared/Components/Spinner/Spinner';
import extractServerErrorMessage from 'Shared/Helpers/extractServerErrorMessage';
import { useAppSelector } from 'Shared/Hooks/redux';
import { TournamentType } from 'Shared/Types/tournament';
import { usePostUserResultMutation } from 'Store/ToolkitAPIs/userAPI';
import Button from 'Shared/Components/Button/Button';
import { finalResult } from 'Store/Selectors/PlayModeSelectors';
import { useInitialLogin } from 'Shared/Hooks/useInitialLogin';

function End({ tournament }: { tournament: TournamentType }) {
  const navigate = useNavigate();

  const { currentUser } = useInitialLogin();

  const [saveUserResult, { isSuccess, error, isLoading }] = usePostUserResultMutation();

  const { result, totalAnsweredCount, totalQuestionsCount, selectedResultQuestion } = useAppSelector(finalResult);

  useEffect(() => {
    if (currentUser?.id) {
      const userResult = {
        userId: currentUser.id,
        title: tournament.title,
        tournamentId: tournament.id,
        tournamentLength: totalQuestionsCount,
        resultNumber: totalAnsweredCount,
        result,
      };
      saveUserResult(userResult);
    }
  }, [
    tournament.questionsQuantity,
    tournament.id,
    tournament.title,
    currentUser,
    result,
    totalAnsweredCount,
    saveUserResult,
  ]);

  return (
    <div className='end-tournament'>
      <ResBlock />

      {isLoading && <Spinner width='30' />}

      {isSuccess && <p>Ваш результат доступен в Профиле</p>}

      {error && <p>{extractServerErrorMessage(error) || 'Ошибка при сохранении результата'}</p>}

      <Button title='К выбору турнира' onClick={() => navigate('/playmode')} />

      {Boolean(selectedResultQuestion) && <QuestionPlane q={tournament.questions[selectedResultQuestion - 1]} />}
    </div>
  );
}

export default End;
