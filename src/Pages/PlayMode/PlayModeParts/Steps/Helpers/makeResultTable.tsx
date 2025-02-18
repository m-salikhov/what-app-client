import TourTable from '../Components/ResultBlock/TourTable';
import { ResultElementType } from 'Shared/Schemas/ResultSchema';

export const makeResultTable = (result: { [tourNumber: number]: ResultElementType[] }) => {
  const resultTable = [];
  for (let i = 1; i <= Object.keys(result).length; i++) {
    resultTable.push(<TourTable tourResult={result[i]} key={result[i][0].num} />);
  }
  return resultTable;
};
