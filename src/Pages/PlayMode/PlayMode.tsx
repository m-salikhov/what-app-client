import { Spinner } from "Shared/Components/Spinner/Spinner";
import { useAppSelector } from "Shared/Hooks/redux";
import { stepSelector } from "Store/Selectors/PlayModeSelectors";
import type { Step } from "Store/Slices/PlayModeSlice";
import { useGetTournamentQuery } from "Store/ToolkitAPIs/tournamentAPI";
import { skipToken } from "@reduxjs/toolkit/query";
import { useParams } from "react-router-dom";
import { PMQuestion } from "./PlayModeParts/Components/PMQuestion/PMQuestion";
import { ProgressBar } from "./PlayModeParts/Components/ProgressBar/ProgressBar";
import { Start } from "./PlayModeParts/Start/Start";
import { TourEnd } from "./PlayModeParts/TourEnd/TourEnd";
import { End } from "./PlayModeParts/TournamentEnd/End";
import styles from "./playmode.module.css";
import { useSetTournament } from "./PlayModeParts/Hooks/useSetTournament";

function playModeStepChange(stepName: Step) {
	switch (stepName) {
		case "START": {
			return <Start />;
		}
		case "QUESTION": {
			return <PMQuestion />;
		}
		case "END_OF_TOUR": {
			return <TourEnd />;
		}
		case "END": {
			return <End />;
		}
		default: {
			return null;
		}
	}
}

function PlayMode() {
	const { id } = useParams();
	useSetTournament(id);

	const step = useAppSelector(stepSelector);

	const { data: tournament, isLoading, isSuccess } = useGetTournamentQuery(id ?? skipToken);

	const showProgressBar = step === "QUESTION" || step === "END_OF_TOUR";

	if (isLoading) return <Spinner />;

	if (!isSuccess)
		return <p className={styles.errorTournamentLoading}> Ошибка: Не удалось загрузить турнир</p>;

	return (
		<div className={styles.playmode}>
			<h2>{tournament.title}</h2>

			{showProgressBar && <ProgressBar />}

			{playModeStepChange(step)}
		</div>
	);
}

export default PlayMode;
