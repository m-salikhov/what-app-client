import { skipToken } from "@reduxjs/toolkit/query";
import { Button } from "Shared/Components/UI/Button/Button";
import { useAppDispatch, useAppSelector } from "Shared/Hooks/redux";
import {
	isModeratedSelector,
	moderateTournamentSelector,
	updatedFieldsSelector,
} from "Store/Selectors/moderateTournamentSelectors";
import { moderateTournamentActions } from "Store/Slices/ModerateTournamentSlice";
import { useGetTournamentQuery } from "Store/ToolkitAPIs/tournamentAPI";
import styles from "../moderate-tournament.module.css";
import { useUpdateTournamentMutation } from "Store/ToolkitAPIs/adminAPI";
import type { QuestionType, TournamentType } from "Shared/Schemas/TournamentSchema";
import type { UpdateTournamentBody } from "Store/Types/adminApi.types";

export default function ModerateButtonsBlock() {
	const dispatch = useAppDispatch();

	const isModerated = useAppSelector(isModeratedSelector);
	const tournament = useAppSelector(moderateTournamentSelector);
	const { moderatedInfoFields, moderatedQuestions } = useAppSelector(updatedFieldsSelector);

	const { data: tournamentSource } = useGetTournamentQuery(tournament.id || skipToken);
	const [updateTournament] = useUpdateTournamentMutation();

	const handleSave = () => {
		const dataObject: UpdateTournamentBody = { updateTournament: {}, updateQuestions: [] };

		if (moderatedInfoFields.length > 0) {
			dataObject.updateTournament.id = tournament.id;
			for (const field of moderatedInfoFields) {
				(dataObject.updateTournament as Record<keyof TournamentType, unknown>)[field] =
					tournament[field];
			}
		}

		if (moderatedQuestions.length > 0) {
			for (const question of moderatedQuestions) {
				const questionObject: Partial<QuestionType> = { id: question.id };
				for (const field of question.fields) {
					(questionObject as Record<keyof QuestionType, unknown>)[field] =
						tournament.questions.find((q) => q.id === question.id)?.[field];
				}
				dataObject.updateQuestions.push(questionObject);
			}
		}

		updateTournament(dataObject);
	};

	return (
		<div className={styles.buttonsBlock}>
			<Button size="small" disabled={!isModerated} onClick={handleSave}>
				Сохранить изменения
			</Button>

			<Button
				size="small"
				disabled={!isModerated}
				onClick={() => {
					if (tournamentSource) {
						dispatch(moderateTournamentActions.setTournament(tournamentSource));
					}
				}}
			>
				Откатить изменения
			</Button>
		</div>
	);
}
