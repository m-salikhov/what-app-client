import { useAppSelector } from "Shared/Hooks/redux";
import { moderateQuestionsSelector } from "Store/Selectors/moderateTournamentSelectors";
import ModerateQuestion from "./ModerateQuestion";
import styles from "../moderate-tournament.module.css";

export default function ModerateQuestions() {
	const questions = useAppSelector(moderateQuestionsSelector);
	return (
		<div className={styles.questions}>
			{questions.map((question) => (
				<ModerateQuestion key={question.id} question={question} />
			))}
		</div>
	);
}
