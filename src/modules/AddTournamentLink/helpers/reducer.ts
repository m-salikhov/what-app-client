import { TournamentType } from 'Common/Types/tournament';

export interface Action {
  type: keyof typeof actionTypes;
  questionID?: number;
  payload: string | number | TournamentType;
}

type QuestionTypePayload = 'regular' | 'double' | 'triple' | 'other' | 'outside';

export const actionTypes = {
  loaded: 'loaded',
  questionType: 'questionType',
  add: 'add',
  text: 'text',
  answer: 'answer',
  alterAnswer: 'alterAnswer',
  comment: 'comment',
  source: 'source',
  author: 'author',
  qNumber: 'qNumber',
  tourNumber: 'tourNumber',
  title: 'title',
  editors: 'editors',
  date: 'date',
  remove: 'remove',
} as const;

const reducer = (state: TournamentType, action: Action) => {
  const { type, questionID, payload } = action;

  if (type === actionTypes.loaded) {
    const t = structuredClone(payload as TournamentType);

    const randomKeys: number[] = [];
    while (randomKeys.length < t.questions.length) {
      const key = Math.floor(Math.random() * 1000 + 1);
      if (!randomKeys.includes(key)) randomKeys.push(key);
    }

    t.questions.forEach((q, i) => (q.id = randomKeys[i]));

    return t;
  }

  if (type === actionTypes.remove && typeof questionID === 'number') {
    const questions = [...state.questions];
    let { questionsQuantity } = state;

    const indexQuestion = questions.findIndex((q) => q.id === questionID);
    const q = questions[indexQuestion];

    if (q.type === 'outside') {
      q.qNumber === 0 ? (q.qNumber = -1) : (q.qNumber = 0);
    }

    if (q.qNumber > 0) {
      q.qNumber = -1;
      for (let i = indexQuestion + 1; i < questions.length; i++) {
        if (questions[i].qNumber > 0) questions[i].qNumber -= 1;
      }
      questionsQuantity -= 1;
    } else if (q.qNumber < 0 && q.type !== 'outside') {
      let nextQuestionIndex = 0;
      let prevQuestionIndex = 0;

      for (let i = indexQuestion; i < questions.length; i++) {
        if (questions[i].qNumber > 0) {
          nextQuestionIndex = questions[i].qNumber;
          break;
        }
      }
      for (let i = indexQuestion; i >= 0; i--) {
        if (questions[i].qNumber > 0) {
          prevQuestionIndex = questions[i].qNumber;
          break;
        }
      }

      if (nextQuestionIndex) {
        q.qNumber = nextQuestionIndex;
        for (let i = indexQuestion + 1; i < questions.length; i++) {
          if (questions[i].qNumber > 0) questions[i].qNumber += 1;
        }
      } else if (prevQuestionIndex) {
        q.qNumber = prevQuestionIndex + 1;
      } else {
        q.qNumber = 1;
      }

      questionsQuantity += 1;
    }

    return { ...state, questions, questionsQuantity };
  }

  if (typeof payload === 'string' && typeof questionID === 'number') {
    const questions = [...state.questions];
    const indexQuestion = questions.findIndex((q) => q.id === questionID);

    switch (type) {
      case actionTypes.questionType:
        questions[indexQuestion].type = payload as QuestionTypePayload;
        return { ...state, questions };
      case actionTypes.add:
        questions[indexQuestion].add = payload;
        return { ...state, questions };
      case actionTypes.text:
        questions[indexQuestion].text = payload;
        return { ...state, questions };
      case actionTypes.answer:
        questions[indexQuestion].answer = payload;
        return { ...state, questions };
      case actionTypes.alterAnswer:
        questions[indexQuestion].alterAnswer = payload;
        return { ...state, questions };
      case actionTypes.comment:
        questions[indexQuestion].comment = payload;
        return { ...state, questions };
      case actionTypes.source:
        questions[indexQuestion].source = payload.split(';');
        return { ...state, questions };
      case actionTypes.author:
        questions[indexQuestion].author = payload;
        return { ...state, questions };
      default:
        return state;
    }
  }

  if (typeof payload === 'number' && typeof questionID === 'number') {
    const questions = [...state.questions];
    const indexQuestion = questions.findIndex((q) => q.id === questionID);

    switch (type) {
      case actionTypes.qNumber:
        questions[indexQuestion].qNumber = payload;
        return { ...state, questions };
      case actionTypes.tourNumber:
        questions[indexQuestion].tourNumber = payload;
        return { ...state, questions };
      default:
        return state;
    }
  }

  if (typeof payload === 'string') {
    switch (type) {
      case actionTypes.title:
        return { ...state, title: payload };
      case actionTypes.editors:
        return { ...state, editors: payload.split(';') };
      default:
        return state;
    }
  }

  if (typeof payload === 'number') {
    return { ...state, date: payload };
  }

  return state;
};

export default reducer;
