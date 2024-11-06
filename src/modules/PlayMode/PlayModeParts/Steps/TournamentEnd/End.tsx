import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ResBlock from '../Components/ResultBlock/ResBlock';
import QuestionPlane from 'Common/Components/Question/QuestionPlane';
import { Spinner } from 'Common/Components/Spinner/Spinner';
import extractServerErrorMessage from 'Common/Helpers/extractServerErrorMessage';
import { useAppSelector } from 'Common/Hooks/redux';
import { TournamentType } from 'Common/Types/tournament';
import { useInitialLoginQuery, usePostUserResultMutation } from 'Store/ToolkitAPIs/userAPI';
import Button from 'Common/Components/Button/Button';

function End({ tournament }: { tournament: TournamentType }) {
  const navigate = useNavigate();

  const { data: currentUser } = useInitialLoginQuery(undefined);
  const [saveUserResult, { isSuccess, error, isLoading }] = usePostUserResultMutation();

  const { result, totalAnsweredCount, totalQuestionsCount, selectedResultQuestion } = useAppSelector(
    (state) => state.playModeReducer
  );

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
