import { ResultTable } from "Shared/Components/ResultTable/ResultTable";
import { useAppSelector } from "Shared/Hooks/redux";
import type { ResultElementClientType } from "Shared/Schemas/ResultSchema";
import { currentTourNumberPM, finalResult } from "Store/Selectors/PlayModeSelectors";

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

export function ResBlock({ tournamentId }: { tournamentId: number }) {
	const { result, totalAnsweredCount, totalQuestionsCount } = useAppSelector(finalResult);
	const currentTour = useAppSelector(currentTourNumberPM);

	const [TourCount, TourLength] = calcTourResult(currentTour, result);

	return (
		<>
			<div className="resblock">
				<p>
					{`Результат ${currentTour}-го тура:`}
					<span>{`${TourCount} из ${TourLength}`}</span>{" "}
				</p>
				{currentTour > 1 && (
					<p>
						{`Результат общий:`}
						<span>{`${totalAnsweredCount} из ${totalQuestionsCount}`}</span>{" "}
					</p>
				)}
			</div>

			<ResultTable result={result} tournamentId={+tournamentId} />
		</>
	);
}
