import { useState, useEffect } from "react";
import { initTournament } from "../Helpers/initValues";
import { _axios } from "../Helpers/_axios";
import { TournamentShortType, TournamentType } from "../Types/tournament";

export function useTournamentById(id: string | undefined) {
  const [t, setT] = useState<TournamentType>(initTournament);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    _axios
      .get(`/tournaments/${id}`)
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
      .get(`/tournaments/allshort`)
      .then((res) => {
        setTs(res.data);
        setLoading(false);
      })
      .catch((e: any) => console.log(e.response.data.message));
  }, []);
  return { ts, loading };
}
