import "./wordle.css";
import { useAppSelector } from "Shared/Hooks/redux";
import { lettersSelector, isGameOverSelector } from "Store/Selectors/WordleSelectors";
import { ToastContainer, toast } from "react-toastify";
import { Board } from "./Components/Board";
import { GameEndModal } from "./Components/GameEndModal";
import { useLettersClassName } from "./helpers/useLetterClassName";
import { useWordleInput } from "./helpers/useWordleInput";
import { useEffect } from "react";

const isValidInput = (key: string): boolean => {
	const allowedKeys = ["Enter", "Delete", "Escape", "Backspace", "Alt", "Control", "Shift"];

	if (/^[а-яА-Я]$/.test(key) || allowedKeys.includes(key)) {
		return true;
	} else return false;
};

const showToast = () => {
	toast.error(
		<p>Введите букву русского алфавита (ё = е)</p>,

		{
			hideProgressBar: true,
			autoClose: 2000,
			pauseOnHover: true,
			toastId: 1,
		},
	);
};

export default function Wordle() {
	const { handleInput } = useWordleInput();
	const isGameOver = useAppSelector(isGameOverSelector);
	const letters = useAppSelector(lettersSelector);
	const classNames = useLettersClassName();

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (isGameOver) return;

			if (!isValidInput(e.key)) {
				showToast();
				return;
			}

			handleInput(e.key);
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [isGameOver, handleInput]);

	return (
		<div className="wordle">
			<div className="wordle-container">
				{Array.from({ length: 30 }).map((_, i) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: <неизменяемая сетка>
					<div key={i} className={classNames[i]}>
						{letters[i] ?? null}
					</div>
				))}
			</div>
			<Board />
			<GameEndModal />
			<ToastContainer />
		</div>
	);
}
