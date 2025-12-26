import { useAppDispatch, useAppSelector } from "Shared/Hooks/redux";
import { timerOptions } from "Store/Selectors/PlayModeSelectors";
import { playModeActions } from "Store/Slices/PlayModeSlice";
import { Button, Checkbox, Group, Input, NumberField } from "react-aria-components";
import green_mark from "./green_mark.svg";
import styles from "../../playmode.module.css";

export function TimerOptions() {
	const { withTimer, answerTimer, questionTimer } = useAppSelector(timerOptions);

	const dispatch = useAppDispatch();

	return (
		<div className={styles.timerOptions}>
			<Checkbox
				className={styles.checkbox}
				isSelected={withTimer}
				onChange={() => dispatch(playModeActions.setWithTimer())}
			>
				<div className={styles.checkboxIcon}>
					<div className={styles.checkboxIconCircle}>
						{withTimer && <img src={green_mark} alt="таймер включен\выключен" />}
					</div>
				</div>
				<p className={styles.checkboxText}>играть с таймером </p>
			</Checkbox>

			<NumberField
				defaultValue={questionTimer}
				onChange={(e) => dispatch(playModeActions.setQuestionTimer(e))}
				minValue={1}
				maxValue={99}
				isDisabled={!withTimer}
				aria-label="Question timer"
				className={styles.numberField}
			>
				<Group className={styles.group}>
					<Button slot="decrement" className={styles.groupButton}>
						-
					</Button>
					<Input placeholder="15" maxLength={2} className={styles.groupInput} />
					<Button slot="increment" className={styles.groupButton}>
						+
					</Button>
				</Group>
				<p className={styles.numberFieldText}>время на чтение вопроса</p>
			</NumberField>

			<NumberField
				defaultValue={answerTimer}
				onChange={(e) => dispatch(playModeActions.setAnswerTimer(e))}
				minValue={1}
				maxValue={99}
				isDisabled={!withTimer}
				aria-label="Answer timer"
				className={styles.numberField}
			>
				<Group className={styles.group}>
					<Button slot="decrement" className={styles.groupButton}>
						-
					</Button>
					<Input placeholder="30" maxLength={2} className={styles.groupInput} />
					<Button slot="increment" className={styles.groupButton}>
						+
					</Button>
				</Group>
				<p className={styles.numberFieldText}>время на поиск ответа</p>
			</NumberField>
		</div>
	);
}
