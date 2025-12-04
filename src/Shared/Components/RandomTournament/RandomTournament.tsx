import { useAuth } from "Shared/Auth/useAuth";
import { Spinner } from "Shared/Components/Spinner/Spinner";
import { useLazyGetRandomTournamentQuery } from "Store/ToolkitAPIs/tournamentAPI";
import { useState } from "react";
import { GiPerspectiveDiceSixFacesRandom as DiceIcon } from "react-icons/gi";
import { useLocation, useNavigate } from "react-router-dom";
import { linkBuilder } from "../../Helpers/linkBuilder";

export function RandomTournament({ size }: { size?: string }) {
	const { user } = useAuth();
	const navigate = useNavigate();
	const [fetchRandomTournament] = useLazyGetRandomTournamentQuery();
	const [isFetching, setIsFetching] = useState(false);
	const { pathname } = useLocation();

	const handleClick = async () => {
		setIsFetching(true);

		try {
			const tournament = await fetchRandomTournament(user?.id ?? "").unwrap();
			navigate(linkBuilder(tournament.id, pathname));
		} catch (error) {
			setIsFetching(false);
			console.log(error);
		}
	};

	return (
		<>
			{isFetching && <Spinner width={size ? size : "40"} />}
			{!isFetching && (
				<button type="button" title="открыть случайный турнир" onClick={handleClick}>
					<DiceIcon size={size ? size : "40"} cursor="pointer" color="var(--h-color)" />
				</button>
			)}
		</>
	);
}
