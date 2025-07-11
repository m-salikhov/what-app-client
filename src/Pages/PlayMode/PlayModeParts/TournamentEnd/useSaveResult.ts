import { useEffect } from 'react';
import { useAuth } from 'Shared/Auth/useAuth';
import { useAppSelector } from 'Shared/Hooks/redux';
import { ResultClientSchema } from 'Shared/Schemas/ResultSchema';
import { TournamentType } from 'Shared/Schemas/TournamentSchema';
import { finalResult } from 'Store/Selectors/PlayModeSelectors';
import { usePostUserResultMutation } from 'Store/ToolkitAPIs/userAPI';

export function useSaveResult(tournament: TournamentType) {
  const { user } = useAuth();

  const [saveUserResult, { isSuccess, error, isLoading }] = usePostUserResultMutation();

  const { result, totalAnsweredCount, totalQuestionsCount } = useAppSelector(finalResult);

  useEffect(() => {
    if (!user) return;

    const userResult = {
      userId: user.id,
      title: tournament.title,
      tournamentId: tournament.id,
      tournamentLength: totalQuestionsCount,
      resultNumber: totalAnsweredCount,
      result,
    };

    try {
      ResultClientSchema.parse(userResult);
      saveUserResult(userResult);
    } catch (_error) {
      console.log(_error);
    }
  }, [
    tournament.questionsQuantity,
    tournament.id,
    tournament.title,
    user,
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
