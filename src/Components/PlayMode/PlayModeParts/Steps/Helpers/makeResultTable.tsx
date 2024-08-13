import TourTable from '../Components/TourTable';
import { ResultType } from '../../../../../Store/reducers/PlayModeSlice';

export const makeResultTable = (result: ResultType) => {
  const resultTable = [];
  for (let i = 1; i <= Object.keys(result).length; i++) {
    resultTable.push(
      <TourTable tourResult={result[i]} key={result[i][0].num} />
    );
  }
  return resultTable;
};
