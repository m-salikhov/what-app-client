import styles from "../../playmode.module.css";
import { Button } from "Shared/Components/UI/Button/Button";
import { useAppDispatch } from "Shared/Hooks/redux";
import { playModeActions } from "Store/Slices/PlayModeSlice";
import { ResBlock } from "../Components/ResultBlock/ResBlock";

export function TourEnd() {
	const dispatch = useAppDispatch();

	const onClick = () => {
		dispatch(playModeActions.setStep());
	};

	return (
		<div className={styles.tourEnd}>
			<div className={styles.tourEndButton}>
				<Button onClick={onClick}> Следующий тур</Button>
			</div>
			<ResBlock />
		</div>
	);
}
