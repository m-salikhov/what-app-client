import { useParams } from "react-router-dom";
import { Spinner } from "Shared/Components/Spinner/Spinner";
import { useSetModerateTournament } from "./Hooks/useSetModerateTournament";
import ModerateInfo from "./Components/ModerateInfo";

export default function ModerateTournament() {
	const { id } = useParams();
	const { isError, isFetching } = useSetModerateTournament(id);

	if (isFetching) return <Spinner />;
	if (isError) return <h2>Ошибка при получении турнира</h2>;

	return (
		<div>
			<ModerateInfo />
		</div>
	);
}
