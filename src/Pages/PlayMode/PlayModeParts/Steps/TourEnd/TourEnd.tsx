import { QuestionPlane } from 'Shared/Components/Question/QuestionPlane';
import { useAppDispatch, useAppSelector } from 'Shared/Hooks/redux';
import { playModeActions } from 'Store/Slices/PlayModeSlice';
import { ResBlock } from '../Components/ResultBlock/ResBlock';
import { Button } from 'Shared/Components/Button/Button';
import { selectedResultQuestionNumberPM } from 'Store/Selectors/PlayModeSelectors';
import { TournamentType } from 'Shared/Schemas/TournamentSchema';

export function TourEnd({ tournament }: { tournament: TournamentType }) {
  const dispatch = useAppDispatch();

  const questionNumber = useAppSelector(selectedResultQuestionNumberPM);

  const selectedQuestion = tournament.questions.find((q) => q.qNumber === questionNumber);

  const onClick = () => {
    dispatch(playModeActions.currentQuestionIndexIncrement());
    dispatch(playModeActions.setStep('QUESTION'));
    dispatch(playModeActions.setSelectedResultQuestionNumber(-100));
  };

  return (
    <div className='tour-end'>
      <ResBlock />

      <Button title='Следующий тур' onClick={onClick} />

      {selectedQuestion && <QuestionPlane q={selectedQuestion} />}
    </div>
  );
}
