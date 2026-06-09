import { parseDate } from "@internationalized/date";
import { DateField } from "react-aria-components";
import { useAppDispatch, useAppSelector } from "Shared/Hooks/redux";
import { moderateInfoSelector } from "Store/Selectors/moderateTournamentSelectors";
import { moderateTournamentActions } from "Store/Slices/ModerateTournamentSlice";

export default function ModerateInfo() {
	const info = useAppSelector(moderateInfoSelector);
	const dispatch = useAppDispatch();

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
		</div>
	);
}
