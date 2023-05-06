import { QuestionType } from "../../../Types/question";
import { TournamentType } from "../../../Types/tournament";

interface Action {
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
  } else if (typeof rest.payload === "string" && index) {
    const qs = state.questions;
    switch (action.type) {
      case "type":
        qs[index].type = rest.payload as QuestionTypePayload;
        return { ...state, questions: qs };
      case "add":
        qs[index].add = rest.payload;
        return { ...state, questions: qs };
      case "text":
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
      // case "source": qs[index].source = rest.payload;return { ...state, questions: qs };
      case "author":
        qs[index].author = rest.payload;
        return { ...state, questions: qs };
      default:
        return state;
    }
  } else if (typeof rest.payload === "number" && index) {
    const qs = state.questions;
    switch (action.type) {
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
    // const { type, index, ...rest } = action;
    switch (action.type) {
      case "title":
        return { ...state, title: rest.payload };
      case "editors":
        return { ...state, editors: ["ddd"] };
      default:
        return state;
    }
  } else return state;
};

export default reducer;
