import type { TournamentType } from "Shared/Schemas/TournamentSchema";
import type { MouseEvent } from "react";

const getToursAnchors = (tournament: TournamentType) => {
	const { toursAnchors } = tournament.questions.reduce<{ tours: number[]; toursAnchors: number[] }>(
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
	);

	return toursAnchors;
};

export const getToursParagraphs = (tours: number) => {
	const arr = [];

	for (let i = 1; i <= tours; i++) {
		arr.push(<p key={i} id={String(i)}>{`Тур ${i}`}</p>);
	}

	return arr;
};

export const scrollTournament = (
	e: MouseEvent<HTMLDivElement>,
	nodeList: HTMLDivElement | null,
	tournament: TournamentType,
) => {
	const arrAnchors = getToursAnchors(tournament);

	let id: number;
	if (e.target instanceof HTMLElement && e.target.id) {
		id = Number(e.target.id);
	} else {
		return;
	}

	const anchor = arrAnchors[id - 1];

	if (nodeList) {
		nodeList.children[anchor + 2].scrollIntoView({ behavior: "smooth" });
	}
};
