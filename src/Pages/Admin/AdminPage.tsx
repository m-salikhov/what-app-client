import { Link } from "react-router-dom";
import styles from "./admin-page.module.css";
import Drafts from "./Components/Drafts/Drafts";

export default function AdminPage() {
	return (
		<main className={styles.container}>
			<Drafts />
			<div className={styles.editContainer}>
				<Link to="/admin/edit-tournaments" className={styles.editLink}>
					Редактирование турниров
				</Link>
			</div>
		</main>
	);
}
