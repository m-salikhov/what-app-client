import { AddLinkQuestion, AddLinkTournament } from '../Types/AddLinkTournament';

export function removeQuestionsID(tournament: AddLinkTournament) {
  const t = { ...tournament };
  t.questions = t.questions
    .map((q) => {
      const { id, ...rest } = q;
      return rest as AddLinkQuestion;
    })
    .filter((q) => q.qNumber !== -1);

  return t;
}
