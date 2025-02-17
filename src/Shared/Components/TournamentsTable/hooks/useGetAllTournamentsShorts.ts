import { useEffect, useState } from 'react';
import { useGetTournamentsAllShortQuery } from 'Store/ToolkitAPIs/tournamentAPI';
import { TournamentShortType } from 'Shared/Types/tournament';

export function useGetAllTournamentsShorts() {
  const { data = [], isSuccess, error, isLoading } = useGetTournamentsAllShortQuery(undefined);
  const [tournaments, setTournaments] = useState<TournamentShortType[]>([]);

  useEffect(() => {
    if (isSuccess) {
      const ts = structuredClone(data);
      setTournaments(ts);
    }
  }, [isSuccess]);

  return { tournaments, error, isLoading, setTournaments, isSuccess };
}
