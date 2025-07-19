import { Dispatch, useState } from 'react';
import { useAuth } from 'Shared/Auth/useAuth';
import { TournamentType, TournamentTypeSchema } from 'Shared/Schemas/TournamentSchema';
import { useAddTournamentMutation, useParseLinkMutation } from 'Store/ToolkitAPIs/tournamentAPI';
import { Action } from '../helpers/reducer';

export function useSaveTournament() {
  const [errorsFilling, setErrorsFilling] = useState<string[]>([]);

  const [saveTournament, { isLoading: isLoadingSave, error: errorOnSave, isSuccess: isSuccessSave, reset: resetSave }] =
    useAddTournamentMutation();
  const [
    parseTournament,
    { isLoading: isLoadingParse, error: errorOnParse, reset: resetParse, isSuccess: isSuccessParse },
  ] = useParseLinkMutation();

  const reset = () => {
    resetSave();
    resetParse();
  };

  const { user } = useAuth();

  const handleSaveTournament = async (tournament: TournamentType) => {
    setErrorsFilling([]);

    const parse = TournamentTypeSchema.safeParse(tournament);
    if (parse.error) {
      const { errors } = parse.error;
      errors.forEach((e) => {
        if (e.path[0] === 'questions') {
          setErrorsFilling((prev) => [...prev, `Вопрос ${tournament.questions[+e.path[1]].qNumber}: ${e.message}`]);
        } else {
          setErrorsFilling((prev) => [...prev, e.message]);
        }
      });

      return;
    }

    try {
      await saveTournament({
        ...tournament,
        questions: tournament.questions.filter((q) => q.qNumber !== -1),
        uploaderUuid: user?.id || '',
        uploader: user?.username || '',
      }).unwrap();
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  const handleParseLink = async (dispatch: Dispatch<Action>, link: string) => {
    reset();
    setErrorsFilling([]);

    try {
      const data = await parseTournament({ link }).unwrap();

      dispatch({ type: 'loaded', payload: data });
    } catch (error) {
      console.error('Failed to parse link:', error);
    }
  };

  return {
    errorsFilling,
    handleSaveTournament,
    isLoading: isLoadingSave || isLoadingParse,
    error: errorOnSave || errorOnParse,
    isSuccessSave,
    isSuccessParse,
    handleParseLink,
  };
}
