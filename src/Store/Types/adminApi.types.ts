import type { TournamentType, QuestionType } from "Shared/Schemas/TournamentSchema";

export interface UpdateTournamentBody {
	updateTournament: Partial<TournamentType>;
	updateQuestions: Partial<QuestionType>[];
	updateSources: { id: number; link: string }[];
}
