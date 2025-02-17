import { useGetStatsQuery } from 'Store/ToolkitAPIs/tournamentAPI';

function Stats() {
  const { data: stats } = useGetStatsQuery(undefined);

  return (
    <div className='main-stats'>
      <p>
        Всего турниров <strong>{stats?.tc}</strong>, вопросов <strong>{stats?.qc}</strong>
      </p>
    </div>
  );
}

export default Stats;
