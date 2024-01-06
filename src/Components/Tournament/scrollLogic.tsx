import { TournamentType } from '../../Types/tournament';
import { MouseEvent } from 'react';

export const getTourAnchors = (t: TournamentType) => {
  const tours: number[] = [];
  const questionIndex: number[] = [];

  t.questions.forEach((v, i) => {
    if (v.qNumber < 1) return;

    if (!tours.includes(v.tourNumber)) {
      tours.push(v.tourNumber);
      questionIndex.push(i);
    }
  });

  return questionIndex;
};

export const getToursParagraphs = (tours: number) => {
  const arr = [];

  for (let i = 1; i <= tours; i++) {
    arr.push(<p key={i} id={String(i)}>{`Тур ${i}`}</p>);
  }

  return arr;
};

export const scroll = (e: MouseEvent<HTMLDivElement>, nodeList: HTMLDivElement | null, arrAnchors: number[]) => {
  let id: number;
  if (e.target instanceof HTMLElement && e.target.id) {
    id = Number(e.target.id);
  } else {
    return;
  }

  const anchor = arrAnchors[id - 1];
  if (nodeList instanceof HTMLDivElement) {
    const node = nodeList.querySelector('.tournament__content_qs');
    if (node) node.children[anchor].scrollIntoView({ behavior: 'smooth' });
  }
};
