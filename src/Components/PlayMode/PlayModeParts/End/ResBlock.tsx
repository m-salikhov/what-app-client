import { useAppSelector } from '../../../../Hooks/redux';
import { ResultType } from '../../../../Store/reducers/PlayModeSlice';

function ResBlock() {
  const { t, qCounter, result, answeredCount } = useAppSelector((state) => state.playModeReducer);
  const tour = t.questions[qCounter].tourNumber;

  const calcTourResult = (tour: number, res: ResultType) => {
    const tourResArrBoolean = res[tour];
    let count = 0;
    tourResArrBoolean.forEach((v) => {
      if (v.ans) count++;
    });
    return [count, res[tour].length];
  };

  const [TourCount, TourLength] = calcTourResult(tour, result);

  return (
    <div className='resblock'>
      <p>
        {`Результат ${tour}-го тура:`}
        <span>{`${TourCount} из ${TourLength}`}</span>{' '}
      </p>
      {tour === t.tours && (
        <p>
          {`Результат общий:`}
          <span>{`${answeredCount} из ${t.questionsQuantity}`}</span>{' '}
        </p>
      )}
    </div>
  );
}

export default ResBlock;
