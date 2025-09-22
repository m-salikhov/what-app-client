import type { QuestionType } from "Shared/Schemas/TournamentSchema";
import { Add } from "./Components/Add";
import { Answer } from "./Components/Answer";
import styles from "./question.module.css";

export function QuestionPlane({ q }: { q: QuestionType }) {
	return (
		<div className={styles.question}>
			<div className={styles.questionHeader}>
				<h3>Вопрос {q.qNumber}</h3>
				<h3>Тур {q.tourNumber}</h3>
			</div>

			{q.add && <Add add={q.add} />}

			<div className={styles.questionText}>
				<p>{q.text}</p>
			</div>

			<Answer q={q} />
		</div>
	);
}
