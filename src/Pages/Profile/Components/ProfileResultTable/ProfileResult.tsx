import styles from './profile-result.module.css';
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

  if (!tournamentResult || !tournamentId) return null;

  return (
    <>
      <Back />

      <h2 className={styles.title}>{tournamentResult.title}</h2>
      <div className={styles.info}>
        <p>{`Ваш результат: ${tournamentResult.resultNumber} из ${tournamentResult.tournamentLength}`}</p>
        <p>{getDate(tournamentResult.date)}</p>
      </div>
      <ResultTable result={tournamentResult.result} tournamentId={Number(tournamentId)} />
    </>
  );
}
