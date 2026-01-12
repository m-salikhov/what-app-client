import { ResultTable } from "Shared/Components/ResultTable/ResultTable";
import { useAppSelector } from "Shared/Hooks/redux";
import type { ResultElementClientType } from "Shared/Schemas/ResultSchema";
import {
	currentTourNumberSelector,
	finalResult,
	tournamentInfoSelector,
} from "Store/Selectors/PlayModeSelectors";
import styles from "../../../playmode.module.css";

const calcTourResult = (tour: number, res: ResultElementClientType[]) => {
	const tourResult = res.reduce(
		(acc, v) => {
			if (v.tour === tour) {
				acc[1]++;
				if (v.ans) acc[0]++;
			}
			return acc;
		},
		[0, 0],
	);

	return tourResult;
};

export function ResBlock() {
	const { result, totalAnsweredCount, totalQuestionsCount } = useAppSelector(finalResult);
	const currentTour = useAppSelector(currentTourNumberSelector);
	const { id } = useAppSelector(tournamentInfoSelector);

	const [TourCount, TourLength] = calcTourResult(currentTour, result);

	return (
		<>
			<div className={styles.resblock}>
				<p className={styles.resblockText}>
					{`Результат ${currentTour}-го тура:`}
					<span>{`${TourCount} из ${TourLength}`}</span>{" "}
				</p>
				{currentTour > 1 && (
					<p className={styles.resblockText}>
						{`Результат общий:`}
						<span>{`${totalAnsweredCount} из ${totalQuestionsCount}`}</span>{" "}
					</p>
				)}
			</div>

			<ResultTable result={result} tournamentId={id} />
		</>
	);
}
