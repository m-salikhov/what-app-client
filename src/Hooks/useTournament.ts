import { useState, useEffect } from 'react';
import { initTournament } from '../Helpers/initValues';
import { _axios } from '../Helpers/_axios';
import { TournamentShortType, TournamentType } from '../Types/tournament';
import { UserType } from '../Types/user';
import { routes } from '../constants';

export function useTournamentById(id: string | undefined) {
  const [t, setT] = useState<TournamentType>(initTournament);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    _axios
      .get(`${routes.tournaments}${id}`)
      .then((res) => {
        setT(res.data);
        setLoading(false);
      })
      .catch((e: any) => console.log(e.response.data.message));
  }, [id]);
  return { t, loading };
}

export function useTournamentAllShorts() {
  const [ts, setTs] = useState<TournamentShortType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    _axios
      .get(routes.tournamentsAllShort)
      .then((res) => {
        setTs(res.data);
        setLoading(false);
      })
      .catch((e: any) => console.log(e.response.data.message));
  }, []);
  return { ts, loading };
}

export function useTournamentSave(tournament: TournamentType, user: UserType) {
  const [tourneyId, setTourneyId] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    _axios
      .post(routes.tournaments, {
        ...tournament,
        dateUpload: Date.now(),
        uploaderUuid: user.id,
        uploader: user.username,
      })
      .then((res) => {
        setTourneyId(res.data);
        setLoading(false);
      })
      .catch((e: any) => console.log(e.response.data.message));
  }, [tournament, user.id, user.username]);
  return { tourneyId, loading };
}
