import { useGetStatsQuery } from 'Store/ToolkitAPIs/tournamentAPI';

export function Stats() {
  const { data: stats } = useGetStatsQuery(undefined);

  return (
    <div className='main-stats'>
      <p>
        Всего турниров <strong>{stats?.tc || 0}</strong>, вопросов <strong>{stats?.qc || 0}</strong>
      </p>
    </div>
  );
}
