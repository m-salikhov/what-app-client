import { useState, useEffect } from "react";
import { initTournament } from "../Helpers/initValues";
import { _axios } from "../Helpers/_axios";
import { TournamentType } from "../Types/tournament";

export function useTournamentById(id: string | undefined) {
  const [t, setT] = useState<TournamentType>(initTournament);
  useEffect(() => {
    _axios
      .get(`/tournaments/${id}`)
      .then((res) => {
        setT(res.data);
      })
      .catch((e: any) => console.log(e.response.data.message));
  }, [id]);
  return t;
}
