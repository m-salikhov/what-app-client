import { skipToken } from "@reduxjs/toolkit/query";
import { useParams } from "react-router-dom";
import { Spinner } from "Shared/Components/Spinner/Spinner";
import { useGetTournamentQuery } from "Store/ToolkitAPIs/tournamentAPI";

export default function ModerateTournament() {
	const { id } = useParams();
	const {
		data: tournament,
		isLoading,
		isSuccess,
		isError,
	} = useGetTournamentQuery(id ?? skipToken);

	if (isError) return <h2>Ошибка при получении турнира</h2>;
	if (isLoading) return <Spinner />;
	if (!isSuccess) return null;

	console.log(tournament);

	return (
		<div>
			<label>
				<p> Название турнира</p>
				<input
					placeholder="Название турнира"
					type="text"
					// onChange={(e) => dispatch({ type: actionTypes.title, payload: e.target.value })}
					value={tournament.title}
				/>
			</label>
		</div>
	);
}
