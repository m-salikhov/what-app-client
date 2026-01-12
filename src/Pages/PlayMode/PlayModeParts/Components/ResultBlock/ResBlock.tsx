import { ResultTable } from "Shared/Components/ResultTable/ResultTable";
import { useAppSelector } from "Shared/Hooks/redux";
import type { ResultElementClientType } from "Shared/Schemas/ResultSchema";
import {
	currentTourNumberSelector,
	resultSelector,
	tournamentInfoSelector,
} from "Store/Selectors/PlayModeSelectors";
import styles from "../../../playmode.module.css";

const calcResult = (tour: number, res: ResultElementClientType[]) => {
	const tourResult = res.reduce(
		(acc, v) => {
			if (v.tour === tour) {
				acc.tourRightAnswers += v.ans ? 1 : 0;
				acc.tourQuestionsCount += 1;
			}
			if (v.ans) acc.totalRightAnswers += 1;

			return acc;
		},
		{
			tourRightAnswers: 0,
			tourQuestionsCount: 0,
			totalRightAnswers: 0,
		},
	);

	return tourResult;
};

export function ResBlock() {
	const result = useAppSelector(resultSelector);
	const currentTour = useAppSelector(currentTourNumberSelector);
	const { id } = useAppSelector(tournamentInfoSelector);

	const { tourRightAnswers, tourQuestionsCount, totalRightAnswers } = calcResult(
		currentTour,
		result,
	);

	return (
		<>
			<div className={styles.resblock}>
				<p className={styles.resblockText}>
					{`Результат ${currentTour}-го тура:`}
					<span>{`${tourRightAnswers} из ${tourQuestionsCount}`}</span>{" "}
				</p>
				{currentTour > 1 && (
					<p className={styles.resblockText}>
						{`Результат общий:`}
						<span>{`${totalRightAnswers} из ${result.length}`}</span>{" "}
					</p>
				)}
			</div>

			<ResultTable result={result} tournamentId={id} />
		</>
	);
}
