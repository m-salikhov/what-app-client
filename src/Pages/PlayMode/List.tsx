import { TournamentsTable } from "Shared/Components/TournamentsTable/TournamentsTable";
import { Back } from "Shared/Components/UI/Back/Back";
import { setDocTitle } from "Shared/Helpers/setDocTitle";

function List() {
	setDocTitle("Игровой режим");

	return (
		<>
			<Back />
			<TournamentsTable amount={50} />
		</>
	);
}

export default List;
