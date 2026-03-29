import { Link } from "react-router-dom";
import styles from "./admin-page.module.css";
import Drafts from "./Components/Drafts/Drafts";

export default function AdminPage() {
	return (
		<div className={styles.container}>
			<Drafts />
			<Link to="/admin/edit-tournaments">Редактирование турниров</Link>
		</div>
	);
}
