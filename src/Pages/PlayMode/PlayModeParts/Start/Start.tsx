import { playModeActions } from "Store/Slices/PlayModeSlice";
import { formatDate } from "Shared/Helpers/formatDate";
import { useAppDispatch, useAppSelector } from "src/Shared/Hooks/redux";
import { TimerOptions } from "./TimerOptions";
import styles from "../../playmode.module.css";
import { tournamentInfoSelector } from "Store/Selectors/PlayModeSelectors";
import { Button } from "Shared/Components/UI/Button/Button";

export function Start() {
	const dispatch = useAppDispatch();
	const { questionsQuantity, tours, date, editors } = useAppSelector(tournamentInfoSelector);

	return (
		<div className={styles.start}>
			<div className={styles.startInfo}>
				<p>Вопросов: {questionsQuantity}</p>
				<p>Туров: {tours}</p>
				<p>Дата: {formatDate(date)}</p>
			</div>

			<div className={styles.startEditors}>
				<p>Редактор(ы):</p>
				<p>{editors.map((v) => v.name).join(", ")}</p>
			</div>

			<TimerOptions />

			<div className={styles.startButton}>
				<Button size="large" onClick={() => dispatch(playModeActions.setStep())}>
					{" "}
					Начать игру{" "}
				</Button>
			</div>
		</div>
	);
}
