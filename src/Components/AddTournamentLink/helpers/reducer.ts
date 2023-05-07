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

const reducer = (state: TournamentType, action: Action) => {
  const { type, index, ...rest } = action;
  if (type === "loaded") {
    const t = rest.payload as TournamentType;
    return { ...state, ...t };
  } else if (typeof rest.payload === "string" && typeof index === "number") {
    const qs = [...state.questions];
    switch (type) {
      case "type":
        qs[index].type = rest.payload as QuestionTypePayload;
        return { ...state, questions: qs };
      case "add":
        qs[index].add = rest.payload;
        return { ...state, questions: qs };
      case "text":
        console.log(action);
        qs[index].text = rest.payload;
        return { ...state, questions: qs };
      case "answer":
        qs[index].answer = rest.payload;
        return { ...state, questions: qs };
      case "alterAnswer":
        qs[index].alterAnswer = rest.payload;
        return { ...state, questions: qs };
      case "comment":
        qs[index].comment = rest.payload;
        return { ...state, questions: qs };
      case "source":
        const sourceArr = rest.payload.split(";");
        qs[index].source = sourceArr;
        return { ...state, questions: qs };
      case "author":
        qs[index].author = rest.payload;
        return { ...state, questions: qs };
      default:
        return state;
    }
  } else if (typeof rest.payload === "number" && typeof index === "number") {
    const qs = state.questions;
    switch (type) {
      case "qNumber":
        qs[index].qNumber = rest.payload;
        return { ...state, questions: qs };
      case "tourNumber":
        qs[index].tourNumber = rest.payload;
        return { ...state, questions: qs };
      default:
        return state;
    }
  } else if (typeof rest.payload === "string" && !index) {
    switch (type) {
      case "title":
        return { ...state, title: rest.payload };
      case "editors":
        const editorsArr = rest.payload.split(";");
        return { ...state, editors: editorsArr };
      default:
        return state;
    }
  } else if (typeof rest.payload === "number" && !index) {
    switch (type) {
      case "date":
        return { ...state, date: rest.payload };
      default:
        return state;
    }
  } else return state;
};

export default reducer;
