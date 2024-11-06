import QuestionPlane from 'Common/Components/Question/QuestionPlane';
import { useAppDispatch, useAppSelector } from 'Common/Hooks/redux';
import { playModeActions } from 'Store/Slices/PlayModeSlice';
import ResBlock from '../Components/ResultBlock/ResBlock';
import { TournamentType } from 'Common/Types/tournament';
import Button from 'Common/Components/Button/Button';

function TourEnd({ tournament }: { tournament: TournamentType }) {
  const dispatch = useAppDispatch();

  const { selectedResultQuestion } = useAppSelector((state) => state.playModeReducer);

  const onClick = () => {
    dispatch(playModeActions.currentQuestionIndexIncrement());
    dispatch(playModeActions.setStep('QUESTION'));
    dispatch(playModeActions.setSelectedResultQuestion(0));
  };

  return (
    <div className='tour-end'>
      <ResBlock />

      <Button title='Следующий тур' onClick={onClick} />

      {Boolean(selectedResultQuestion) && <QuestionPlane q={tournament.questions[selectedResultQuestion - 1]} />}
    </div>
  );
}

export default TourEnd;
