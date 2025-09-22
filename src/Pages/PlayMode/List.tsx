import { Spinner } from "Shared/Components/Spinner/Spinner";
import { TournamentsTable } from "Shared/Components/TournamentsTable/TournamentsTable";
import { setDocTitle } from "Shared/Helpers/setDocTitle";
import { useGetTournamentsAllShortQuery } from "Store/ToolkitAPIs/tournamentAPI";

function List() {
	setDocTitle("Игровой режим");

	const {
		data: tournaments,
		isSuccess,
		isError,
		isLoading,
	} = useGetTournamentsAllShortQuery(undefined);

	if (isError) return <h2>Ошибка при получении турниров</h2>;
	if (isLoading) return <Spinner />;
	if (!isSuccess) return null;

	return <TournamentsTable tournaments={tournaments} />;
}

export default List;
