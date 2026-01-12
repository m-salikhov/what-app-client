import { useAuth } from "Shared/Auth/useAuth";
import { useAppSelector } from "Shared/Hooks/redux";
import { ResultClientSchema } from "Shared/Schemas/ResultSchema";
import { resultSelector, tournamentInfoSelector } from "Store/Selectors/PlayModeSelectors";
import { usePostUserResultMutation } from "Store/ToolkitAPIs/userAPI";
import { useEffect } from "react";

export function useSaveResult() {
	const { user } = useAuth();
	const { id, title, questionsQuantity } = useAppSelector(tournamentInfoSelector);

	const [saveUserResult, { isSuccess, error, isLoading }] = usePostUserResultMutation();

	const result = useAppSelector(resultSelector);

	useEffect(() => {
		if (!user || result.length !== questionsQuantity) return;

		const userResult = {
			userId: user.id,
			title,
			tournamentId: id,
			tournamentLength: result.length,
			resultNumber: result.reduce((acc, { ans }) => (ans ? acc + 1 : acc), 0),
			result,
		};

		try {
			ResultClientSchema.parse(userResult);
			saveUserResult(userResult);
		} catch (_error) {
			console.log(_error);
		}
	}, [id, title, user, result, saveUserResult, questionsQuantity]);

	return {
		isSuccess,
		error,
		isLoading,
	};
}
