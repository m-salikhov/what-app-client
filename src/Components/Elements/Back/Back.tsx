import "./back.scss";
import arrow_left from "./arrow_left.svg";
import { useNavigate } from "react-router-dom";

const Back = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="lastpage" onClick={() => navigate(-1)}>
        {" "}
        <img src={arrow_left} alt="обновить случайные" />
        <p>Назад</p>
      </div>
    </>
  );
};

export default Back;
