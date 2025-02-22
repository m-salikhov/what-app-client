import { useEffect, useState } from 'react';
import { TournamentShortType } from 'Shared/Schemas/TournamentSchema';
import { useGetTournamentsAllShortQuery } from 'Store/ToolkitAPIs/tournamentAPI';

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
