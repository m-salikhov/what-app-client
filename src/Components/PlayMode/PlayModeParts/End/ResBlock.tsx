import { useAppSelector } from '../../../../Hooks/redux';
import { ResultType } from '../../../../Store/reducers/PlayModeSlice';
import { StepPM, StepProps } from '../Types/playmodeTypes';

const calcTourResult = (tour: number, res: ResultType) => {
  const tourResArrBoolean = res[tour];

  let count = 0;
  tourResArrBoolean.forEach((v) => {
    if (v.ans) count++;
  });

  return [count, res[tour].length];
};

function ResBlock({ tournament }: StepProps) {
  const {
    currentQuestionIndex,
    result,
    step,
    totalAnsweredCount,
    totalQuestionsCount,
  } = useAppSelector((state) => state.playModeReducer);

  const tour = tournament.questions[currentQuestionIndex].tourNumber;

  const [TourCount, TourLength] = calcTourResult(tour, result);

  return (
    <div className='resblock'>
      <p>
        {`Результат ${tour}-го тура:`}
        <span>{`${TourCount} из ${TourLength}`}</span>{' '}
      </p>
      {step === StepPM.END && (
        <p>
          {`Результат общий:`}
          <span>{`${totalAnsweredCount} из ${totalQuestionsCount}`}</span>{' '}
        </p>
      )}
    </div>
  );
}

export default ResBlock;
