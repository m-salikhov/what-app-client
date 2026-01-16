import { TournamentsTable } from "Shared/Components/TournamentsTable/TournamentsTable";
import { setDocTitle } from "Shared/Helpers/setDocTitle";

function AllTournaments() {
	setDocTitle("Все турниры");

	return <TournamentsTable amount={50} />;
}

export default AllTournaments;
