import { useAppSelector } from '../../../../Hooks/redux';
import { ResultType } from '../../../../Store/reducers/PlayModeSlice';
import { StepProps } from '../Types/playmodeTypes';

function ResBlock({ tournament }: StepProps) {
  const { currentQuestionIndex, result, answeredCount } = useAppSelector((state) => state.playModeReducer);
  const tour = tournament.questions[currentQuestionIndex].tourNumber;

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
      {tour === tournament.tours && (
        <p>
          {`Результат общий:`}
          <span>{`${answeredCount} из ${tournament.questionsQuantity}`}</span>{' '}
        </p>
      )}
    </div>
  );
}

export default ResBlock;
