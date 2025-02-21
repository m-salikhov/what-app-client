import { getDate } from 'src/Shared/Helpers/getDate';
import { useAppDispatch } from 'src/Shared/Hooks/redux';
import { TournamentType } from 'src/Shared/Types/tournament';
import { playModeActions } from 'Store/Slices/PlayModeSlice';
import { TimerOptions } from './TimerOptions';

export function Start({ tournament }: { tournament: TournamentType }) {
  const dispatch = useAppDispatch();

  return (
    <div className='pm-info'>
      <div>
        <p>Вопросов: {tournament.questionsQuantity}</p>
        <p>Туров: {tournament.tours}</p>
        <p>Дата: {getDate(tournament.date)}</p>
      </div>

      <div>
        <p>Редактор(ы):</p>
        <p>{tournament.editors.map((v) => v.name).join(', ')}</p>
      </div>

      <TimerOptions />

      <div>
        <button type='button' onClick={() => dispatch(playModeActions.setStep('QUESTION'))}>
          Начать игру
        </button>
      </div>
    </div>
  );
}
