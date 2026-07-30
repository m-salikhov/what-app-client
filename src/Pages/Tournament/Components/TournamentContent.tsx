import { Question } from "Shared/Components/Question/Question";
import { Back } from "Shared/Components/UI/Back/Back";
import type { TournamentType } from "Shared/Schemas/TournamentSchema";
import { useRef } from "react";
import styles from "../tournament.module.css";
import { useTournamentScroll } from "../Helpers/useTournamentScroll";

export default function TournamentContent({
	questions,
}: {
	questions: TournamentType["questions"];
}) {
	const questionsNodeListRef = useRef<HTMLDivElement | null>(null);

	const { tourNavigation } = useTournamentScroll(questions, questionsNodeListRef);

	return (
		<div>
			<Back />
			<div className={styles.tours}>{tourNavigation}</div>

			<div className={styles.questions} ref={questionsNodeListRef}>
				{questions.map((q, i) => (
					<div
						key={q.id}
						className={`${styles.question} ${i <= 3 ? styles["question-enter"] : ""}`}
					>
						<Question q={q} />
					</div>
				))}
			</div>
		</div>
	);
}
