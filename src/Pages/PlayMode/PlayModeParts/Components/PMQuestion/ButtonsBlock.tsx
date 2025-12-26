import { Button } from "Shared/Components/UI/Button/Button";
import { useAppDispatch } from "Shared/Hooks/redux";
import type { QuestionType } from "Shared/Schemas/TournamentSchema";
import { playModeActions } from "Store/Slices/PlayModeSlice";
import { useState } from "react";
import styles from "../../../playmode.module.css";

interface Props {
	currentQuestion: QuestionType;
	nextQTourNumber: number;
	setShowAnswer: (showAnswer: boolean) => void;
}

export function ButtonsBlock({ currentQuestion, nextQTourNumber, setShowAnswer }: Props) {
	const dispatch = useAppDispatch();

	const [answer, setAnswer] = useState<boolean | undefined>(undefined);

	const onClick = () => {
		if (answer !== undefined) {
			dispatch(
				playModeActions.setResult({
					qNumber: currentQuestion.qNumber,
					tourNumber: currentQuestion.tourNumber,
					isAnswered: answer,
				}),
			);
		}

		if (!nextQTourNumber) {
			dispatch(playModeActions.setStep("END"));
		} else if (currentQuestion.tourNumber === nextQTourNumber) {
			dispatch(playModeActions.currentQuestionIndexIncrement());
		} else {
			dispatch(playModeActions.setStep("END_OF_TOUR"));
		}

		setShowAnswer(false);
	};

	return (
		<div className={styles.buttonsBlock}>
			{answer ?? (
				<div className={styles.buttonBlockText}>
					<p>Вы правильно ответили?</p>
					<Button title="Да" onClick={() => setAnswer(true)} />
					<Button title="Нет" onClick={() => setAnswer(false)} />
				</div>
			)}

			{answer !== undefined && <Button title="Следующий вопрос" onClick={onClick} />}
		</div>
	);
}
