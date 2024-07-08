import { useGetStatsQuery } from '../../Store/tournamentAPI';

function Stats() {
  const { data: stats } = useGetStatsQuery(undefined);

  return (
    <div className='main__stats'>
      <p>
        Всего турниров <strong>{stats?.tc}</strong>, вопросов <strong>{stats?.qc}</strong>
      </p>
    </div>
  );
}

export default Stats;
