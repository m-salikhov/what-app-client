import { QuestionPlane } from "Shared/Components/Question/QuestionPlane";
import { ScrollToTop } from "Shared/Components/ScrollToTop/ScrollToTop";
import { TournamentHeader } from "Shared/Components/TournamentHeader/TournamentHeader";
import { Button } from "Shared/Components/UI/Button/Button";
import type { TournamentType } from "Shared/Schemas/TournamentSchema";
import styles from "../add-tournament-link.module.css";

interface Props {
	tournament: TournamentType;
	onClickEdit: () => void;
	onClickSave: (tournament: TournamentType) => Promise<void>;
}

export function ParsedTournament({ tournament, onClickEdit, onClickSave }: Props) {
	return (
		<>
			<TournamentHeader tournament={tournament} />

			<div className={styles.buttons}>
				<Button title={"Редактировать турнир"} onClick={onClickEdit}></Button>
				<Button title="Добавить в базу" onClick={() => onClickSave(tournament)}></Button>
			</div>
			<div className={styles.parsedTournament}>
				{tournament.questions
					.filter((question) => question.qNumber !== -1)
					.map((question) => (
						<QuestionPlane q={question} key={question.id} />
					))}
			</div>

			<ScrollToTop />
		</>
	);
}
