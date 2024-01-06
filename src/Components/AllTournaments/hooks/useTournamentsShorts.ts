import { useState } from 'react';
import { TournamentShortType } from '../../../Types/tournament';
import { useGetTornamentsShortQuery } from '../../../Store/tournamentAPI';

export default function useTournamentsShort() {
  const { data: tsShorts = [], isSuccess } = useGetTornamentsShortQuery(undefined);
  const [tournamentsShorts, setTournamentsShorts] = useState<TournamentShortType[]>([]);
  if (isSuccess && tsShorts.length !== tournamentsShorts.length) {
    const ts = structuredClone(tsShorts);
    setTournamentsShorts([...ts].reverse());
  }
  return { tournamentsShorts, setTournamentsShorts };
}
