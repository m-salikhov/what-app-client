import type { TournamentType } from "Shared/Schemas/TournamentSchema";
import { useMemo, type MouseEvent } from "react";

export const useTournamentScroll = (tournament: TournamentType) => {
	const toursAnchors = useMemo(() => {
		return tournament.questions.reduce<{ tours: number[]; toursAnchors: number[] }>(
			(acc, question, index) => {
				if (question.qNumber < 1) {
					return acc;
				}

				if (!acc.tours.includes(question.tourNumber)) {
					acc.tours.push(question.tourNumber);
					acc.toursAnchors.push(index);
				}

				return acc;
			},
			{ tours: [], toursAnchors: [] },
		).toursAnchors;
	}, [tournament.questions]);

	const toursParagraphs = useMemo(() => {
		const arr = [];
		const tours =
			tournament.questions.length > 0
				? Math.max(...tournament.questions.map((q) => q.tourNumber))
				: 0;

		for (let i = 1; i <= tours; i++) {
			arr.push(<p key={i} id={String(i)}>{`Тур ${i}`}</p>);
		}

		return arr;
	}, [tournament.questions]);

	const scrollTournament = (e: MouseEvent<HTMLButtonElement>, nodeList: HTMLDivElement | null) => {
		let id: number;
		if (e.target instanceof HTMLElement && e.target.id) {
			id = Number(e.target.id);
		} else {
			return;
		}

		const anchor = toursAnchors[id - 1];

		if (nodeList?.children[anchor + 2]) {
			nodeList.children[anchor + 2].scrollIntoView({ behavior: "smooth" });
		}
	};

	return {
		toursParagraphs,
		scrollTournament,
	};
};
