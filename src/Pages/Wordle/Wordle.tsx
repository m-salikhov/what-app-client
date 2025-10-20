import "./wordle.css";
import { useAppSelector } from "Shared/Hooks/redux";
import { lettersSelector, resultSelector } from "Store/Selectors/WordleSelectors";
import { ToastContainer, toast } from "react-toastify";
import { Board } from "./Components/Board";
import { GameEndModal } from "./Components/GameEndModal";
import { useLetterClassName } from "./helpers/useLetterClassName";
import { useWordleInput } from "./helpers/useWordleInput";

const isEnglishKey = (key: string): boolean => {
	return /^[a-zA-Z0-9!@#$%^&*()_+=\-[\]{}|;':",./<>?~` ]$/.test(key);
};

const showToast = () => {
	toast.error(
		<p>Введите букву на русской раскладке</p>,

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
	const result = useAppSelector(resultSelector);

	const wordleContainer = getWordleContainer();

	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: toast
		<div
			className="wordle"
			// biome-ignore lint/a11y/noNoninteractiveTabindex: toast
			tabIndex={0}
			onKeyDown={(e) => {
				if (isEnglishKey(e.key)) {
					showToast();
					return;
				}

				handleInput(e.key);
			}}
		>
			<div className="wordle-container">{wordleContainer}</div>
			<Board />
			{result && <GameEndModal result={result} />}
			<ToastContainer />
		</div>
	);
}
