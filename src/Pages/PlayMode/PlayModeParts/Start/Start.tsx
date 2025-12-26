import type { TournamentType } from "Shared/Schemas/TournamentSchema";
import { playModeActions } from "Store/Slices/PlayModeSlice";
import { getDate } from "src/Shared/Helpers/getDate";
import { useAppDispatch } from "src/Shared/Hooks/redux";
import { TimerOptions } from "./TimerOptions";
import styles from "../../playmode.module.css";

export function Start({ tournament }: { tournament: TournamentType }) {
	const dispatch = useAppDispatch();

	return (
		<div className={styles.start}>
			<div className={styles.startInfo}>
				<p>Вопросов: {tournament.questionsQuantity}</p>
				<p>Туров: {tournament.tours}</p>
				<p>Дата: {getDate(tournament.date)}</p>
			</div>

			<div className={styles.startEditors}>
				<p>Редактор(ы):</p>
				<p>{tournament.editors.map((v) => v.name).join(", ")}</p>
			</div>

			<TimerOptions />

			<div className={styles.startButton}>
				<button type="button" onClick={() => dispatch(playModeActions.setStep("QUESTION"))}>
					Начать игру
				</button>
			</div>
		</div>
	);
}
