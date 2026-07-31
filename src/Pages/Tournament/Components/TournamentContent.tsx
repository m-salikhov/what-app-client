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

	const { tours, scrollToTour } = useTournamentScroll(questions, questionsNodeListRef);

	return (
		<div>
			<Back />

			<div className={styles.tours}>
				{tours.map((tour, i) => (
					<button type="button" onClick={scrollToTour} key={tour} id={String(i)}>
						{`Тур ${tour}`}
					</button>
				))}
			</div>

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
