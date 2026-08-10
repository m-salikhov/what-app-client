import { useAppDispatch } from "Shared/Hooks/redux";
import type { QuestionType } from "Shared/Schemas/TournamentSchema";
import { moderateTournamentActions } from "Store/Slices/ModerateTournamentSlice";
import styles from "../moderate-tournament.module.css";

export default function ModerateQuestion({ question }: { question: QuestionType }) {
	const dispatch = useAppDispatch();

	return (
		<div className={styles.question}>
			<div className={styles.questionHeader}>
				<h3>Вопрос {question.qNumber}</h3>
				<h3>Тур {question.tourNumber}</h3>
			</div>

			<label>
				<p>текст вопроса</p>
				<textarea
					placeholder="текст вопроса"
					onChange={(e) =>
						dispatch(
							moderateTournamentActions.setQuestionText({
								id: question.id,
								text: e.target.value,
							}),
						)
					}
					value={question.text}
					rows={5}
				/>
			</label>

			<label>
				<p>раздатка</p>
				<textarea
					placeholder="нет раздатки"
					onChange={(e) =>
						dispatch(
							moderateTournamentActions.setQuestionAdd({
								id: question.id,
								add: e.target.value,
							}),
						)
					}
					value={question.add}
					rows={1}
				/>
			</label>

			<label>
				<p>ответ</p>
				<input
					placeholder="Ответ"
					type="text"
					onChange={(e) =>
						dispatch(
							moderateTournamentActions.setQuestionAnswer({
								id: question.id,
								answer: e.target.value,
							}),
						)
					}
					value={question.answer}
				/>
			</label>

			<label>
				<p>зачет</p>
				<input
					placeholder="ответ"
					type="text"
					onChange={(e) =>
						dispatch(
							moderateTournamentActions.setQuestionAlterAnswer({
								id: question.id,
								alterAnswer: e.target.value,
							}),
						)
					}
					value={question.alterAnswer}
				/>
			</label>

			<label>
				<p>комментарий</p>
				<textarea
					placeholder="комментарий"
					onChange={(e) =>
						dispatch(
							moderateTournamentActions.setQuestionComment({
								id: question.id,
								comment: e.target.value,
							}),
						)
					}
					value={question.comment}
					rows={5}
				/>{" "}
			</label>

			<label>
				<p>автор</p>
				<input
					placeholder="Автор"
					type="text"
					onChange={(e) =>
						dispatch(
							moderateTournamentActions.setQuestionAuthor({
								id: question.id,
								author: e.target.value,
							}),
						)
					}
					value={question.author}
				/>
			</label>

			<p>источники</p>

			{question.source.length > 0 &&
				question.source.map((source) => (
					<label key={source.id}>
						<textarea
							placeholder="источник"
							onChange={(e) =>
								dispatch(
									moderateTournamentActions.setSourceLink({
										questionId: question.id,
										sourceId: source.id,
										link: e.target.value,
									}),
								)
							}
							value={source.link}
							rows={1}
						/>
					</label>
				))}
		</div>
	);
}
