import { useAuth } from "Shared/Auth/useAuth";
import { Spinner } from "Shared/Components/Spinner/Spinner";
import { useLazyGetRandomTournamentQuery } from "Store/ToolkitAPIs/tournamentAPI";
import { useState } from "react";
import { GiPerspectiveDiceSixFacesRandom as DiceIcon } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

export function RandomTournament({ size }: { size: string }) {
	const { user } = useAuth();
	const navigate = useNavigate();
	const [fetchRandomTournament] = useLazyGetRandomTournamentQuery();
	const [isFetching, setIsFetching] = useState(false);

	const handleClick = async () => {
		setIsFetching(true);

		try {
			const tournament = await fetchRandomTournament(user?.id ?? "").unwrap();
			navigate(`/tournament/${tournament.id}`);
		} catch (error) {
			setIsFetching(false);
			console.log(error);
		}
	};

	return (
		<>
			{isFetching && <Spinner width={size} height={size} />}
			{!isFetching && (
				<button
					type="button"
					title="открыть случайный турнир"
					onClick={handleClick}
					style={{ height: `${size}px`, width: `${size}px` }}
				>
					<DiceIcon size={size ? size : "40"} cursor="pointer" color="var(--h-color)" />
				</button>
			)}
		</>
	);
}
