import { useAppSelector } from "Shared/Hooks/redux";
import { letterStateSelector } from "Store/Selectors/WordleSelectors";
import { useWordleInput } from "../helpers/useWordleInput";

const keyboard = {
	1: ["й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ"],
	2: ["ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э"],
	3: ["del", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", "⏎"],
};

type KeyboardRowIndex = keyof typeof keyboard;

function getKeyboard() {
	const arr = [];

	const letterState = useAppSelector(letterStateSelector);

	const { handleInput } = useWordleInput();

	for (let i = 1; i < 4; i++) {
		arr.push(
			<div key={i} className="board-row">
				{keyboard[i as KeyboardRowIndex].map((letter) => {
					const states = letterState.filter((v) => v.value === letter).map((v) => v.className);
					let state: string | undefined;
					if (states.length > 0) {
						state = states.includes("in-place")
							? "in-place"
							: states.includes("out-of-place")
								? "out-of-place"
								: "miss";
					}

					return (
						<button
							type="button"
							onClick={() => handleInput(letter)}
							className={state}
							key={letter}
						>
							{letter}
						</button>
					);
				})}
			</div>,
		);
	}

	return arr;
}

export function Board() {
	return <div className="board-container">{getKeyboard()}</div>;
}
