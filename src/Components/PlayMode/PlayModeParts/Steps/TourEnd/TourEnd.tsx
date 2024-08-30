import Button from '../../../../Elements/Button/Button';
import QuestionPlane from '../../../../Elements/Question/QuestionPlane';
import ResBlock from '../Components/ResBlock';
import { playModeActions } from '../../../../../Store/reducers/PlayModeSlice';
import { useAppDispatch, useAppSelector } from '../../../../../Hooks/redux';
import { StepPM, StepProps } from '../../Types/playmodeTypes';

function TourEnd({ tournament }: StepProps) {
  const dispatch = useAppDispatch();

  const { selectedResultQuestion } = useAppSelector(
    (state) => state.playModeReducer
  );

  const onClick = () => {
    dispatch(playModeActions.currentQuestionIndexIncrement());
    dispatch(playModeActions.setStep(StepPM.QUESTION));
  };

  return (
    <div className='tour-end'>
      <ResBlock />

      <Button title='Следующий тур' onClick={onClick} />

      {Boolean(selectedResultQuestion) && (
        <QuestionPlane q={tournament.questions[selectedResultQuestion - 1]} />
      )}
    </div>
  );
}

export default TourEnd;