import "./playmode.css";
import { Spinner } from "Shared/Components/Spinner/Spinner";
import { useAppSelector } from "Shared/Hooks/redux";
import type { TournamentType } from "Shared/Schemas/TournamentSchema";
import { stepPM } from "Store/Selectors/PlayModeSelectors";
import type { Step } from "Store/Slices/PlayModeSlice";
import { useGetTournamentQuery } from "Store/ToolkitAPIs/tournamentAPI";
import { skipToken } from "@reduxjs/toolkit/query";
import { useParams } from "react-router-dom";
import { PMQuestion } from "./PlayModeParts/Components/PMQuestion/PMQuestion";
import { ProgressBar } from "./PlayModeParts/Components/ProgressBar/ProgressBar";
import { Start } from "./PlayModeParts/Start/Start";
import { TourEnd } from "./PlayModeParts/TourEnd/TourEnd";
import { End } from "./PlayModeParts/TournamentEnd/End";

function playModeStepChange(stepName: Step, tournament: TournamentType) {
	switch (stepName) {
		case "START": {
			return <Start tournament={tournament} />;
		}
		case "QUESTION": {
			return <PMQuestion tournament={tournament} />;
		}
		case "END_OF_TOUR": {
			return <TourEnd tournament={tournament} />;
		}
		case "END": {
			return <End tournament={tournament} />;
		}
		default: {
			return null;
		}
	}
}

function PlayMode() {
	const { id } = useParams();

	const step = useAppSelector(stepPM);

	const {
		data: tournament,
		isLoading,
		isSuccess,
		isError,
	} = useGetTournamentQuery(id ?? skipToken);

	const showProgressBar = isSuccess && step !== "START" && step !== "END";

	if (isLoading) return <Spinner />;

	return (
		<div className="playmode">
			<h2>{tournament?.title}</h2>

			{showProgressBar && <ProgressBar tournament={tournament} />}

			{isError && <p className="pm-error"> Ошибка: Не удалось загрузить турнир</p>}

			{isSuccess && playModeStepChange(step, tournament)}
		</div>
	);
}

export default PlayMode;
