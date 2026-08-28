import { ExternalLinkText } from "Shared/Components/UI/ExternalLinkText/ExternalLinkText";
import type { QuestionType } from "Shared/Schemas/TournamentSchema";
import styles from "../question.module.css";

export function Answer({ q }: { q: QuestionType }) {
	return (
		<div className={styles.answer}>
			<div className={styles.answerBlock}>
				<p className={styles.answerText}>
					<span>Ответ:</span> {q.answer}
				</p>
			</div>

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

			{q.source.length === 1 && (
				<div className={styles.answerSource}>
					<p className={styles.answerSourceOne}>
						<span>Источник: </span>{" "}
						{q.source[0].link.startsWith("http") ? (
							<ExternalLinkText text={q.source[0].link} href={q.source[0].link} />
						) : (
							q.source[0].link
						)}
					</p>
				</div>
			)}

			{q.source.length > 1 && (
				<div className={styles.answerSource}>
					<p className={styles.answerSourceMany}>Источники:</p>
					{q.source.map((v, i) => (
						<p key={v.id}>
							{v.link.startsWith("http") ? (
								<ExternalLinkText text={`${++i}.\xA0${v.link}`} href={v.link} />
							) : (
								`${++i}.\xA0${v.link}`
							)}
						</p>
					))}
				</div>
			)}

			<p>
				<span>Автор:</span> {q.author}
			</p>

			{q.answerRatio && (
				<p>
					<span>Взятие:</span> {q.answerRatio}
				</p>
			)}
		</div>
	);
}
