import { makeResultTable } from '../../Helpers/makeResultTable';
import { useAppSelector } from 'Shared/Hooks/redux';
import { ResultElementType } from 'Shared/Schemas/ResultSchema';
import { finalResult } from 'Store/Selectors/PlayModeSelectors';

const calcTourResult = (tour: number, res: { [tourNumber: number]: ResultElementType[] }) => {
  let count = 0;
  res[tour].forEach((v) => {
    if (v.ans) count++;
  });

  return [count, res[tour].length];
};

function ResBlock() {
  const { result, totalAnsweredCount, totalQuestionsCount } = useAppSelector(finalResult);

  const tour = Object.keys(result).length;

  const [TourCount, TourLength] = calcTourResult(tour, result);

  return (
    <>
      <div className='resblock'>
        <p>
          {`Результат ${tour}-го тура:`}
          <span>{`${TourCount} из ${TourLength}`}</span>{' '}
        </p>
        {tour > 1 && (
          <p>
            {`Результат общий:`}
            <span>{`${totalAnsweredCount} из ${totalQuestionsCount}`}</span>{' '}
          </p>
        )}
      </div>

      {makeResultTable(result)}
    </>
  );
}

export default ResBlock;
