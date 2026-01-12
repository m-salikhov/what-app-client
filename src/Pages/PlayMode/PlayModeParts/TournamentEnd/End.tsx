import { Spinner } from "Shared/Components/Spinner/Spinner";
import { Button } from "Shared/Components/UI/Button/Button";
import { useNavigate } from "react-router-dom";
import styles from "../../playmode.module.css";
import { ResBlock } from "../Components/ResultBlock/ResBlock";
import { useSaveResult } from "./useSaveResult";

export function End() {
	const navigate = useNavigate();

	const { isLoading, isSuccess, error } = useSaveResult();

	return (
		<div className={styles.end}>
			<ResBlock />

			<div className={styles.endButton}>
				<Button onClick={() => navigate("/playmode")}> К выбору турнира</Button>
			</div>

			{isLoading && <Spinner width="30" />}

			{isSuccess && <p className={styles.endText}>Ваш результат доступен в Профиле</p>}

			{!!error && <p className={styles.endText}> Ошибка при сохранении результата</p>}
		</div>
	);
}
