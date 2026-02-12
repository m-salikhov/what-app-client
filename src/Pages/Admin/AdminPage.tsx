import { ExternalLinkText } from "Shared/Components/UI/ExternalLinkText/ExternalLinkText";
import { formatDate } from "Shared/Helpers/formatDate";
import {
	type ChangeTournamentStatusBody,
	useChangeTournamentStatusMutation,
	useGetDraftsQuery,
} from "Store/ToolkitAPIs/adminAPI";
import styles from "./admin-page.module.css";
import { Spinner } from "Shared/Components/Spinner/Spinner";

export default function AdminPage() {
	const { data, isSuccess, error, isLoading } = useGetDraftsQuery(undefined);

	const [changeTournamentStatus] = useChangeTournamentStatusMutation();

	const handlePublish = (data: ChangeTournamentStatusBody) => {
		changeTournamentStatus(data);
	};

	if (error) return <h2>Ошибка при получении турниров</h2>;
	if (isLoading) return <Spinner />;
	if (!isSuccess || !data) return null;

	return (
		<div className={styles.container}>
			{data.length === 0 && <h2>Нет черновиков</h2>}

			<div className={styles.line}>
				<div className={styles.cell}>id</div>
				<div className={styles.cell}>Название</div>
				<div className={styles.cell}>Вопросов</div>
				<div className={styles.cell}>Туров</div>
				<div className={styles.cell}>Загружен</div>
				<div className={styles.cell}>Загрузил</div>
			</div>

			{data.map((item) => (
				<div className={styles.line} key={item.id}>
					<div className={styles.cell}>{item.id}</div>
					<ExternalLinkText href={item.link} text={item.title} extraClass={styles.cell} />
					<div className={styles.cell}>{item.questionsQuantity}</div>
					<div className={styles.cell}>{item.tours}</div>
					<div className={styles.cell}>{formatDate(item.dateUpload)}</div>
					<div className={styles.cell}>{item.uploader}</div>
					<button type="button" onClick={() => handlePublish({ id: item.id, status: "published" })}>
						Опубликовать
					</button>
				</div>
			))}
		</div>
	);
}
