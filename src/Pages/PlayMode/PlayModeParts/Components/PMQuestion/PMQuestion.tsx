import { Add } from "Shared/Components/Question/Components/Add";
import { Answer } from "Shared/Components/Question/Components/Answer";
import { Button } from "Shared/Components/UI/Button/Button";
import { useAppSelector } from "Shared/Hooks/redux";
import { currentQuestionSelector, withTimerPM } from "Store/Selectors/PlayModeSelectors";
import { useState } from "react";
import styles from "../../../playmode.module.css";
import { ButtonsBlock } from "./ButtonsBlock";
import { Timer } from "./Timer";

export function PMQuestion() {
	const currentQuestion = useAppSelector(currentQuestionSelector);
	const withTimer = useAppSelector(withTimerPM);

	const [showAnswer, setShowAnswer] = useState(false);

	return (
		<div className={styles.question}>
			{!showAnswer && (
				<div className={styles.timerContainer}>
					{withTimer && <Timer setShowAnswer={setShowAnswer} />}
					<Button onClick={() => setShowAnswer(true)}> Готов ответ </Button>
				</div>
			)}

			{showAnswer && (
				<ButtonsBlock currentQuestion={currentQuestion} setShowAnswer={setShowAnswer} />
			)}

			{currentQuestion.add && <Add add={currentQuestion.add} />}

			<p className="pmq-text">{currentQuestion.text}</p>

			{showAnswer && <Answer q={currentQuestion} />}
		</div>
	);
}
