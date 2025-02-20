import TourTable from '../Components/ResultBlock/TourTable';
import { ResultElementClientType } from 'Shared/Schemas/ResultSchema';

export const makeResultTable = (result: ResultElementClientType[]) => {
  const resByTour = Object.groupBy(result, (v) => v.tour);

  const resultTable = [];
  for (let i = 1; i <= Object.keys(resByTour).length; i++) {
    resultTable.push(<TourTable tourResult={resByTour[i]} key={i} />);
  }
  return resultTable;
};
