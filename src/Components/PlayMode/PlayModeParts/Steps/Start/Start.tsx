import { getDate } from '../../../../../Helpers/getDate';
import { useAppDispatch, useAppSelector } from '../../../../../Hooks/redux';
import { playModeActions } from '../../../../../Store/Slices/PlayModeSlice';
import { StepProps, StepPM } from '../../Types/playmodeTypes';
import { Button, Checkbox, Group, Input, NumberField } from 'react-aria-components';
import green_mark from '../../PMIcons/green_mark.svg';

function Start({ tournament }: StepProps) {
  const dispatch = useAppDispatch();

  const { withTimer, answerTimer, questionTimer } = useAppSelector((state) => state.playModeReducer);

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
        <Checkbox isSelected={withTimer} onChange={() => dispatch(playModeActions.setWithTimer())}>
          <div className='pm-info-checkbox-icon'>
            <div className='pm-info-checkbox-icon-circle'>
              {withTimer && <img src={green_mark} alt='todo completed icon' />}
            </div>
          </div>
          <p>играть с таймером </p>
        </Checkbox>

        <NumberField
          defaultValue={questionTimer}
          onChange={(e) => dispatch(playModeActions.setQuestionTimer(e))}
          minValue={1}
          maxValue={99}
          isDisabled={!withTimer}
        >
          <Group>
            <Button slot='decrement'>-</Button>
            <Input placeholder='15' maxLength={2} />
            <Button slot='increment'>+</Button>
          </Group>
          <p>время на чтение вопроса</p>
        </NumberField>

        <NumberField
          defaultValue={answerTimer}
          onChange={(e) => dispatch(playModeActions.setAnswerTimer(e))}
          minValue={1}
          maxValue={99}
          isDisabled={!withTimer}
        >
          <Group>
            <Button slot='decrement'>-</Button>
            <Input placeholder='30' maxLength={2} />
            <Button slot='increment'>+</Button>
          </Group>
          <p>время на поиск ответа</p>
        </NumberField>
      </div>

      <div>
        <button type='button' onClick={() => dispatch(playModeActions.setStep(StepPM.QUESTION))}>
          Начать игру
        </button>
      </div>
    </div>
  );
}

export default Start;
