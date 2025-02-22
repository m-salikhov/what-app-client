import { useState } from 'react';
import { TournamentType, TournamentTypeSchema } from 'Shared/Schemas/TournamentSchema';

export function useCheckParsingErrors() {
  const [errorsFilling, setErrorsFilling] = useState<string[]>([]);
  const resetErrors = () => {
    setErrorsFilling([]);
  };

  function checkTournament(t: TournamentType) {
    setErrorsFilling([]);

    const parse = TournamentTypeSchema.safeParse(t);

    if (parse.error) {
      const { errors } = parse.error;
      errors.forEach((e) => {
        if (e.path[0] === 'questions') {
          setErrorsFilling((prev) => [...prev, `Вопрос ${t.questions[+e.path[1]].qNumber}: ${e.message}`]);
        } else {
          setErrorsFilling((prev) => [...prev, e.message]);
        }
      });
    }

    return parse.success;
  }

  return { errorsFilling, checkTournament, resetErrors };
}
