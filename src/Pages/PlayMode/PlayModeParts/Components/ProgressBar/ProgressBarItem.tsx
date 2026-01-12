import { useAppSelector } from "Shared/Hooks/redux";
import { currentQuestionIndexSelector, stepSelector } from "Store/Selectors/PlayModeSelectors";
import styles from "../../../playmode.module.css";

export function ProgressBarItem({ questionIndex }: { questionIndex: number }) {
	const currentQuestionIndex = useAppSelector(currentQuestionIndexSelector);
	const step = useAppSelector(stepSelector);

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
