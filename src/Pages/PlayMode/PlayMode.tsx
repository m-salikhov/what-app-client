import { Spinner } from "Shared/Components/Spinner/Spinner";
import { useAppSelector } from "Shared/Hooks/redux";
import { stepSelector, tournamentInfoSelector } from "Store/Selectors/PlayModeSelectors";
import type { Step } from "Store/Slices/PlayModeSlice";
import { useParams } from "react-router-dom";
import { PlayModeQuestion } from "./PlayModeParts/Components/PMQuestion/PlayModeQuestion";
import { ProgressBar } from "./PlayModeParts/Components/ProgressBar/ProgressBar";
import { Start } from "./PlayModeParts/Start/Start";
import { TourEnd } from "./PlayModeParts/TourEnd/TourEnd";
import { End } from "./PlayModeParts/TournamentEnd/End";
import styles from "./playmode.module.css";
import { useSetTournament } from "./PlayModeParts/Hooks/useSetTournament";
import type { JSX } from "react";

const playModeControl: Record<Step, JSX.Element> = {
	END: <End />,
	END_OF_TOUR: <TourEnd />,
	QUESTION: <PlayModeQuestion />,
	START: <Start />,
};

function PlayMode() {
	const { id } = useParams();
	const { isLoading, isSuccess } = useSetTournament(id);

	const step = useAppSelector(stepSelector);
	const { title } = useAppSelector(tournamentInfoSelector);

	const showProgressBar = step === "QUESTION" || step === "END_OF_TOUR";

	if (isLoading) return <Spinner />;

	if (!isSuccess)
		return <p className={styles.errorTournamentLoading}> Ошибка: Не удалось загрузить турнир</p>;

	return (
		<div className={styles.playmode}>
			<h2>{title}</h2>

			{showProgressBar && <ProgressBar />}

			{playModeControl[step]}
		</div>
	);
}

export default PlayMode;
