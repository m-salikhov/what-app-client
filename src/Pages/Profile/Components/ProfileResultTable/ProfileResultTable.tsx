import './ProfileResultTable.css';
import { skipToken } from '@reduxjs/toolkit/query';
import { useParams } from 'react-router-dom';
import { Back } from 'Shared/Components/Back/Back';
import { ResultTable } from 'Shared/Components/ResultTable/ResultTable';
import { useGetUserResultFullQuery } from 'Store/ToolkitAPIs/userAPI';
import { getDate } from 'Shared/Helpers/getDate';

export default function ProfileResultTable() {
  const { tournamentId, userId } = useParams();

  const { data: results } = useGetUserResultFullQuery(userId ?? skipToken);

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
          {tournamentId && <ResultTable result={tournamentResult.result} tournamentId={+tournamentId} />}
        </>
      )}

      <Back />
    </div>
  );
}
