import { TournamentType } from 'Shared/Types/tournament';

export type Action =
  | {
      type: 'qNumber' | 'tourNumber';
      questionID: number;
      payload: number;
    }
  | {
      type: 'loaded';
      payload: TournamentType;
    }
  | {
      type: 'title';
      payload: string;
    }
  | {
      type: 'date';
      payload: number;
    }
  | {
      type: 'add' | 'text' | 'answer' | 'alterAnswer' | 'comment' | 'author';
      questionID: number;
      payload: string;
    }
  | {
      type: 'removeQuestion';
      questionID: number;
    }
  | {
      type: 'editors';
      editorID: number;
      payload: string;
    }
  | {
      type: 'source';
      questionID: number;
      sourceID: number;
      payload: string;
    }
  | {
      type: 'questionType';
      questionID: number;
      payload: QuestionTypePayload;
    }
  | {
      type: 'addEditor';
    }
  | {
      type: 'removeEditor';
      editorID: number;
    }
  | {
      type: 'removeSource';
      questionID: number;
      sourceID: number;
    }
  | {
      type: 'addSource';
      questionID: number;
    };

type QuestionTypePayload = 'regular' | 'double' | 'triple' | 'other' | 'outside';

export const actionTypes = {
  loaded: 'loaded',
  date: 'date',
  questionType: 'questionType',
  editors: 'editors',
  addEditor: 'addEditor',
  removeEditor: 'removeEditor',
  title: 'title',
  add: 'add',
  text: 'text',
  answer: 'answer',
  alterAnswer: 'alterAnswer',
  comment: 'comment',
  source: 'source',
  removeSource: 'removeSource',
  addSource: 'addSource',
  author: 'author',
  qNumber: 'qNumber',
  tourNumber: 'tourNumber',
  removeQuestion: 'removeQuestion',
} as const;

const reducer = (state: TournamentType, action: Action) => {
  const { type } = action;

  if (type === actionTypes.loaded) {
    const t = structuredClone(action.payload);

    const randomKeys: number[] = [];
    while (randomKeys.length < t.questions.length) {
      const key = Math.floor(Math.random() * 1000 + 1);
      if (!randomKeys.includes(key)) randomKeys.push(key);
    }

    t.questions.forEach((q, i) => (q.id = randomKeys[i]));

    return t;
  }

  switch (type) {
    case actionTypes.date:
      return { ...state, date: action.payload };

    case actionTypes.title:
      return { ...state, title: action.payload };

    case actionTypes.editors:
      const editors = [...state.editors].map((editor) => {
        if (editor.id === action.editorID) return { ...editor, name: action.payload };
        return editor;
      });
      return { ...state, editors };

    case actionTypes.questionType:
      const TypesQuestions = [...state.questions].map((q) => {
        if (q.id === action.questionID) return { ...q, type: action.payload };
        return q;
      });
      return { ...state, questions: TypesQuestions };

    case actionTypes.add:
      const addQuestions = [...state.questions].map((q) => {
        if (q.id === action.questionID) return { ...q, add: action.payload };
        return q;
      });
      return { ...state, questions: addQuestions };

    case actionTypes.text:
      const textQuestions = [...state.questions].map((q) => {
        if (q.id === action.questionID) return { ...q, text: action.payload };
        return q;
      });
      return { ...state, questions: textQuestions };

    case actionTypes.answer:
      const answerQuestions = [...state.questions].map((q) => {
        if (q.id === action.questionID) return { ...q, answer: action.payload };
        return q;
      });
      return { ...state, questions: answerQuestions };

    case actionTypes.alterAnswer:
      const alterAnswerQuestions = [...state.questions].map((q) => {
        if (q.id === action.questionID) return { ...q, alterAnswer: action.payload };
        return q;
      });
      return { ...state, questions: alterAnswerQuestions };

    case actionTypes.comment:
      const commentQuestions = [...state.questions].map((q) => {
        if (q.id === action.questionID) return { ...q, comment: action.payload };
        return q;
      });
      return { ...state, questions: commentQuestions };

    case actionTypes.author:
      const authorQuestions = [...state.questions].map((q) => {
        if (q.id === action.questionID) return { ...q, author: action.payload };
        return q;
      });
      return { ...state, questions: authorQuestions };

    case actionTypes.source:
      const sourceQuestions = [...state.questions];
      const questionIndex = sourceQuestions.findIndex((q) => q.id === action.questionID);
      sourceQuestions[questionIndex].source.forEach((s) => {
        if (s.id === action.sourceID) s.link = action.payload;
      });
      return { ...state, questions: sourceQuestions };

    case actionTypes.removeSource:
      const removeSourceQuestions = [...state.questions];
      const questionIndexRemove = removeSourceQuestions.findIndex((q) => q.id === action.questionID);
      const sourcesRemove = removeSourceQuestions[questionIndexRemove].source.filter((s) => s.id !== action.sourceID);
      removeSourceQuestions[questionIndexRemove].source = sourcesRemove;
      return { ...state, questions: removeSourceQuestions };

    case actionTypes.addSource:
      const addSourceQuestions = [...state.questions];
      const questionIndexAdd = addSourceQuestions.findIndex((q) => q.id === action.questionID);
      addSourceQuestions[questionIndexAdd].source.push({ id: Date.now(), link: '' });
      return { ...state, questions: addSourceQuestions };

    case actionTypes.qNumber:
      const qNumberQuestions = [...state.questions].map((q) => {
        if (q.id === action.questionID) return { ...q, qNumber: action.payload };
        return q;
      });
      return { ...state, questions: qNumberQuestions };

    case actionTypes.tourNumber:
      const tourNumberQuestions = [...state.questions].map((q) => {
        if (q.id === action.questionID) return { ...q, tourNumber: action.payload };
        return q;
      });
      return { ...state, questions: tourNumberQuestions };

    case actionTypes.addEditor:
      return { ...state, editors: [...state.editors, { id: Date.now(), name: '' }] };

    case actionTypes.removeEditor:
      return {
        ...state,
        editors: state.editors.filter((editor) => editor.id !== action.editorID),
      };

    case actionTypes.removeQuestion:
      const questions = [...state.questions];
      let { questionsQuantity } = state;

      const indexQuestion = questions.findIndex((q) => q.id === action.questionID);
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

    default:
      return state;
  }
};

export default reducer;
