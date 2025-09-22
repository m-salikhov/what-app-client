import type { QuestionType } from "Shared/Schemas/TournamentSchema";
import { useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Add } from "./Components/Add";
import { Answer } from "./Components/Answer";
import styles from "./question.module.css";

interface Props {
	q: QuestionType;
	random?: boolean;
}

export function Question({ q, random = false }: Props) {
	const [showAnswer, setShowAnswer] = useState(false);

	return (
		<div className={styles.question}>
			<div className={styles.questionHeader}>
				<h3 className={styles.questionNumber}>Вопрос {q.qNumber}</h3>
				{random && <Link to={`/tournament/${q.tournament?.id}`}>{q.tournament?.title}</Link>}
				{!random && <h3>Тур {q.tourNumber}</h3>}
			</div>

			{q.add && <Add add={q.add} />}

			<div className={styles.questionText}>
				<p>{q.text}</p>
			</div>

			<div className={styles.answerArrow} onClick={() => setShowAnswer(!showAnswer)}>
				<h4>Ответ</h4>
				<AiOutlineDown
					className={showAnswer ? styles.answerArrowOpen : styles.answerArrowClose}
					size={"30px"}
				/>
			</div>

			<div className={showAnswer ? styles.ans : `${styles.ans} ${styles.ansClose}`}>
				<Answer q={q} />
			</div>
		</div>
	);
}
