import type { QuestionType } from "Shared/Schemas/TournamentSchema";
import { Add } from "./Components/Add";
import { Answer } from "./Components/Answer";
import styles from "./question.module.css";

export function QuestionPlane({ q }: { q: QuestionType }) {
	return (
		<div className={styles.question}>
			<div className={styles.questionHeader}>
				<p className={styles.questionNumber}>Вопрос {q.qNumber}</p>
				<p>Тур {q.tourNumber}</p>
			</div>

			{q.add && <Add add={q.add} addMetadata={q.addMetadata} />}

			<div className={styles.questionText}>
				<p>{q.text}</p>
			</div>

			<Answer q={q} />
		</div>
	);
}
