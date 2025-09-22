import { useAppDispatch, useAppSelector } from "Shared/Hooks/redux";
import { timerOptions } from "Store/Selectors/PlayModeSelectors";
import { playModeActions } from "Store/Slices/PlayModeSlice";
import { Button, Checkbox, Group, Input, NumberField } from "react-aria-components";
import green_mark from "./green_mark.svg";

export function TimerOptions() {
	const { withTimer, answerTimer, questionTimer } = useAppSelector(timerOptions);

	const dispatch = useAppDispatch();

	return (
		<div className="pm-timer-options">
			<Checkbox isSelected={withTimer} onChange={() => dispatch(playModeActions.setWithTimer())}>
				<div className="pm-info-checkbox-icon">
					<div className="pm-info-checkbox-icon-circle">
						{withTimer && <img src={green_mark} alt="таймер включен\выключен" />}
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
				aria-label="Question timer"
			>
				<Group>
					<Button slot="decrement">-</Button>
					<Input placeholder="15" maxLength={2} />
					<Button slot="increment">+</Button>
				</Group>
				<p>время на чтение вопроса</p>
			</NumberField>

			<NumberField
				defaultValue={answerTimer}
				onChange={(e) => dispatch(playModeActions.setAnswerTimer(e))}
				minValue={1}
				maxValue={99}
				isDisabled={!withTimer}
				aria-label="Answer timer"
			>
				<Group>
					<Button slot="decrement">-</Button>
					<Input placeholder="30" maxLength={2} />
					<Button slot="increment">+</Button>
				</Group>
				<p>время на поиск ответа</p>
			</NumberField>
		</div>
	);
}
