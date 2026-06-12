import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TournamentType } from "Shared/Schemas/TournamentSchema";

export interface ModerateTournamentState {
	tournament: TournamentType;
	isModerated: boolean;
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
};

const ModerateTournamentSlice = createSlice({
	name: "moderateTournamentSlice",
	initialState,
	reducers: {
		setTournament: (state, action: PayloadAction<TournamentType>) => {
			state.isModerated = false;
			state.tournament = action.payload;
		},
		setTitle: (state, action: PayloadAction<string>) => {
			state.isModerated = true;
			state.tournament.title = action.payload;
		},
		setDate: (state, action: PayloadAction<string>) => {
			state.isModerated = true;
			state.tournament.date = action.payload;
		},
		setTours: (state, action: PayloadAction<number>) => {
			state.isModerated = true;
			state.tournament.tours = action.payload;
		},
		setQuestionsQuantity: (state, action: PayloadAction<number>) => {
			state.isModerated = true;
			state.tournament.questionsQuantity = action.payload;
		},
		setDifficulty: (state, action: PayloadAction<number>) => {
			state.isModerated = true;
			state.tournament.difficulty = action.payload;
		},
		addEditor: (state) => {
			state.isModerated = true;
			state.tournament.editors.push({ id: Date.now(), name: "" });
		},
		removeEditor: (state, action: PayloadAction<number>) => {
			state.isModerated = true;
			state.tournament.editors = state.tournament.editors.filter(
				(editor) => editor.id !== action.payload,
			);
		},
		changeEditorName: (state, action: PayloadAction<{ id: number; name: string }>) => {
			state.isModerated = true;
			state.tournament.editors = state.tournament.editors.map((editor) => {
				if (editor.id === action.payload.id) return { ...editor, name: action.payload.name };
				return editor;
			});
		},

		setQuestionText: (state, action: PayloadAction<{ id: number; text: string }>) => {
			state.isModerated = true;
			state.tournament.questions = state.tournament.questions.map((question) => {
				if (question.id === action.payload.id) return { ...question, text: action.payload.text };
				return question;
			});
		},
		setQuestionAnswer: (state, action: PayloadAction<{ id: number; answer: string }>) => {
			state.isModerated = true;
			state.tournament.questions = state.tournament.questions.map((question) => {
				if (question.id === action.payload.id)
					return { ...question, answer: action.payload.answer };
				return question;
			});
		},
		setQuestionAuthor: (state, action: PayloadAction<{ id: number; author: string }>) => {
			state.isModerated = true;
			state.tournament.questions = state.tournament.questions.map((question) => {
				if (question.id === action.payload.id)
					return { ...question, author: action.payload.author };
				return question;
			});
		},
		setQuestionComment: (state, action: PayloadAction<{ id: number; comment: string }>) => {
			state.isModerated = true;
			state.tournament.questions = state.tournament.questions.map((question) => {
				if (question.id === action.payload.id)
					return { ...question, comment: action.payload.comment };
				return question;
			});
		},
		setQuestionAlterAnswer: (state, action: PayloadAction<{ id: number; alterAnswer: string }>) => {
			state.isModerated = true;
			state.tournament.questions = state.tournament.questions.map((question) => {
				if (question.id === action.payload.id)
					return { ...question, alterAnswer: action.payload.alterAnswer };
				return question;
			});
		},
	},
});

export const { reducer: moderateTournamentReducer, actions: moderateTournamentActions } =
	ModerateTournamentSlice;
