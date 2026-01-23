import { RandomTournament } from "Shared/Components/RandomTournament/RandomTournament";
import { Spinner } from "Shared/Components/Spinner/Spinner";
import { useGetTournamentsLastShortQuery } from "Store/ToolkitAPIs/tournamentAPI";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./main-components.module.css";
import { PaginationControl } from "Shared/Components/UI/PaginationControl/PaginationControl";

export function LastTournaments() {
	const [page, setPage] = useState(1);
	const amount = 10;

	const { data, isLoading } = useGetTournamentsLastShortQuery({
		amount,
		page,
		withSkip: true,
	});

	if (isLoading) {
		return (
			<div className={styles.loading}>
				<Spinner />
			</div>
		);
	}

	return (
		<div className={styles.tournaments}>
			<div className={styles.tournamentsHeader}>
				<h2>Последние добавленные турниры</h2>
				<RandomTournament size="30" />
			</div>

			<div className={styles.tableHeader}>
				<h3>Название</h3>
				<h3>Добавлен</h3>
			</div>

			{data?.tournaments.map((v) => {
				return (
					<div className={styles.line} key={v.id}>
						<Link to={`tournament/${v.id}`}>{v.title}</Link>
						<div>
							<p className={styles.date}>{v.dateUpload}</p>
						</div>
					</div>
				);
			})}

			<PaginationControl
				currentPage={page}
				totalPages={data?.pageCount || 0}
				setCurrentPage={setPage}
			/>
		</div>
	);
}
