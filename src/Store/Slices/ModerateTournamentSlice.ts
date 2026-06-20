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
	moderatedSources: { id: number; link: string }[];
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
	moderatedSources: [],
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

			const moderatedQuestion = state.moderatedQuestions.find((q) => q.id === action.payload.id);
			if (moderatedQuestion) {
				if (!moderatedQuestion.fields.includes("text")) moderatedQuestion.fields.push("text");
			} else {
				state.moderatedQuestions.push({ id: action.payload.id, fields: ["text"] });
			}

			const question = state.tournament.questions.find((q) => q.id === action.payload.id);
			if (question) {
				question.text = action.payload.text;
			}
		},

		setQuestionAnswer: (state, action: PayloadAction<{ id: number; answer: string }>) => {
			state.isModerated = true;

			const moderatedQuestion = state.moderatedQuestions.find((q) => q.id === action.payload.id);
			if (moderatedQuestion) {
				if (!moderatedQuestion.fields.includes("answer")) moderatedQuestion.fields.push("answer");
			} else {
				state.moderatedQuestions.push({ id: action.payload.id, fields: ["answer"] });
			}

			const question = state.tournament.questions.find((q) => q.id === action.payload.id);
			if (question) {
				question.answer = action.payload.answer;
			}
		},

		setQuestionAuthor: (state, action: PayloadAction<{ id: number; author: string }>) => {
			state.isModerated = true;

			const moderatedQuestion = state.moderatedQuestions.find((q) => q.id === action.payload.id);
			if (moderatedQuestion) {
				if (!moderatedQuestion.fields.includes("author")) moderatedQuestion.fields.push("author");
			} else {
				state.moderatedQuestions.push({ id: action.payload.id, fields: ["author"] });
			}

			const question = state.tournament.questions.find((q) => q.id === action.payload.id);
			if (question) {
				question.author = action.payload.author;
			}
		},
		setQuestionComment: (state, action: PayloadAction<{ id: number; comment: string }>) => {
			state.isModerated = true;

			const moderatedQuestion = state.moderatedQuestions.find((q) => q.id === action.payload.id);
			if (moderatedQuestion) {
				if (!moderatedQuestion.fields.includes("comment")) moderatedQuestion.fields.push("comment");
			} else {
				state.moderatedQuestions.push({ id: action.payload.id, fields: ["comment"] });
			}

			const question = state.tournament.questions.find((q) => q.id === action.payload.id);
			if (question) {
				question.comment = action.payload.comment;
			}
		},
		setQuestionAlterAnswer: (state, action: PayloadAction<{ id: number; alterAnswer: string }>) => {
			state.isModerated = true;

			const moderatedQuestion = state.moderatedQuestions.find((q) => q.id === action.payload.id);
			if (moderatedQuestion) {
				if (!moderatedQuestion.fields.includes("alterAnswer"))
					moderatedQuestion.fields.push("alterAnswer");
			} else {
				state.moderatedQuestions.push({ id: action.payload.id, fields: ["alterAnswer"] });
			}

			const question = state.tournament.questions.find((q) => q.id === action.payload.id);
			if (question) {
				question.alterAnswer = action.payload.alterAnswer;
			}
		},
		setQuestionAdd: (state, action: PayloadAction<{ id: number; add: string }>) => {
			state.isModerated = true;

			const moderatedQuestion = state.moderatedQuestions.find((q) => q.id === action.payload.id);
			if (moderatedQuestion) {
				if (!moderatedQuestion.fields.includes("add")) moderatedQuestion.fields.push("add");
			} else {
				state.moderatedQuestions.push({ id: action.payload.id, fields: ["add"] });
			}

			const question = state.tournament.questions.find((q) => q.id === action.payload.id);
			if (question) {
				question.add = action.payload.add;
			}
		},

		setSourceLink: (
			state,
			action: PayloadAction<{ questionId: number; sourceId: number; link: string }>,
		) => {
			state.isModerated = true;

			const moderatedSource = state.moderatedSources.find((s) => s.id === action.payload.sourceId);
			if (moderatedSource) {
				moderatedSource.link = action.payload.link;
			} else {
				state.moderatedSources.push({ id: action.payload.sourceId, link: action.payload.link });
			}

			const question = state.tournament.questions.find((q) => q.id === action.payload.questionId);
			const source = question?.source.find((s) => s.id === action.payload.sourceId);
			if (source) {
				source.link = action.payload.link;
			}
		},
	},
});

export const { reducer: moderateTournamentReducer, actions: moderateTournamentActions } =
	ModerateTournamentSlice;
