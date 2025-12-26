import { useAppSelector } from "Shared/Hooks/redux";
import { currentQuestionIndexPM, stepPM } from "Store/Selectors/PlayModeSelectors";
import styles from "../../../playmode.module.css";

export function ProgressBarItem({ questionIndex }: { questionIndex: number }) {
	const currentQuestionIndex = useAppSelector(currentQuestionIndexPM);
	const step = useAppSelector(stepPM);

	return (
		<div
			className={
				questionIndex < currentQuestionIndex || step === "END_OF_TOUR"
					? `${styles.progressBarItem} ${styles.fill}`
					: styles.progressBarItem
			}
		>
			<p className={styles.progressBarItemNumber}>{questionIndex + 1}</p>
		</div>
	);
}
