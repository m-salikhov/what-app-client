import { TournamentsTable } from "Shared/Components/TournamentsTable/TournamentsTable";
import { setDocTitle } from "Shared/Helpers/setDocTitle";

function List() {
	setDocTitle("Игровой режим");

	return <TournamentsTable amount={50} />;
}

export default List;
