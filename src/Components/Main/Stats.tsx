import { useEffect, useState } from "react";
import { _axios } from "../../Helpers/_axios";
import { AxiosError } from "axios";
import { routes } from "../../constants";

const Stats = () => {
  const [stats, setStats] = useState({ tc: 0, qc: 0 });

  useEffect(() => {
    _axios
      .get(routes.tournamentsStats)
      .then((res) => {
        setStats(res.data);
      })
      .catch((e: AxiosError) => console.log(e.message));
  }, []);

  return (
    <div className="main__stats">
      <p>
        Всего турниров <strong>{stats.tc}</strong>, вопросов{" "}
        <strong>{stats.qc}</strong>
      </p>
    </div>
  );
};

export default Stats;
