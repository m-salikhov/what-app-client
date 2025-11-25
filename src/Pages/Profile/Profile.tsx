import { useAuth } from "Shared/Auth/useAuth";
import { getDate } from "Shared/Helpers/getDate";
import { setDocTitle } from "Shared/Helpers/setDocTitle";
import { ChangePass } from "./Components/ChangePass/ChangePass";
import { ProfileContent } from "./Components/ProfileContent";
import styles from "./profile.module.css";

export default function Profile() {
	setDocTitle("Профиль");

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
						<p>{getDate(user.date)}</p>
					</div>
					<div>
						<p>Статус</p>
						<p>{user.role}</p>
					</div>
				</section>

				<ChangePass />

				<ProfileContent userId={user.id} />
			</div>
		</div>
	);
}
