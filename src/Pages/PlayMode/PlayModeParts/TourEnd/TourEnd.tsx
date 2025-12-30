import styles from "../../playmode.module.css";
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
		<div className={styles.tourEnd}>
			<ResBlock tournamentId={tournament.id} />
			<div className={styles.tourEndButton}>
				<Button onClick={onClick}> Следующий тур</Button>
			</div>
		</div>
	);
}
