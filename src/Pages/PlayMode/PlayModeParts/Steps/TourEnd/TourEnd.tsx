import QuestionPlane from 'Shared/Components/Question/QuestionPlane';
import { useAppDispatch, useAppSelector } from 'Shared/Hooks/redux';
import { playModeActions } from 'Store/Slices/PlayModeSlice';
import ResBlock from '../Components/ResultBlock/ResBlock';
import { TournamentType } from 'Shared/Types/tournament';
import Button from 'Shared/Components/Button/Button';
import { selectedResultQuestionPM } from 'Store/Selectors/PlayModeSelectors';

function TourEnd({ tournament }: { tournament: TournamentType }) {
  const dispatch = useAppDispatch();

  const selectedResultQuestion = useAppSelector(selectedResultQuestionPM);

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
