import { ScrollToTop } from "Shared/Components/ScrollToTop/ScrollToTop";
import { Spinner } from "Shared/Components/Spinner/Spinner";
import { TournamentHeader } from "Shared/Components/TournamentHeader/TournamentHeader";
import { setDocTitle } from "Shared/Helpers/setDocTitle";
import { useGetTournamentQuery } from "Store/ToolkitAPIs/tournamentAPI";
import { skipToken } from "@reduxjs/toolkit/query";
import { useParams } from "react-router-dom";
import TournamentContent from "./Components/TournamentContent";

export default function Tournament() {
	const { id } = useParams();

	const {
		data: tournament,
		isLoading,
		isSuccess,
		isError,
	} = useGetTournamentQuery(id ?? skipToken);

	setDocTitle(tournament?.title ?? "");

	window.scrollTo({ top: 0, behavior: "smooth" });

	if (isError) return <h2>Ошибка при получении турнира</h2>;
	if (isLoading) return <Spinner />;
	if (!isSuccess) return null;

	return (
		<>
			<TournamentHeader tournament={tournament} />

			<TournamentContent tournament={tournament} />

			<ScrollToTop />
		</>
	);
}
