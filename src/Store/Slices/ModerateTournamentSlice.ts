import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TournamentType } from "Shared/Schemas/TournamentSchema";

export interface ModerateTournamentState {
	tournament: TournamentType;
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
};

const ModerateTournamentSlice = createSlice({
	name: "moderateTournamentSlice",
	initialState,
	reducers: {
		setTournament: (state, action: PayloadAction<TournamentType>) => {
			state.tournament = action.payload;
		},
		setTitle: (state, action: PayloadAction<string>) => {
			state.tournament.title = action.payload;
		},
		setDate: (state, action: PayloadAction<string>) => {
			state.tournament.date = action.payload;
		},
		setTours: (state, action: PayloadAction<number>) => {
			state.tournament.tours = action.payload;
		},
		setQuestionsQuantity: (state, action: PayloadAction<number>) => {
			state.tournament.questionsQuantity = action.payload;
		},
		setDifficulty: (state, action: PayloadAction<number>) => {
			state.tournament.difficulty = action.payload;
		},
		addEditor: (state) => {
			state.tournament.editors.push({ id: Date.now(), name: "" });
		},
		removeEditor: (state, action: PayloadAction<number>) => {
			state.tournament.editors = state.tournament.editors.filter(
				(editor) => editor.id !== action.payload,
			);
		},
		changeEditorName: (state, action: PayloadAction<{ id: number; name: string }>) => {
			state.tournament.editors = state.tournament.editors.map((editor) => {
				if (editor.id === action.payload.id) return { ...editor, name: action.payload.name };
				return editor;
			});
		},
	},
});

export const { reducer: moderateTournamentReducer, actions: moderateTournamentActions } =
	ModerateTournamentSlice;
