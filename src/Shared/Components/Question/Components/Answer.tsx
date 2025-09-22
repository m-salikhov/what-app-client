import { ExternalLinkText } from "Shared/Components/UI/ExternalLinkText/ExternalLinkText";
import type { QuestionType } from "Shared/Schemas/TournamentSchema";
import styles from "../question.module.css";

export function Answer({ q }: { q: QuestionType }) {
	return (
		<div className={styles.answer}>
			<p>
				<span>Ответ:</span> {q.answer}
			</p>
			{q.alterAnswer && (
				<p>
					<span>Зачёт:</span> {q.alterAnswer}
				</p>
			)}
			{q.comment && (
				<p>
					<span>Комментарий:</span> {q.comment}
				</p>
			)}
			{q.source?.length === 1 && (
				<p className={styles.answerSourceOne}>
					<span>Источник: </span>{" "}
					{q.source[0].link.startsWith("http") ? (
						<ExternalLinkText text={q.source[0].link} href={q.source[0].link} />
					) : (
						q.source[0].link
					)}
				</p>
			)}
			{q.source && q.source.length > 1 && (
				<div>
					<p className={styles.answerSourceMany}>Источники:</p>
					{q.source.map((v, i) => {
						return (
							<p key={v.link}>
								{++i}.{" "}
								{v.link.startsWith("http") ? (
									<ExternalLinkText text={v.link} href={v.link} />
								) : (
									v.link
								)}
							</p>
						);
					})}
				</div>
			)}
			<p>
				<span>Автор:</span> {q.author}
			</p>
		</div>
	);
}
