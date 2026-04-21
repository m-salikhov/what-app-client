import { skipToken } from "@reduxjs/toolkit/query";
import { useParams } from "react-router-dom";
import { useGetTournamentQuery } from "Store/ToolkitAPIs/tournamentAPI";

export default function ModerateTournament() {
	const { id } = useParams();
	const {
		data: tournament,
		// isLoading,
		// isSuccess,
		// isError,
	} = useGetTournamentQuery(id ?? skipToken);

	console.log(tournament);

	return <p>Модерация турниров {id}</p>;
}
