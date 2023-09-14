import { QuestionType } from "../../../Types/question";
import { TournamentType } from "../../../Types/tournament";

export interface Action {
  type: keyof TournamentType | keyof QuestionType | "loaded";
  index?: number;
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
  const { type, index, payload } = action;

  if (type === actionTypes.loaded) {
    const t = payload as TournamentType;
    return { ...state, ...t };
  }

  if (typeof payload === "string" && typeof index === "number") {
    const qs = [...state.questions];
    switch (type) {
      case actionTypes.questionType:
        qs[index].type = payload as QuestionTypePayload;
        return { ...state, questions: qs };
      case actionTypes.add:
        qs[index].add = payload;
        return { ...state, questions: qs };
      case actionTypes.text:
        console.log(payload);
        qs[index].text = payload;
        return { ...state, questions: qs };
      case actionTypes.answer:
        qs[index].answer = payload;
        return { ...state, questions: qs };
      case actionTypes.alterAnswer:
        qs[index].alterAnswer = payload;
        return { ...state, questions: qs };
      case actionTypes.comment:
        qs[index].comment = payload;
        return { ...state, questions: qs };
      case actionTypes.source:
        const sourceArr = payload.split(";");
        qs[index].source = sourceArr;
        return { ...state, questions: qs };
      case actionTypes.author:
        qs[index].author = payload;
        return { ...state, questions: qs };
      default:
        return state;
    }
  }

  if (typeof payload === "number" && typeof index === "number") {
    const qs = [...state.questions];
    switch (type) {
      case actionTypes.qNumber:
        qs[index].qNumber = payload;
        return { ...state, questions: qs };
      case actionTypes.tourNumber:
        qs[index].tourNumber = payload;
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
