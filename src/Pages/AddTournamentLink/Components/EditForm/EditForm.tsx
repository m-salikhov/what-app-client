import { ScrollToTop } from "Shared/Components/ScrollToTop/ScrollToTop";
import { Button } from "Shared/Components/UI/Button/Button";
import { getDateYYYY_MM_DD } from "Shared/Helpers/getDate";
import type { TournamentType } from "Shared/Schemas/TournamentSchema";
import { parseDate } from "@internationalized/date";
import { DateField, DateInput, DateSegment, Label } from "react-aria-components";
import { type Action, actionTypes } from "../../helpers/reducer";
import { EditFormEditors } from "./EditFormEditors";
import { EditFormQuestion } from "./EditFormQuestion";
import styles from "./edit-form.module.css";

interface Props {
	tournament: TournamentType;
	dispatch: (action: Action) => void;
	setEdit: (edit: boolean) => void;
}

export function EditForm({ tournament, dispatch, setEdit }: Props) {
	return (
		<main
			onKeyDown={(e) => {
				if (e.key === "Enter" && e.ctrlKey) {
					setEdit(false);
				}
			}}
		>
			<Button title="Закончить редактирование" onClick={() => setEdit(false)} />

			<div className={styles.edit}>
				<div className={styles.editTop}>
					<label>
						<p> Название турнира</p>
						<input
							placeholder="Название турнира"
							type="text"
							onChange={(e) => dispatch({ type: actionTypes.title, payload: e.target.value })}
							value={tournament.title}
						/>
					</label>

					<DateField
						onChange={(e) => {
							dispatch({
								type: actionTypes.date,
								payload: e && e.year > 1900 ? Date.parse(e.toString()) : 0,
							});
						}}
						defaultValue={tournament.date ? parseDate(getDateYYYY_MM_DD(tournament.date)) : null}
						className={styles.dateField}
					>
						<Label>Дата отыгрыша</Label>
						<DateInput className={styles.dateInput}>
							{(segment) => <DateSegment className={styles.dateSegment} segment={segment} />}
						</DateInput>
					</DateField>

					<label>
						<p>Сложность</p>
						<input
							type="number"
							min={0}
							step="0.1"
							onChange={(e) =>
								dispatch({ type: actionTypes.difficulty, payload: parseFloat(e.target.value) })
							}
							value={tournament.difficulty}
						/>
					</label>

					<EditFormEditors editors={tournament.editors} dispatch={dispatch} />
				</div>

				{tournament.questions.map((question) => (
					<EditFormQuestion q={question} dispatch={dispatch} key={question.id} />
				))}
			</div>

			<ScrollToTop />
		</main>
	);
}
