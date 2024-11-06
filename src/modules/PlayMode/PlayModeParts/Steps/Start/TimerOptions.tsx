import { Checkbox, NumberField, Group, Button, Input } from 'react-aria-components';
import green_mark from '../../PMIcons/green_mark.svg';
import { useAppSelector, useAppDispatch } from 'Common/Hooks/redux';
import { playModeActions } from 'Store/Slices/PlayModeSlice';

export default function TimerOptions() {
  const { withTimer, answerTimer, questionTimer } = useAppSelector((state) => state.playModeReducer);

  const dispatch = useAppDispatch();

  return (
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
  );
}
