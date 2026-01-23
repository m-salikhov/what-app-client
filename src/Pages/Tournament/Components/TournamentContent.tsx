import { Question } from "Shared/Components/Question/Question";
import { Back } from "Shared/Components/UI/Back/Back";
import type { TournamentType } from "Shared/Schemas/TournamentSchema";
import { useRef } from "react";
import styles from "../tournament.module.css";
import { useTournamentScroll } from "../Helpers/useTournamentScroll";

export default function TournamentContent({ tournament }: { tournament: TournamentType }) {
	const ref = useRef(null);

	const { toursParagraphs, scrollTournament } = useTournamentScroll(tournament);

	return (
		<div ref={ref}>
			<Back />
			<button
				type="button"
				className={styles.tours}
				onClick={(e) => scrollTournament(e, ref.current)}
			>
				{toursParagraphs}
			</button>

			{tournament.questions.map((q) => (
				<div key={q.id} className={`${styles.question} ${styles["question-enter"]}`}>
					<Question q={q} />
				</div>
			))}
		</div>
	);
}
