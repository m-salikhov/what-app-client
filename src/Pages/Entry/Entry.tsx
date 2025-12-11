import { setDocTitle } from "Shared/Helpers/setDocTitle";
import { useState } from "react";
import LoginForm from "./Components/Forms/LoginForm";
import { RegistrationForm } from "./Components/Forms/RegForm";
import styles from "./entry.module.css";
import entryImg from "./entry_img.svg";

function Entry() {
	setDocTitle("Вход");

	const [showForm, setShowForm] = useState<"login" | "registration">("login");

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<div className={styles.entry}>
					<div className={styles.img}>
						<img src={entryImg} alt="логотип на форме входа\регистрации" />
					</div>

					{showForm === "login" && <LoginForm />}
					{showForm === "registration" && <RegistrationForm />}

					<button
						type="button"
						className={styles.switch}
						onClick={() => setShowForm(showForm === "login" ? "registration" : "login")}
					>
						{showForm === "login" ? "Нет аккаунта?" : "Есть аккаунт?"}
					</button>
				</div>
			</div>
		</div>
	);
}

export default Entry;
