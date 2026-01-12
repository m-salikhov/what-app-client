import { Button } from "Shared/Components/UI/Button/Button";
import { useAppDispatch } from "Shared/Hooks/redux";
import type { QuestionType } from "Shared/Schemas/TournamentSchema";
import { playModeActions } from "Store/Slices/PlayModeSlice";
import { useState } from "react";
import styles from "../../../playmode.module.css";

interface Props {
	currentQuestion: QuestionType;
	setShowAnswer: (showAnswer: boolean) => void;
}

export function ButtonsBlock({ currentQuestion, setShowAnswer }: Props) {
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

		dispatch(playModeActions.setStep());

		setShowAnswer(false);
	};

	return (
		<div className={styles.buttonsBlock}>
			{answer ?? (
				<div className={styles.buttonBlockText}>
					<p>Вы правильно ответили?</p>
					<Button onClick={() => setAnswer(true)}> Да </Button>
					<Button onClick={() => setAnswer(false)}> Нет </Button>
				</div>
			)}

			{answer !== undefined && <Button onClick={onClick}> Следующий вопрос </Button>}
		</div>
	);
}
