import { parseDate } from "@internationalized/date";
import { DateField, DateInput, DateSegment, Label } from "react-aria-components";
import { useAppDispatch, useAppSelector } from "Shared/Hooks/redux";
import { moderateInfoSelector } from "Store/Selectors/moderateTournamentSelectors";
import { moderateTournamentActions } from "Store/Slices/ModerateTournamentSlice";
import { ModerateEditors } from "./ModerateEditors";

export default function ModerateInfo() {
	const info = useAppSelector(moderateInfoSelector);
	const dispatch = useAppDispatch();
	console.log(info);

	return (
		<div>
			<label>
				<p> Название турнира</p>
				<input
					placeholder="Название турнира"
					type="text"
					onChange={(e) => dispatch(moderateTournamentActions.setTitle(e.target.value))}
					value={info.title}
				/>
			</label>

			<label>
				<p>Сложность</p>
				<input
					type="number"
					min={0}
					step="0.1"
					onChange={(e) =>
						dispatch(moderateTournamentActions.setDifficulty(Number(e.target.value)))
					}
					value={info.difficulty}
				/>
			</label>

			<DateField
				onChange={(e) => {
					dispatch(moderateTournamentActions.setDate(e && e.year > 1900 ? e.toString() : ""));
				}}
				value={parseDate(info.date.split("T")[0])}
				defaultValue={parseDate(info.date.split("T")[0])}
				// className={styles.dateField}
			>
				<Label>Дата отыгрыша</Label>
				<DateInput>{(segment) => <DateSegment segment={segment} />}</DateInput>
			</DateField>

			<ModerateEditors editors={info.editors} />
		</div>
	);
}
