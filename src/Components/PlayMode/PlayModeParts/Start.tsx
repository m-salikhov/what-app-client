import { getDate } from '../../../Helpers/getDate';
import { playModeActions } from '../../../Store/reducers/PlayModeSlice';
import { useAppDispatch, useAppSelector } from '../../../Hooks/redux';

function Start() {
  const dispatch = useAppDispatch();

  const { t } = useAppSelector((state) => state.playModeReducer);

  return (
    <div className='pm-info'>
      <div>
        <p>Вопросов: {t.questionsQuantity}</p>
        <p>Туров: {t.tours}</p>
        <p>Дата: {getDate(t.date)}</p>
      </div>
      <div>
        <p>Редактор(ы):</p>
        <p>{t.editors.join(', ')}</p>
      </div>
      <div>
        <button onClick={() => dispatch(playModeActions.setStep('QUESTION'))}>Начать игру</button>
      </div>
    </div>
  );
}

export default Start;
