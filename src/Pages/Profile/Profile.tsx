import { useAuth } from "Shared/Auth/useAuth";
import { Button } from "Shared/Components/UI/Button/Button";
import { formatDate } from "Shared/Helpers/formatDate";
import { setDocTitle } from "Shared/Helpers/setDocTitle";
import { useNavigate } from "react-router-dom";
import { ChangePass } from "./Components/ChangePass/ChangePass";
import { ProfileContent } from "./Components/ProfileContent";
import styles from "./profile.module.css";

export default function Profile() {
	setDocTitle("Профиль");
	const navigate = useNavigate();

	const { user } = useAuth();

	if (!user) return null;

	return (
		<div className={styles.container}>
			<div className={styles.profile}>
				<section className={styles.userInfo}>
					<div>
						<p>Имя</p>
						<p>{user.username}</p>
					</div>
					<div>
						<p>Почта</p>
						<p>{user.email}</p>
					</div>
					<div>
						<p>Зарегистрирован</p>
						<p>{formatDate(user.date)}</p>
					</div>
					<div>
						<p>Статус</p>
						<p>{user.role}</p>
					</div>
				</section>

				<ChangePass />

				{user.role === "admin" && (
					<Button onClick={() => navigate("/admin")} size="tiny" variant="secondary">
						панель администратора
					</Button>
				)}

				<ProfileContent userId={user.id} />
			</div>
		</div>
	);
}
