import { Button } from "Shared/Components/UI/Button/Button";
import { useAppDispatch } from "Shared/Hooks/redux";
import { playModeActions } from "Store/Slices/PlayModeSlice";
import type { MouseEvent } from "react";
import styles from "../../../playmode.module.css";

interface Props {
	setShowAnswer: (showAnswer: boolean) => void;
}

export function ResultButtons({ setShowAnswer }: Props) {
	const dispatch = useAppDispatch();

	const onClick = (e: MouseEvent<HTMLButtonElement>) => {
		dispatch(playModeActions.setResult(e.currentTarget.id === "yes"));

		dispatch(playModeActions.setStep());

		setShowAnswer(false);
	};

	return (
		<div className={styles.buttonsBlock}>
			{
				<div className={styles.buttonBlockText}>
					<p>Вы правильно ответили?</p>
					<Button id="yes" onClick={onClick}>
						{" "}
						Да{" "}
					</Button>
					<Button id="no" onClick={onClick}>
						{" "}
						Нет{" "}
					</Button>
				</div>
			}
		</div>
	);
}
