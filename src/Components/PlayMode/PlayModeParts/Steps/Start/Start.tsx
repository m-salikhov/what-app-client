import { getDate } from '../../../../../Helpers/getDate';
import { useAppDispatch } from '../../../../../Hooks/redux';
import { playModeActions } from '../../../../../Store/Slices/PlayModeSlice';
import { StepProps, StepPM } from '../../Types/playmodeTypes';

function Start({ tournament }: StepProps) {
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
        <p>{tournament.editors.join(', ')}</p>
      </div>
      <div>
        <button
          onClick={() => dispatch(playModeActions.setStep(StepPM.QUESTION))}
        >
          Начать игру
        </button>
      </div>
    </div>
  );
}

export default Start;
