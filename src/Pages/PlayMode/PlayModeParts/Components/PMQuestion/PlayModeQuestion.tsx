import { Add } from "Shared/Components/Question/Components/Add";
import { Answer } from "Shared/Components/Question/Components/Answer";
import { Button } from "Shared/Components/UI/Button/Button";
import { useAppSelector } from "Shared/Hooks/redux";
import { currentQuestionSelector, withTimerSelector } from "Store/Selectors/PlayModeSelectors";
import { useState } from "react";
import styles from "../../../playmode.module.css";
import { ResultButtons } from "./ResultButtons";
import { Timer } from "./Timer";

export function PlayModeQuestion() {
	const currentQuestion = useAppSelector(currentQuestionSelector);
	const withTimer = useAppSelector(withTimerSelector);

	const [showAnswer, setShowAnswer] = useState(false);

	return (
		<div className={styles.question}>
			{!showAnswer && (
				<div className={styles.timerContainer}>
					{withTimer && <Timer setShowAnswer={setShowAnswer} />}
					<Button extraClass={styles.timerButton} onClick={() => setShowAnswer(true)}>
						Готов ответ
					</Button>
				</div>
			)}

			{showAnswer && <ResultButtons setShowAnswer={setShowAnswer} />}

			{currentQuestion.add && (
				<Add add={currentQuestion.add} addMetadata={currentQuestion.addMetadata} />
			)}

			<p>{currentQuestion.text}</p>

			{showAnswer && <Answer q={currentQuestion} />}
		</div>
	);
}
