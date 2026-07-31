import type { TournamentType } from "Shared/Schemas/TournamentSchema";
import { useMemo, useCallback, type MouseEvent, type RefObject } from "react";

export const useTournamentScroll = (
	questions: TournamentType["questions"],
	questionsNodeListRef: RefObject<HTMLDivElement | null>,
) => {
	const { tours, toursIndexes } = useMemo(() => {
		const tours: number[] = [];
		const toursIndexes: number[] = [];

		for (let i = 0; i < questions.length; i++) {
			const q = questions[i];

			if (q.tourNumber !== 0 && !tours.includes(q.tourNumber)) {
				tours.push(q.tourNumber);
				toursIndexes.push(i);
			}
		}

		return { tours, toursIndexes };
	}, [questions]);

	const scrollToTour = useCallback(
		(e: MouseEvent<HTMLButtonElement>) => {
			const id = Number(e.currentTarget.id);
			const anchor = toursIndexes[id];
			const node = questionsNodeListRef.current;

			if (!node) return;

			node.children[anchor].scrollIntoView({ behavior: "smooth" });
		},
		[questionsNodeListRef, toursIndexes],
	);

	return { tours, scrollToTour, toursIndexes };
};
