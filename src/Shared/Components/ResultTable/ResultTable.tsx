import styles from './result-table.module.css';
import { ResultElementClientType } from 'Shared/Schemas/ResultSchema';
import { TourTable } from './TourTable';
import { QuestionPlane } from '../Question/QuestionPlane';
import { useGetTournamentQuery } from 'Store/ToolkitAPIs/tournamentAPI';
import { useState } from 'react';
import { skipToken } from '@reduxjs/toolkit/query';

interface Props {
  result: ResultElementClientType[];
  tournamentId: number | undefined;
}

export function ResultTable({ result, tournamentId }: Props) {
  const resByTour = Object.groupBy(result, (v) => v.tour);

  const [selectedQuestionNumber, setSelectedQuestionNumber] = useState<number | null>(null);

  const { data: tournament } = useGetTournamentQuery(tournamentId ?? skipToken);

  const selectedQuestion = tournament?.questions.find((q) => q.qNumber === selectedQuestionNumber);

  const resultTable = [];
  for (let i = 1; i <= Object.keys(resByTour).length; i++) {
    resultTable.push(
      <TourTable key={i} tourResult={resByTour[i]} setSelectedQuestionNumber={setSelectedQuestionNumber} />
    );
  }

  return (
    <div className={styles.container}>
      {resultTable}
      {selectedQuestion && <QuestionPlane q={selectedQuestion} />}
    </div>
  );
}
