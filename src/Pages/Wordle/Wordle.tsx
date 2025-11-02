import "./wordle.css";
import { useAppSelector } from "Shared/Hooks/redux";
import { lettersSelector, isGameOverSelector } from "Store/Selectors/WordleSelectors";
import { ToastContainer, toast } from "react-toastify";
import { Board } from "./Components/Board";
import { GameEndModal } from "./Components/GameEndModal";
import { useLetterClassName } from "./helpers/useLetterClassName";
import { useWordleInput } from "./helpers/useWordleInput";
import { useLayoutEffect, useRef } from "react";

const isValidInput = (key: string): boolean => {
	const allowedKeys = ["Enter", "Delete", "Escape", "Backspace", "Alt", "Control", "Shift"];

	if (/^[а-яА-Я]$/.test(key)) {
		return true;
	}

	if (allowedKeys.includes(key)) {
		return true;
	}

	return false;
};

const showToast = () => {
	toast.error(
		<p>Введите букву на русской раскладке (ё = е)</p>,

		{
			hideProgressBar: true,
			autoClose: 2000,
			pauseOnHover: true,
		},
	);
};

const getWordleContainer = () => {
	const arr = [];

	const letters = useAppSelector(lettersSelector);
	const classNames = Array.from({ length: 30 }, (_, i) => useLetterClassName(i));

	for (let i = 0; i < 30; i++) {
		arr.push(
			<div key={i} className={classNames[i]}>
				{letters[i] || null}
			</div>,
		);
	}

	return arr;
};

export default function Wordle() {
	const { handleInput } = useWordleInput();
	const isGameOver = useAppSelector(isGameOverSelector);

	const ref = useRef<HTMLDivElement>(null);

	const wordleContainer = getWordleContainer();

	useLayoutEffect(() => {
		if (ref.current && !isGameOver) {
			ref.current.focus();
		}
	}, [isGameOver]);

	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: toast
		<div
			className="wordle"
			// biome-ignore lint/a11y/noNoninteractiveTabindex: toast
			tabIndex={0}
			ref={ref}
			onKeyDown={(e) => {
				if (!isValidInput(e.key)) {
					showToast();
					return;
				}

				handleInput(e.key);
			}}
		>
			<div className="wordle-container">{wordleContainer}</div>
			<Board />
			<GameEndModal />
			<ToastContainer />
		</div>
	);
}
