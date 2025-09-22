import { useAuth } from "Shared/Auth/useAuth";
import { type TournamentType, TournamentTypeSchema } from "Shared/Schemas/TournamentSchema";
import { useAddTournamentMutation, useParseLinkMutation } from "Store/ToolkitAPIs/tournamentAPI";
import { nanoid } from "nanoid";
import { type Dispatch, useState } from "react";
import type { Action } from "../helpers/reducer";

export function useSaveTournament() {
	const [errorsFilling, setErrorsFilling] = useState<{ id: string; message: string }[]>([]);

	const [
		saveTournament,
		{ isLoading: isLoadingSave, error: errorOnSave, isSuccess: isSuccessSave, reset: resetSave },
	] = useAddTournamentMutation();
	const [
		parseTournament,
		{
			isLoading: isLoadingParse,
			error: errorOnParse,
			reset: resetParse,
			isSuccess: isSuccessParse,
		},
	] = useParseLinkMutation();

	const reset = () => {
		resetSave();
		resetParse();
	};

	const { user } = useAuth();

	const handleSaveTournament = async (tournament: TournamentType) => {
		setErrorsFilling([]);

		const parseResult = TournamentTypeSchema.safeParse(tournament);
		if (parseResult.error) {
			const errors = parseResult.error;

			errors.issues.forEach((e) => {
				const index = e.path[1];

				if (typeof index === "number" && tournament.questions[index].qNumber !== -1) {
					setErrorsFilling((prev) => [
						...prev,
						{
							id: nanoid(5),
							message: `Вопрос ${tournament.questions[index].qNumber}: ${e.message}`,
						},
					]);
				} else {
					setErrorsFilling((prev) => [...prev, { id: nanoid(5), message: e.message }]);
				}
			});

			return;
		}

		try {
			await saveTournament({
				...tournament,
				questions: tournament.questions.filter((q) => q.qNumber !== -1),
				uploaderUuid: user?.id || "",
				uploader: user?.username || "",
			}).unwrap();
			reset();
		} catch (error) {
			console.log(error);
		}
	};

	const handleParseLink = async (dispatch: Dispatch<Action>, link: string) => {
		reset();
		setErrorsFilling([]);

		try {
			const data = await parseTournament({ link }).unwrap();

			dispatch({ type: "loaded", payload: data });
		} catch (error) {
			console.error("Failed to parse link:", error);
		}
	};

	return {
		errorsFilling,
		handleSaveTournament,
		isLoading: isLoadingSave || isLoadingParse,
		error: errorOnSave || errorOnParse,
		isSuccessSave,
		isSuccessParse,
		handleParseLink,
	};
}
