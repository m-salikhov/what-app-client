import type { TournamentType } from "Shared/Schemas/TournamentSchema";
import { useMemo, useCallback, type MouseEvent, type RefObject } from "react";

export const useTournamentScroll = (
	questions: TournamentType["questions"],
	questionsNodeListRef: RefObject<HTMLDivElement | null>,
) => {
	const toursAnchors = useMemo(() => {
		return questions.reduce<{ tours: number[]; toursAnchors: number[] }>(
			(acc, question, index) => {
				if (question.qNumber < 1) return acc;

				if (!acc.tours.includes(question.tourNumber)) {
					acc.tours.push(question.tourNumber);
					acc.toursAnchors.push(index);
				}

				return acc;
			},
			{ tours: [], toursAnchors: [] },
		).toursAnchors;
	}, [questions]);

	const scrollToTour = useCallback(
		(e: MouseEvent<HTMLButtonElement>) => {
			const id = Number(e.currentTarget.id);
			const anchor = toursAnchors[id - 1];
			const node = questionsNodeListRef.current;

			if (!node || anchor === undefined) return;

			node.children[anchor].scrollIntoView({ behavior: "smooth" });
		},
		[toursAnchors, questionsNodeListRef],
	);

	const tourNavigation = useMemo(() => {
		const arr = [];
		const tours = questions.length > 0 ? Math.max(...questions.map((q) => q.tourNumber)) : 0;

		for (let i = 1; i <= tours; i++) {
			arr.push(
				<button type="button" onClick={scrollToTour} key={i} id={String(i)}>
					{`Тур ${i}`}
				</button>,
			);
		}

		return arr;
	}, [questions, scrollToTour]);

	return { tourNavigation };
};
