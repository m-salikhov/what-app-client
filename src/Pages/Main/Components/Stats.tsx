import { useGetStatsQuery } from "Store/ToolkitAPIs/tournamentAPI";
import styles from "./main-components.module.css";

export function Stats() {
	const { data: stats } = useGetStatsQuery(undefined);

	return (
		<div className={styles.stats}>
			<p>
				Всего турниров <strong>{stats?.tc ?? 0}</strong>, вопросов <strong>{stats?.qc ?? 0}</strong>
			</p>
		</div>
	);
}
