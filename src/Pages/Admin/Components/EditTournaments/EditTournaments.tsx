import { TournamentsTable } from "Shared/Components/TournamentsTable/TournamentsTable";
// import styles from "./edit-tournaments.module.css";
import { Back } from "Shared/Components/UI/Back/Back";

export default function EditTournaments() {
	return (
		<>
			<Back />
			<TournamentsTable amount={20} />
		</>
	);
}
