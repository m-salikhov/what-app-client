import { useAppDispatch } from "Shared/Hooks/redux";
import type { QuestionType } from "Shared/Schemas/TournamentSchema";
import { moderateTournamentActions } from "Store/Slices/ModerateTournamentSlice";
import styles from "../moderate-tournament.module.css";

export default function ModerateQuestion({ question }: { question: QuestionType }) {
	const dispatch = useAppDispatch();

	return (
		<div>
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

			<label>
				<p>Ответ</p>
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
				<p>Зачет</p>
				<input
					placeholder="Ответ"
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
			/>

			<label>
				<p> Автор</p>
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
		</div>
	);
}
