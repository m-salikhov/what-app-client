import { MouseEvent } from 'react';
import { TournamentType } from 'Shared/Schemas/TournamentSchema';

const getToursAnchors = (tournament: TournamentType) => {
  const { toursAnchors } = tournament.questions.reduce(
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
    { tours: [], toursAnchors: [] } as { tours: number[]; toursAnchors: number[] }
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

export const scroll = (e: MouseEvent<HTMLDivElement>, nodeList: HTMLDivElement | null, tournament: TournamentType) => {
  const arrAnchors = getToursAnchors(tournament);

  let id: number;
  if (e.target instanceof HTMLElement && e.target.id) {
    id = Number(e.target.id);
  } else {
    return;
  }

  const anchor = arrAnchors[id - 1];

  if (nodeList instanceof HTMLDivElement) {
    const node = nodeList.querySelector('.tournament-content-qs');
    if (node) node.children[anchor].scrollIntoView({ behavior: 'smooth' });
  }
};
