import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { QuestionType, TournamentType } from "Shared/Schemas/TournamentSchema";

export interface ModerateTournamentState {
	tournament: TournamentType;
	isModerated: boolean;
	moderatedInfoFields: (keyof TournamentType)[];
	moderatedQuestions: {
		id: number;
		fields: (keyof QuestionType)[];
	}[];
}

const initialState: ModerateTournamentState = {
	tournament: {
		id: 0,
		uploaderUuid: "",
		uploader: "",
		title: "",
		link: "",
		date: "2000-01-01T10:00:00.000Z",
		tours: 0,
		questionsQuantity: 0,
		difficulty: 0,
		status: "draft",
		dateUpload: "2000-01-01T10:00:00.000Z",
		editors: [],
		questions: [],
	},
	isModerated: false,
	moderatedInfoFields: [],
	moderatedQuestions: [],
};

const ModerateTournamentSlice = createSlice({
	name: "moderateTournamentSlice",
	initialState,
	reducers: {
		setTournament: (state, action: PayloadAction<TournamentType>) => {
			state.isModerated = false;
			state.moderatedInfoFields = [];
			state.moderatedQuestions = [];
			state.tournament = action.payload;
		},
		setTitle: (state, action: PayloadAction<string>) => {
			state.isModerated = true;

			if (!state.moderatedInfoFields.includes("title")) state.moderatedInfoFields.push("title");

			state.tournament.title = action.payload;
		},
		setDate: (state, action: PayloadAction<string>) => {
			state.isModerated = true;
			if (!state.moderatedInfoFields.includes("date")) state.moderatedInfoFields.push("date");
			state.tournament.date = action.payload;
		},
		setTours: (state, action: PayloadAction<number>) => {
			state.isModerated = true;
			if (!state.moderatedInfoFields.includes("tours")) state.moderatedInfoFields.push("tours");
			state.tournament.tours = action.payload;
		},
		setQuestionsQuantity: (state, action: PayloadAction<number>) => {
			state.isModerated = true;
			if (!state.moderatedInfoFields.includes("questionsQuantity"))
				state.moderatedInfoFields.push("questionsQuantity");
			state.tournament.questionsQuantity = action.payload;
		},
		setDifficulty: (state, action: PayloadAction<number>) => {
			state.isModerated = true;
			if (!state.moderatedInfoFields.includes("difficulty"))
				state.moderatedInfoFields.push("difficulty");
			state.tournament.difficulty = action.payload;
		},
		addEditor: (state) => {
			state.isModerated = true;
			if (!state.moderatedInfoFields.includes("editors")) state.moderatedInfoFields.push("editors");
			state.tournament.editors.push({ id: Date.now(), name: "" });
		},
		removeEditor: (state, action: PayloadAction<number>) => {
			state.isModerated = true;
			if (!state.moderatedInfoFields.includes("editors")) state.moderatedInfoFields.push("editors");
			state.tournament.editors = state.tournament.editors.filter(
				(editor) => editor.id !== action.payload,
			);
		},
		changeEditorName: (state, action: PayloadAction<{ id: number; name: string }>) => {
			state.isModerated = true;
			if (!state.moderatedInfoFields.includes("editors")) state.moderatedInfoFields.push("editors");
			state.tournament.editors = state.tournament.editors.map((editor) => {
				if (editor.id === action.payload.id) return { ...editor, name: action.payload.name };
				return editor;
			});
		},

		setQuestionText: (state, action: PayloadAction<{ id: number; text: string }>) => {
			state.isModerated = true;

			if (!state.moderatedQuestions.find((q) => q.id === action.payload.id)) {
				state.moderatedQuestions.push({ id: action.payload.id, fields: ["text"] });
			} else {
				state.moderatedQuestions = state.moderatedQuestions.map((q) => {
					if (q.id === action.payload.id && !q.fields.includes("text")) q.fields.push("text");
					return q;
				});
			}

			state.tournament.questions = state.tournament.questions.map((question) => {
				if (question.id === action.payload.id) return { ...question, text: action.payload.text };
				return question;
			});
		},
		setQuestionAnswer: (state, action: PayloadAction<{ id: number; answer: string }>) => {
			state.isModerated = true;

			if (!state.moderatedQuestions.find((q) => q.id === action.payload.id)) {
				state.moderatedQuestions.push({ id: action.payload.id, fields: ["answer"] });
			} else {
				state.moderatedQuestions = state.moderatedQuestions.map((q) => {
					if (q.id === action.payload.id && !q.fields.includes("answer")) q.fields.push("answer");
					return q;
				});
			}

			state.tournament.questions = state.tournament.questions.map((question) => {
				if (question.id === action.payload.id)
					return { ...question, answer: action.payload.answer };
				return question;
			});
		},
		setQuestionAuthor: (state, action: PayloadAction<{ id: number; author: string }>) => {
			state.isModerated = true;

			if (!state.moderatedQuestions.find((q) => q.id === action.payload.id)) {
				state.moderatedQuestions.push({ id: action.payload.id, fields: ["author"] });
			} else {
				state.moderatedQuestions = state.moderatedQuestions.map((q) => {
					if (q.id === action.payload.id && !q.fields.includes("author")) q.fields.push("author");
					return q;
				});
			}

			state.tournament.questions = state.tournament.questions.map((question) => {
				if (question.id === action.payload.id)
					return { ...question, author: action.payload.author };
				return question;
			});
		},
		setQuestionComment: (state, action: PayloadAction<{ id: number; comment: string }>) => {
			state.isModerated = true;

			if (!state.moderatedQuestions.find((q) => q.id === action.payload.id)) {
				state.moderatedQuestions.push({ id: action.payload.id, fields: ["comment"] });
			} else {
				state.moderatedQuestions = state.moderatedQuestions.map((q) => {
					if (q.id === action.payload.id && !q.fields.includes("comment")) q.fields.push("comment");
					return q;
				});
			}

			state.tournament.questions = state.tournament.questions.map((question) => {
				if (question.id === action.payload.id)
					return { ...question, comment: action.payload.comment };
				return question;
			});
		},
		setQuestionAlterAnswer: (state, action: PayloadAction<{ id: number; alterAnswer: string }>) => {
			state.isModerated = true;

			if (!state.moderatedQuestions.find((q) => q.id === action.payload.id)) {
				state.moderatedQuestions.push({ id: action.payload.id, fields: ["alterAnswer"] });
			} else {
				state.moderatedQuestions = state.moderatedQuestions.map((q) => {
					if (q.id === action.payload.id && !q.fields.includes("alterAnswer"))
						q.fields.push("alterAnswer");
					return q;
				});
			}

			state.tournament.questions = state.tournament.questions.map((question) => {
				if (question.id === action.payload.id)
					return { ...question, alterAnswer: action.payload.alterAnswer };
				return question;
			});
		},
		setQuestionAdd: (state, action: PayloadAction<{ id: number; add: string }>) => {
			state.isModerated = true;
			if (!state.moderatedQuestions.find((q) => q.id === action.payload.id)) {
				state.moderatedQuestions.push({ id: action.payload.id, fields: ["add"] });
			} else {
				state.moderatedQuestions = state.moderatedQuestions.map((q) => {
					if (q.id === action.payload.id && !q.fields.includes("add")) q.fields.push("add");
					return q;
				});
			}
			state.tournament.questions = state.tournament.questions.map((question) => {
				if (question.id === action.payload.id) return { ...question, add: action.payload.add };
				return question;
			});
		},
	},
});

export const { reducer: moderateTournamentReducer, actions: moderateTournamentActions } =
	ModerateTournamentSlice;
