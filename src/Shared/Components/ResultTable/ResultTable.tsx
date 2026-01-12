import type { ResultElementClientType } from "Shared/Schemas/ResultSchema";
import { useGetTournamentQuery } from "Store/ToolkitAPIs/tournamentAPI";
import { skipToken } from "@reduxjs/toolkit/query";
import { useState } from "react";
import { QuestionPlane } from "../Question/QuestionPlane";
import styles from "./result-table.module.css";
import { TourTable } from "./TourTable";

interface Props {
	result: ResultElementClientType[];
	tournamentId: number | string | undefined;
}

export function ResultTable({ result, tournamentId: id }: Props) {
	const resByTour = Object.groupBy(result, (v) => v.tour);

	const [selectedQuestionNumber, setSelectedQuestionNumber] = useState<number | null>(null);

	const { data: tournament } = useGetTournamentQuery(id ? String(id) : skipToken);

	const selectedQuestion = tournament?.questions.find((q) => q.qNumber === selectedQuestionNumber);

	const resultTable = [];
	for (let i = 1; i <= Object.keys(resByTour).length; i++) {
		resultTable.push(
			<TourTable
				key={i}
				tourResult={resByTour[i]}
				setSelectedQuestionNumber={setSelectedQuestionNumber}
			/>,
		);
	}

	return (
		<div className={styles.container}>
			{resultTable}
			{selectedQuestion && <QuestionPlane q={selectedQuestion} />}
		</div>
	);
}
