import { useAppSelector } from "Shared/Hooks/redux";
import { letterStateSelector } from "Store/Selectors/WordleSelectors";
import { useWordleInput } from "../helpers/useWordleInput";
import type { LetterState } from "Store/Slices/WordleSlice";

const keyboard = {
	1: ["й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ"],
	2: ["ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э"],
	3: ["del", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", "⏎"],
};

type KeyboardRowIndex = keyof typeof keyboard;

function getKeyboard(letterState: LetterState[], handleInput: (letter: string) => void) {
	const arr = [];

	for (let i = 1; i < 4; i++) {
		arr.push(
			<div key={i} className="board-row">
				{keyboard[i as KeyboardRowIndex].map((letter) => {
					const letterClassNames = new Set<string>();
					for (const { value, className } of letterState) {
						if (value === letter) letterClassNames.add(className);
					}

					let priorityLetterClassName: string | undefined;
					if (letterClassNames.size > 0) {
						priorityLetterClassName = letterClassNames.has("in-place")
							? "in-place"
							: letterClassNames.has("out-of-place")
								? "out-of-place"
								: "miss";
					}

					return (
						<button
							type="button"
							onClick={() => handleInput(letter)}
							className={priorityLetterClassName}
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
	const letterState = useAppSelector(letterStateSelector);
	const { handleInput } = useWordleInput();

	return <div className="board-container">{getKeyboard(letterState, handleInput)}</div>;
}
