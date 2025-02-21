import { ResultElementClientType } from 'Shared/Schemas/ResultSchema';
import { TourTable } from './TourTable';

interface Props {
  result: ResultElementClientType[];
}

export default function ResultTable({ result }: Props) {
  const resByTour = Object.groupBy(result, (v) => v.tour);

  const resultTable = [];
  for (let i = 1; i <= Object.keys(resByTour).length; i++) {
    resultTable.push(<TourTable tourResult={resByTour[i]} key={i} />);
  }

  return <div className='result-table'>{resultTable}</div>;
}
