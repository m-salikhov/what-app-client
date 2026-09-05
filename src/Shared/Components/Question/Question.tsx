import type { QuestionType } from "Shared/Schemas/TournamentSchema";
import { useState } from "react";
import { Disclosure, DisclosurePanel } from "react-aria-components";
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
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<div className={styles.question}>
			<div className={styles.questionHeader}>
				<p className={styles.questionNumber}>Вопрос {q.qNumber}</p>
				{random && <Link to={`/tournament/${q.tournament?.id}`}>{q.tournament?.title}</Link>}
				{!random && <p>Тур {q.tourNumber}</p>}
			</div>

			{q.add && <Add add={q.add} addMetadata={q.addMetadata} />}

			<div className={styles.questionText}>
				<p>{q.text}</p>
			</div>

			<Disclosure isExpanded={isExpanded} className={styles.disclosure}>
				<button type="button" onClick={() => setIsExpanded(!isExpanded)}>
					<p>{isExpanded ? "Скрыть ответ" : "Показать ответ"}</p>
					<AiOutlineDown size={"30px"} />
				</button>

				<DisclosurePanel className={styles.disclosurePanel}>
					<Answer q={q} />
				</DisclosurePanel>
			</Disclosure>
		</div>
	);
}
