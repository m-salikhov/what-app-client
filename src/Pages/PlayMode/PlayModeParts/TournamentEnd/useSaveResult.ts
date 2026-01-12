import { useAuth } from "Shared/Auth/useAuth";
import { useAppSelector } from "Shared/Hooks/redux";
import { ResultClientSchema } from "Shared/Schemas/ResultSchema";
import { finalResult, tournamentInfoSelector } from "Store/Selectors/PlayModeSelectors";
import { usePostUserResultMutation } from "Store/ToolkitAPIs/userAPI";
import { useEffect } from "react";

export function useSaveResult() {
	const { user } = useAuth();
	const { id, title } = useAppSelector(tournamentInfoSelector);

	const [saveUserResult, { isSuccess, error, isLoading }] = usePostUserResultMutation();

	const { result, totalAnsweredCount, totalQuestionsCount } = useAppSelector(finalResult);

	useEffect(() => {
		if (!user) return;

		const userResult = {
			userId: user.id,
			title,
			tournamentId: id,
			tournamentLength: totalQuestionsCount,
			resultNumber: totalAnsweredCount,
			result,
		};

		try {
			ResultClientSchema.parse(userResult);
			saveUserResult(userResult);
		} catch (_error) {
			console.log(_error);
		}
	}, [id, title, user, result, totalAnsweredCount, saveUserResult, totalQuestionsCount]);

	return {
		isSuccess,
		error,
		isLoading,
	};
}
