import { Button } from "Shared/Components/UI/Button/Button";
import { useAppDispatch } from "Shared/Hooks/redux";
import type { TournamentType } from "Shared/Schemas/TournamentSchema";
import { playModeActions } from "Store/Slices/PlayModeSlice";
import { ResBlock } from "../Components/ResultBlock/ResBlock";

export function TourEnd({ tournament }: { tournament: TournamentType }) {
	const dispatch = useAppDispatch();

	const onClick = () => {
		dispatch(playModeActions.currentQuestionIndexIncrement());
		dispatch(playModeActions.setStep("QUESTION"));
	};

	return (
		<div>
			<ResBlock tournamentId={tournament.id} />
			<Button title="Следующий тур" onClick={onClick} />
		</div>
	);
}
