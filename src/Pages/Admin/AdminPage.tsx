import { ExternalLinkText } from "Shared/Components/UI/ExternalLinkText/ExternalLinkText";
import { getDate } from "Shared/Helpers/getDate";
import {
	type ChangeTournamentStatusBody,
	useChangeTournamentStatusMutation,
	useGetDraftsQuery,
} from "Store/ToolkitAPIs/adminAPI";
import styles from "./admin-page.module.css";

export default function AdminPage() {
	const { data, isSuccess } = useGetDraftsQuery(undefined);

	const [changeTournamentStatus] = useChangeTournamentStatusMutation();

	const handlePublish = (data: ChangeTournamentStatusBody) => {
		changeTournamentStatus(data);
	};

	return (
		<div className={styles.container}>
			{isSuccess &&
				data.map((item) => (
					<div className={styles.line} key={item.id}>
						<div className={styles.cell}>{item.id}</div>
						<div className={styles.cell}>{item.title}</div>
						<div className={styles.cell}>{item.questionsQuantity}</div>
						<div className={styles.cell}>{item.tours}</div>
						<div className={styles.cell}>{getDate(item.dateUpload)}</div>
						<div className={styles.cell}>{item.uploader}</div>
						<div className={styles.cell}>{item.uploader}</div>
						<ExternalLinkText href={item.link} text={"источник"} extraClass={styles.cell} />
						<button
							type="button"
							onClick={() => handlePublish({ id: item.id, status: "published" })}
						>
							Опубликовать
						</button>
					</div>
				))}
		</div>
	);
}
