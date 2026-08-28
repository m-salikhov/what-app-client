import { formatDate } from "Shared/Helpers/formatDate";
import type { TournamentType } from "Shared/Schemas/TournamentSchema";
import { ExternalLinkText } from "../UI/ExternalLinkText/ExternalLinkText";
import styles from "./tournament-header.module.css";

interface Props {
	tournament: TournamentType;
}

export function TournamentHeader({ tournament }: Props) {
	return (
		<div className={styles.header}>
			<div className={styles.title}>
				<h2>{tournament.title}</h2>
				<ExternalLinkText href={tournament.link} text={"источник"} />
			</div>

			<div className={styles.info}>
				<p>
					<span>Дата отыгрыша:</span> {tournament.date ? formatDate(tournament.date) : "не указана"}
				</p>
				<p>
					<span>Туры:</span> {tournament.tours}
				</p>
				<p>
					<span>Вопросы:</span> {tournament.questionsQuantity}
				</p>
				<p>
					<span>Сложность</span>: {tournament.difficulty ? tournament.difficulty : "не указана"}
				</p>
				<p>
					<span>Редакция:</span> {tournament.editors.map((v) => v.name).join(", ")}
				</p>
			</div>
		</div>
	);
}
