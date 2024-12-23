import { useState } from 'react';
import { TournamentShortType } from '../../../Common/Types/tournament';
import { useGetTournamentsShortQuery } from '../../../Store/ToolkitAPIs/tournamentAPI';

export default function useTournamentsShort() {
  const { data: tsShorts = [], isSuccess, isLoading, error } = useGetTournamentsShortQuery(undefined);

  const [tournamentsShorts, setTournamentsShorts] = useState<TournamentShortType[]>([]);

  if (isSuccess && tsShorts.length !== tournamentsShorts.length) {
    const ts = structuredClone(tsShorts);
    setTournamentsShorts([...ts].reverse());
  }

  return {
    tournamentsShorts,
    setTournamentsShorts,
    isLoading,
    isSuccess,
    error,
  };
}
