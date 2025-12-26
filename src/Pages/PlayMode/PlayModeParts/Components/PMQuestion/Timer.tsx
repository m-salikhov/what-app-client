import { useAppSelector } from "Shared/Hooks/redux";
import { timerOptions } from "Store/Selectors/PlayModeSelectors";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import styles from "../../../playmode.module.css";

interface Props {
	setShowAnswer: Dispatch<SetStateAction<boolean>>;
}

export function Timer({ setShowAnswer }: Props) {
	const { questionTimer, answerTimer } = useAppSelector(timerOptions);
	const [time, setTime] = useState(questionTimer);

	//Флаг, что время на чтение вопроса окончено
	const [flag, setFlag] = useState(false);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setTime((prev) => prev - 1);
		}, 1000);

		if (time === 0 && !flag) {
			setTime(answerTimer);
			setFlag(true);
		}

		if (time === 0 && flag) {
			clearTimeout(timeout);
			setShowAnswer(true);
		}

		return () => clearTimeout(timeout);
	}, [time, flag, setShowAnswer, answerTimer]);

	return (
		<div className={styles.timer}>
			<p className={styles.timerText}>{flag ? "Время найти ответ" : "Время прочитать вопрос"}</p>
			<h2>{time}</h2>
		</div>
	);
}
