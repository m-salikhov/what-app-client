import { type TournamentType, TournamentTypeSchema } from "Shared/Schemas/TournamentSchema";
import { nanoid } from "nanoid";
import { useState } from "react";

export function useCheckTournament() {
	const [errorsTournamentSchema, setErrorsTournamentSchema] = useState<
		{ id: string; message: string }[]
	>([]);

	const resetErrorsTournamentSchema = () => {
		setErrorsTournamentSchema([]);
	};

	const checkTournamentSchema = (tournament: TournamentType) => {
		setErrorsTournamentSchema([]);

		const parseResult = TournamentTypeSchema.safeParse(tournament);
		if (parseResult.error) {
			const errors = parseResult.error;

			errors.issues.forEach((e) => {
				const index = e.path[1];

				if (typeof index === "number" && tournament.questions[index].qNumber !== -1) {
					setErrorsTournamentSchema((prev) => [
						...prev,
						{
							id: nanoid(5),
							message: `Вопрос ${tournament.questions[index].qNumber}: ${e.message}`,
						},
					]);
				} else {
					setErrorsTournamentSchema((prev) => [...prev, { id: nanoid(5), message: e.message }]);
				}
			});
		}

		return parseResult.success;
	};

	return {
		errorsTournamentSchema,
		resetErrorsTournamentSchema,
		checkTournamentSchema,
	};
}
