import { useNavigate } from "react-router-dom";
import arrow_left from "./arrow_left.svg";
import styles from "./back.module.css";

export function Back() {
	const navigate = useNavigate();
	return (
		<button type="button" className={styles.previousPage} onClick={() => navigate(-1)}>
			{" "}
			<img src={arrow_left} alt="обновить случайные" />
			<p>Назад</p>
		</button>
	);
}
