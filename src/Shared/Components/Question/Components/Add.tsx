import styles from "../question.module.css";
import { AddImageWithSkeleton } from "./AddImageWithSkeleton";
import type { QuestionType } from "Shared/Schemas/TournamentSchema";

interface Props {
	add: string;
	addMetadata: QuestionType["addMetadata"];
}

export function Add({ add, addMetadata }: Props) {
	const isImage = add.startsWith("http");

	return (
		<div className={styles.razdatkaContainer}>
			<p>Раздаточный материал:</p>
			<div className={styles.razdatka}>
				{isImage && <AddImageWithSkeleton src={add} addMetadata={addMetadata} />}

				{!isImage && <p>{add}</p>}
			</div>
		</div>
	);
}
