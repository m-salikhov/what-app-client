import type { TournamentType, QuestionType } from "Shared/Schemas/TournamentSchema";

export interface UpdateTournamentBody {
	tournamentId: number;
	updateTournament: Partial<TournamentType>;
	updateQuestions: Partial<QuestionType>[];
	updateSources: { id: number; link: string }[];
}
