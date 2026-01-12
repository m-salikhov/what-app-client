import type { ResultElementClientType } from "Shared/Schemas/ResultSchema";
import green_ans from "./green_mark.svg";
import red_ans from "./red_cross.svg";
import styles from "./result-table.module.css";

interface Props {
	tourResult: ResultElementClientType[] | undefined;
	setSelectedQuestionNumber: (value: number) => void;
}

export function TourTable({ tourResult, setSelectedQuestionNumber }: Props) {
	if (!tourResult) return null;

	return (
		<div className={styles.table}>
			{tourResult.map((v) => {
				return (
					<button
						type="button"
						className={styles.tableElement}
						key={v.num}
						onClick={() => setSelectedQuestionNumber(v.num)}
					>
						<div className={styles.questionNumber}>{v.num}</div>

						<div className={styles.iconContainer}>
							<img src={v.ans ? green_ans : red_ans} alt="answer icon" />
						</div>
					</button>
				);
			})}
		</div>
	);
}
