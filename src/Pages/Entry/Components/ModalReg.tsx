import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import styles from "../entry.module.css";

export function ModalReg() {
	const [counter, setCounter] = useState(5);

	useEffect(() => {
		const timer = setInterval(() => setCounter(counter - 1), 1000);
		return () => clearInterval(timer);
	}, [counter]);

	if (counter === 0) {
		return <Navigate to="/" />;
	}
	return (
		<>
			{" "}
			<div className={styles.modal}>
				{" "}
				<div className={styles.modalText}>
					<h2>Вы успешно зарегистрировались</h2>
					<p>Через несколько секунд откроется главная {counter} </p>
				</div>{" "}
			</div>
		</>
	);
}
