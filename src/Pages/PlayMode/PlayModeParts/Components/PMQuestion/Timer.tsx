import { useAppSelector } from "Shared/Hooks/redux";
import { timerOptions } from "Store/Selectors/PlayModeSelectors";
import { type Dispatch, type SetStateAction, useEffect, useRef, useState } from "react";
import styles from "../../../playmode.module.css";

interface Props {
	setShowAnswer: Dispatch<SetStateAction<boolean>>;
}

export function Timer({ setShowAnswer }: Props) {
	const { questionTimer, answerTimer } = useAppSelector(timerOptions);
	const [time, setTime] = useState(questionTimer);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);
	const isQuestionPhase = useRef(true);

	useEffect(() => {
		intervalRef.current = setInterval(() => {
			setTime((prev) => {
				if (prev <= 1) {
					if (isQuestionPhase.current) {
						// Переход к фазе ответа
						isQuestionPhase.current = false;
						return answerTimer;
					} else {
						// Время ответа закончилось
						setShowAnswer(true);
						return 0;
					}
				}
				return prev - 1;
			});
		}, 1000);

		// Очистка при размонтировании
		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, [setShowAnswer, answerTimer]);

	return (
		<div className={styles.timer}>
			<p className={styles.timerText}>
				{isQuestionPhase.current ? "Время прочитать вопрос" : "Время найти ответ"}
			</p>
			<p className={styles.timerCount}>{time}</p>
		</div>
	);
}
