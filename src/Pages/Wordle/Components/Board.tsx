import { useAppSelector } from "Shared/Hooks/redux";
import { letterStateSelector } from "Store/Selectors/WordleSelectors";
import { useWordleInput } from "../helpers/useWordleInput";
import type { LetterState } from "Store/Slices/WordleSlice";
import { useMemo } from "react";

const keyboard = [
	["й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ"],
	["ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э"],
	["del", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", "⏎"],
];

export function Board() {
	const letterState = useAppSelector(letterStateSelector);
	const { handleInput } = useWordleInput();

	const states = useMemo(() => {
		const states = new Map<string, LetterState["className"]>();

		for (const state of letterState) {
			if (!states.has(state.value)) {
				states.set(state.value, state.className);
				continue;
			}

			const current = states.get(state.value);
			if (current === "miss" && state.className !== "miss") {
				states.set(state.value, state.className);
				continue;
			}

			if (current === "out-of-place" && state.className === "in-place") {
				states.set(state.value, "in-place");
			}
		}

		return states;
	}, [letterState]);

	return (
		<div className="board-container">
			{keyboard.map((row) => (
				<div key={row[0]} className="board-row">
					{row.map((letter) => (
						<button
							type="button"
							onClick={() => handleInput(letter)}
							className={states.get(letter) ?? ""}
							key={letter}
						>
							{letter}
						</button>
					))}
				</div>
			))}
		</div>
	);
}
