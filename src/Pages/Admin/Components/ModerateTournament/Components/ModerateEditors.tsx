import { useAppDispatch } from "Shared/Hooks/redux";
import type { TournamentType } from "Shared/Schemas/TournamentSchema";
import { moderateTournamentActions } from "Store/Slices/ModerateTournamentSlice";
import styles from "../moderate-tournament.module.css";

interface Props {
	editors: TournamentType["editors"];
}
export function ModerateEditors({ editors }: Props) {
	const dispatch = useAppDispatch();

	return (
		<div className={styles.editors}>
			<p>Редактор(ы):</p>

			{editors.map((editor) => (
				<div key={editor.id}>
					{" "}
					<textarea
						placeholder="Редактор"
						onChange={(e) =>
							dispatch(
								moderateTournamentActions.changeEditorName({
									id: editor.id,
									name: e.target.value,
								}),
							)
						}
						value={editor.name}
						rows={1}
					/>
					<button
						type="button"
						title="Удалить редактора"
						onClick={() => {
							if (editors.length === 1) return;
							dispatch(moderateTournamentActions.removeEditor(editor.id));
						}}
					>
						❌
					</button>
				</div>
			))}

			<button
				className={styles.addEditorBtn}
				type="button"
				title="Добавить редактора"
				onClick={() => dispatch(moderateTournamentActions.addEditor())}
			>
				Добавить редактора
			</button>
		</div>
	);
}
