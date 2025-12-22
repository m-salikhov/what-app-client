import { useAuth } from "Shared/Auth/useAuth";
import type { TournamentType } from "Shared/Schemas/TournamentSchema";
import { useAddTournamentMutation } from "Store/ToolkitAPIs/tournamentAPI";

export function useSaveTournament() {
	const [
		saveTournament,
		{
			isLoading: isLoadingSave,
			error: errorOnSave,
			isSuccess: isSuccessSave,
			reset: resetSaveState,
		},
	] = useAddTournamentMutation();

	const { user } = useAuth();

	const handleSaveTournament = async (tournament: TournamentType) => {
		try {
			await saveTournament({
				...tournament,
				questions: tournament.questions.filter((q) => q.qNumber !== -1),
				uploaderUuid: user?.id || "",
				uploader: user?.username || "",
			}).unwrap();

			return true;
		} catch (_error) {
			return false;
		}
	};

	return {
		handleSaveTournament,
		isLoadingSave,
		errorOnSave,
		isSuccessSave,
		resetSaveState,
	};
}
