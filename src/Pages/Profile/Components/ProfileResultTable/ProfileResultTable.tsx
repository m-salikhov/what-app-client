import './ProfileResultTable.css';
import { skipToken } from '@reduxjs/toolkit/query';
import { useParams } from 'react-router-dom';
import { Back } from 'Shared/Components/Back/Back';
import { QuestionPlane } from 'Shared/Components/Question/QuestionPlane';
import { ResultTable } from 'Shared/Components/ResultTable/ResultTable';
import { useAppSelector } from 'Shared/Hooks/redux';
import { selectedResultQuestionNumberPM } from 'Store/Selectors/PlayModeSelectors';
import { useGetTournamentQuery } from 'Store/ToolkitAPIs/tournamentAPI';
import { useGetUserResultFullQuery } from 'Store/ToolkitAPIs/userAPI';
import { getDate } from 'Shared/Helpers/getDate';

export default function ProfileResultTable() {
  const { tournamentId, userId } = useParams();
  const questionNumber = useAppSelector(selectedResultQuestionNumberPM);

  const { data: results } = useGetUserResultFullQuery(userId ?? skipToken);
  const { data: tournament } = useGetTournamentQuery(tournamentId ?? skipToken);

  const selectedQuestion = tournament?.questions.find((q) => q.qNumber === questionNumber);

  const tournamentResult = results?.find((t) => t.tournamentId === Number(tournamentId));

  return (
    <div className='profile-result-table'>
      {tournamentResult && (
        <>
          <h2>{tournamentResult.title}</h2>
          <div className='profile-result-info'>
            <p>{`Ваш результат: ${tournamentResult.resultNumber} из ${tournamentResult.tournamentLength}`}</p>
            <p>{`${getDate(tournamentResult.date)}`}</p>
          </div>
          <ResultTable result={tournamentResult.result} />
        </>
      )}

      {selectedQuestion && <QuestionPlane q={selectedQuestion} />}
      <Back />
    </div>
  );
}
