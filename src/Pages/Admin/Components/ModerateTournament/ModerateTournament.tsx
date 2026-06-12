import { useParams } from "react-router-dom";
import { Spinner } from "Shared/Components/Spinner/Spinner";
import { useSetModerateTournament } from "./Hooks/useSetModerateTournament";
import ModerateInfo from "./Components/ModerateInfo";
import ModerateQuestions from "./Components/ModerateQuestions";
import { ScrollToTop } from "Shared/Components/ScrollToTop/ScrollToTop";
import ModerateButtonsBlock from "./Components/ModerateButtonsBlock";
import { Back } from "Shared/Components/UI/Back/Back";

export default function ModerateTournament() {
	const { id } = useParams();
	const { isError, isFetching } = useSetModerateTournament(id);

	if (isFetching) return <Spinner />;
	if (isError) return <h2>Ошибка при получении турнира</h2>;

	return (
		<div>
			<Back />
			<ModerateButtonsBlock />
			<ModerateInfo />
			<ModerateQuestions />
			<ScrollToTop />
		</div>
	);
}
