import { skipToken } from "@reduxjs/toolkit/query";
import { Button } from "Shared/Components/UI/Button/Button";
import { useAppDispatch, useAppSelector } from "Shared/Hooks/redux";
import {
	isModeratedSelector,
	moderateTournamentSelector,
} from "Store/Selectors/moderateTournamentSelectors";
import { moderateTournamentActions } from "Store/Slices/ModerateTournamentSlice";
import { useGetTournamentQuery } from "Store/ToolkitAPIs/tournamentAPI";
import styles from "../moderate-tournament.module.css";

export default function ModerateButtonsBlock() {
	const dispatch = useAppDispatch();

	const isModerated = useAppSelector(isModeratedSelector);
	const { id } = useAppSelector(moderateTournamentSelector);

	const { data: tournament } = useGetTournamentQuery(id || skipToken);

	return (
		<div className={styles.buttonsBlock}>
			<Button size="small" disabled={!isModerated}>
				Сохранить изменения
			</Button>

			<Button
				size="small"
				disabled={!isModerated}
				onClick={() => {
					if (tournament) {
						dispatch(moderateTournamentActions.setTournament(tournament));
					}
				}}
			>
				Откатить изменения
			</Button>
		</div>
	);
}
