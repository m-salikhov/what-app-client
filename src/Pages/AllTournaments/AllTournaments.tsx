import { Spinner } from "Shared/Components/Spinner/Spinner";
import { TournamentsTable } from "Shared/Components/TournamentsTable/TournamentsTable";
import { setDocTitle } from "Shared/Helpers/setDocTitle";
import { useGetTournamentsAllShortQuery } from "Store/ToolkitAPIs/tournamentAPI";

function AllTournaments() {
	setDocTitle("Все турниры");

	const {
		data: tournaments,
		isSuccess,
		error,
		isLoading,
	} = useGetTournamentsAllShortQuery(undefined);

	if (error) return <h2>Ошибка при получении турниров</h2>;

	if (isLoading) return <Spinner />;

	if (!isSuccess) return null;

	return <TournamentsTable tournaments={tournaments.slice(0, 50)} />;
}

export default AllTournaments;
