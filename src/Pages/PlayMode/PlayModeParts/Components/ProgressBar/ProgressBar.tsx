import { useAppSelector } from "Shared/Hooks/redux";
import type { TournamentType } from "Shared/Schemas/TournamentSchema";
import { currentTourNumberPM } from "Store/Selectors/PlayModeSelectors";
import { useMemo } from "react";
import { ProgressBarItem } from "./ProgressBarItem";
import styles from "../../../playmode.module.css";

const getProgressBarItems = (first: number, last: number) => {
	const arr = [];

	for (let i = first; i <= last; i++) {
		arr.push(<ProgressBarItem questionIndex={i} key={i} />);
	}

	return arr;
};

export function ProgressBar({ tournament }: { tournament: TournamentType }) {
	const currentTourNumber = useAppSelector(currentTourNumberPM);

	const { first, last } = useMemo(() => {
		//оставляем только игровые вопросы
		const questions = tournament.questions.filter((v) => v.type !== "outside");

		const first = questions.findIndex((v) => v.tourNumber === currentTourNumber);
		const last = questions.findLastIndex((v) => v.tourNumber === currentTourNumber);
		return { first, last };
	}, [currentTourNumber, tournament.questions]);

	return <div className={styles.progressBar}>{getProgressBarItems(first, last)}</div>;
}
