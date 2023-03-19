import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { _axios } from "../../Helpers/_axios";
import { QuestionType } from "../../Types/question";
import Question from "../Elements/Question/Question";
import SkeletonQuestion from "../Elements/Question/SkeletonQuestion";
import LastTournaments from "./LastTournaments";
import Button from "../Elements/Button/Button";
import refreshIcon from "./refresh.svg";
import "./main.scss";
import { useDocTile } from "../../Hooks/useDocTitle";

const Main = () => {
  const navigate = useNavigate();

  const [newRandom, setNewRandom] = useState(0);
  const [randQuestions, setRandQuestions] = useState<QuestionType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    _axios
      .get("/tournaments/random/4")
      .then((res) => {
        setRandQuestions(res.data);
        setLoading(false);
      })
      .catch((e: AxiosError) => console.log(e.message));
  }, [newRandom]);
  useDocTile();

  return (
    <main>
      <div className="main-content">
        <div className="main-content__random">
          <div className="main-content__refresh">
            {" "}
            <div
              className="refresh"
              onClick={() => {
                setLoading(true);
                setNewRandom((p) => ++p);
              }}
            >
              {" "}
              <h2>Случайные вопросы</h2>
              <div>
                <img
                  className={
                    newRandom % 2 ? "refresh__arrow" : "refresh__arrow r"
                  }
                  src={refreshIcon}
                  alt="обновить случайные"
                />
              </div>
            </div>
          </div>
          {loading && <SkeletonQuestion count={4} />}
          {!loading &&
            randQuestions.map((v) => (
              <Question q={v} random={true} key={v.id} />
            ))}
        </div>
        <div className="main-content__right">
          {" "}
          <div className="main-content__tournaments">
            <LastTournaments />
          </div>
          <div className="main-content__banner">
            <h2>Игровой режим</h2>
            <p>Сыграйте любой из турниров с таймером и ведением счёта </p>
            <Button title="ПОПРОБОВАТЬ" onClick={() => navigate("/playmode")} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;
