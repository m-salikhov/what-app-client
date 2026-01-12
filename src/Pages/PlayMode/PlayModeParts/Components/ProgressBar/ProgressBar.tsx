import { useAppSelector } from "Shared/Hooks/redux";
import { currentTourRangeSelector } from "Store/Selectors/PlayModeSelectors";
import { ProgressBarItem } from "./ProgressBarItem";
import styles from "../../../playmode.module.css";

const getProgressBarItems = (first: number, last: number) => {
	const arr = [];

	for (let i = first; i <= last; i++) {
		arr.push(<ProgressBarItem questionIndex={i} key={i} />);
	}

	return arr;
};

export function ProgressBar() {
	const { first, last } = useAppSelector(currentTourRangeSelector);

	return <div className={styles.progressBar}>{getProgressBarItems(first, last)}</div>;
}
