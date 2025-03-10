import { useEffect } from 'react';
import { useAppSelector } from 'Shared/Hooks/redux';
import { useInitialLogin } from 'Shared/Hooks/useInitialLogin';
import { ResultClientSchema } from 'Shared/Schemas/ResultSchema';
import { TournamentType } from 'Shared/Schemas/TournamentSchema';
import { finalResult } from 'Store/Selectors/PlayModeSelectors';
import { usePostUserResultMutation } from 'Store/ToolkitAPIs/userAPI';

export function useSaveResult(tournament: TournamentType) {
  const { currentUser } = useInitialLogin();

  const [saveUserResult, { isSuccess, error, isLoading }] = usePostUserResultMutation();

  const { result, totalAnsweredCount, totalQuestionsCount } = useAppSelector(finalResult);

  useEffect(() => {
    if (!currentUser?.id) return;

    const userResult = {
      userId: currentUser.id,
      title: tournament.title,
      tournamentId: tournament.id,
      tournamentLength: totalQuestionsCount,
      resultNumber: totalAnsweredCount,
      result,
    };

    try {
      ResultClientSchema.parse(userResult);
      saveUserResult(userResult);
    } catch (error_) {
      console.log(error_);
    }
  }, [
    tournament.questionsQuantity,
    tournament.id,
    tournament.title,
    currentUser,
    result,
    totalAnsweredCount,
    saveUserResult,
    totalQuestionsCount,
  ]);

  return {
    isSuccess,
    error,
    isLoading,
  };
}
