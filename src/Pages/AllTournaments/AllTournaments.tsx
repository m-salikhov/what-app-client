import { TournamentsTable } from "Shared/Components/TournamentsTable/TournamentsTable";
import { Back } from "Shared/Components/UI/Back/Back";
import { setDocTitle } from "Shared/Helpers/setDocTitle";

function AllTournaments() {
	setDocTitle("Все турниры");

	return (
		<>
			<Back />
			<TournamentsTable amount={50} />
		</>
	);
}

export default AllTournaments;
