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
  const arr = [];

  for (let i = tours; i > 0; i--) {
    arr.unshift(<p key={i} id={i.toString()}>{`Тур ${i}`}</p>);
  }

  return arr;
};

export const scroll = (
  e: MouseEvent<HTMLDivElement>,
  node: HTMLDivElement | null,
  arrAnchors: number[]
) => {
  let id: number;
  if (e.target instanceof HTMLElement && e.target.id) {
    id = +e.target.id;
  } else {
    return;
  }

  const anchor = arrAnchors[id - 1];
  if (node instanceof HTMLDivElement) {
    node.children[anchor].scrollIntoView({ behavior: "smooth" });
  }
};
