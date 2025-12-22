import type { TournamentType } from "Shared/Schemas/TournamentSchema";

export const initState: TournamentType = {
	id: 0,
	uploaderUuid: "",
	uploader: "",
	title: "",
	link: "",
	date: "",
	tours: 0,
	questionsQuantity: 0,
	difficulty: 0,
	status: "draft",
	dateUpload: "",
	editors: [],
	questions: [],
};
