import { QuestionType } from "../../../Types/question";
import { TournamentType } from "../../../Types/tournament";

export interface Action {
  type: keyof TournamentType | keyof QuestionType | "loaded";
  questionID?: number;
  payload: string | number | TournamentType;
}

type QuestionTypePayload =
  | "regular"
  | "double"
  | "triple"
  | "other"
  | "outside";

export const actionTypes = {
  loaded: "loaded",
  questionType: "type",
  add: "add",
  text: "text",
  answer: "answer",
  alterAnswer: "alterAnswer",
  comment: "comment",
  source: "source",
  author: "author",
  qNumber: "qNumber",
  tourNumber: "tourNumber",
  title: "title",
  editors: "editors",
  date: "date",
} as const;

const reducer = (state: TournamentType, action: Action) => {
  const { type, questionID, payload } = action;

  if (type === actionTypes.loaded) {
    const t = payload as TournamentType;

    const randomKeys: number[] = [];
    while (randomKeys.length < t.questions.length) {
      const key = Math.floor(Math.random() * 1000 + 1);
      if (!randomKeys.includes(key)) randomKeys.push(key);
    }

    t.questions.forEach((q, i) => (q.id = randomKeys[i]));

    return t;
  }

  if (typeof payload === "string" && typeof questionID === "number") {
    const qs = [...state.questions];
    const indexQuestion = qs.findIndex((q) => q.id === questionID);

    switch (type) {
      case actionTypes.questionType:
        qs[indexQuestion].type = payload as QuestionTypePayload;
        return { ...state, questions: qs };
      case actionTypes.add:
        qs[indexQuestion].add = payload;
        return { ...state, questions: qs };
      case actionTypes.text:
        qs[indexQuestion].text = payload;
        return { ...state, questions: qs };
      case actionTypes.answer:
        qs[indexQuestion].answer = payload;
        return { ...state, questions: qs };
      case actionTypes.alterAnswer:
        qs[indexQuestion].alterAnswer = payload;
        return { ...state, questions: qs };
      case actionTypes.comment:
        qs[indexQuestion].comment = payload;
        return { ...state, questions: qs };
      case actionTypes.source:
        const sourceArr = payload.split(";");
        qs[indexQuestion].source = sourceArr;
        return { ...state, questions: qs };
      case actionTypes.author:
        qs[indexQuestion].author = payload;
        return { ...state, questions: qs };
      default:
        return state;
    }
  }

  if (typeof payload === "number" && typeof questionID === "number") {
    const qs = [...state.questions];
    const indexQuestion = qs.findIndex((q) => q.id === questionID);

    switch (type) {
      case actionTypes.qNumber:
        qs[indexQuestion].qNumber = payload;
        return { ...state, questions: qs };
      case actionTypes.tourNumber:
        qs[indexQuestion].tourNumber = payload;
        return { ...state, questions: qs };
      default:
        return state;
    }
  }

  if (typeof payload === "string") {
    switch (type) {
      case actionTypes.title:
        return { ...state, title: payload };
      case actionTypes.editors:
        const editorsArr = payload.split(";");
        return { ...state, editors: editorsArr };
      default:
        return state;
    }
  }

  if (typeof payload === "number") {
    switch (type) {
      case actionTypes.date:
        return { ...state, date: payload };
      default:
        return state;
    }
  }

  return state;
};

export default reducer;
