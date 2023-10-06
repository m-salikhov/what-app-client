import { TournamentType } from "../../Types/tournament";
import { MouseEvent } from "react";

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
  const a = [];

  for (let i = tours; i > 0; i--) {
    a.unshift(<p key={i} id={i.toString()}>{`Тур ${i}`}</p>);
  }

  return a;
};

export const scroll = (
  e: MouseEvent<HTMLElement>,
  node: HTMLDivElement | null,
  arrAnchors: number[]
) => {
  let id: number;
  if (e.target instanceof Element && e.target.id) {
    id = +e.target.id;
  } else {
    return;
  }

  const anchor = arrAnchors[id - 1];
  if (node instanceof HTMLDivElement) {
    node.children[anchor].scrollIntoView({ behavior: "smooth" });
  }
};
