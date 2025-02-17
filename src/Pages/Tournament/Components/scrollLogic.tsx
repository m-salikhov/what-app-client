import { TournamentType } from 'Shared/Types/tournament';
import { MouseEvent } from 'react';

const getToursAnchors = (tournament: TournamentType) => {
  const tours: number[] = [];
  const toursAnchors: number[] = [];

  tournament.questions.forEach((v, i) => {
    if (v.qNumber < 1) return;

    if (!tours.includes(v.tourNumber)) {
      tours.push(v.tourNumber);
      toursAnchors.push(i);
    }
  });

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
