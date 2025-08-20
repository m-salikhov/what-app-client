import { useAppDispatch } from 'Shared/Hooks/redux';
import { playModeActions } from 'Store/Slices/PlayModeSlice';
import { ResBlock } from '../Components/ResultBlock/ResBlock';
import { Button } from 'Shared/Components/UI/Button/Button';
import { TournamentType } from 'Shared/Schemas/TournamentSchema';

export function TourEnd({ tournament }: { tournament: TournamentType }) {
  const dispatch = useAppDispatch();

  const onClick = () => {
    dispatch(playModeActions.currentQuestionIndexIncrement());
    dispatch(playModeActions.setStep('QUESTION'));
  };

  return (
    <div className='tour-end'>
      <ResBlock tournamentId={tournament.id} />

      <Button title='Следующий тур' onClick={onClick} />
    </div>
  );
}
