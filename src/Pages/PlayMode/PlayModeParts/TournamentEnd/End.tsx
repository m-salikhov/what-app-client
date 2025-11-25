import { Spinner } from "Shared/Components/Spinner/Spinner";
import { Button } from "Shared/Components/UI/Button/Button";
import type { TournamentType } from "Shared/Schemas/TournamentSchema";
import { useNavigate } from "react-router-dom";
import { ResBlock } from "../Components/ResultBlock/ResBlock";
import { useSaveResult } from "./useSaveResult";

export function End({ tournament }: { tournament: TournamentType }) {
	const navigate = useNavigate();

	const { isLoading, isSuccess, error } = useSaveResult(tournament);

	return (
		<div className="end-tournament">
			<ResBlock tournamentId={tournament.id} />

			{isLoading && <Spinner width="30" />}

			{isSuccess && <p>Ваш результат доступен в Профиле</p>}

			{!!error && <p> 'Ошибка при сохранении результата'</p>}

			<Button title="К выбору турнира" onClick={() => navigate("/playmode")} />
		</div>
	);
}
