import { Add } from "Shared/Components/Question/Components/Add";
import { Answer } from "Shared/Components/Question/Components/Answer";
import { Button } from "Shared/Components/UI/Button/Button";
import { useAppDispatch, useAppSelector } from "Shared/Hooks/redux";
import type { TournamentType } from "Shared/Schemas/TournamentSchema";
import { currentQuestionIndexPM, withTimerPM } from "Store/Selectors/PlayModeSelectors";
import { playModeActions } from "Store/Slices/PlayModeSlice";
import { useEffect, useMemo, useState } from "react";
import styles from "../../../playmode.module.css";
import { ButtonsBlock } from "./ButtonsBlock";
import { Timer } from "./Timer";

export function PMQuestion({ tournament }: { tournament: TournamentType }) {
	const dispatch = useAppDispatch();

	//оставляем только игровые вопросы
	const questions = useMemo(() => {
		return tournament.questions.filter((v) => v.type !== "outside");
	}, [tournament.questions]);

	const currentQuestionIndex = useAppSelector(currentQuestionIndexPM);
	const withTimer = useAppSelector(withTimerPM);

	const [showAnswer, setShowAnswer] = useState(false);

	const currentQuestion = questions[currentQuestionIndex];
	const nextQTourNumber = questions[currentQuestionIndex + 1]?.tourNumber;

	useEffect(() => {
		dispatch(playModeActions.setCurrentTourNumber(currentQuestion.tourNumber));
	}, [currentQuestion.tourNumber, dispatch]);

	return (
		<div className={styles.question}>
			{!showAnswer && (
				<div className={styles.timerContainer}>
					{withTimer && <Timer setShowAnswer={setShowAnswer} />}
					{<Button onClick={() => setShowAnswer(true)} title="Готов ответ?" />}
				</div>
			)}

			{showAnswer && (
				<ButtonsBlock
					currentQuestion={currentQuestion}
					nextQTourNumber={nextQTourNumber}
					setShowAnswer={setShowAnswer}
				/>
			)}

			{currentQuestion.add && <Add add={currentQuestion.add} />}

			<p className="pmq-text">{currentQuestion.text}</p>

			{showAnswer && <Answer q={currentQuestion} />}
		</div>
	);
}
