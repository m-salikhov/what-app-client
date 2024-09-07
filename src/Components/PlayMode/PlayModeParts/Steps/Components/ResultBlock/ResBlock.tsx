import { useAppSelector } from '../../../../../../Hooks/redux';
import { ResultType } from '../../../../../../Store/Slices/PlayModeSlice';
import { makeResultTable } from '../../Helpers/makeResultTable';

const calcTourResult = (tour: number, res: ResultType) => {
  const tourResArrBoolean = res[tour];

  let count = 0;
  tourResArrBoolean.forEach((v) => {
    if (v.ans) count++;
  });

  return [count, res[tour].length];
};

function ResBlock() {
  const { result, totalAnsweredCount, totalQuestionsCount } = useAppSelector(
    (state) => state.playModeReducer
  );

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
