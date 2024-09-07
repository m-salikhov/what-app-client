import { QuestionType } from '../../../Types/question';
import { TournamentType } from '../../../Types/tournament';

const removeQuestionsID = (tournament: TournamentType) => {
  const t = { ...tournament };
  t.questions = t.questions
    .map((q) => {
      const { id, ...rest } = q;
      return rest as QuestionType;
    })
    .filter((q) => q.qNumber !== -1);

  return t;
};
export default removeQuestionsID;
