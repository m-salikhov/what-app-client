import { useEffect, useState } from "react";
import { _axios } from "../../Helpers/_axios";
import { QuestionType } from "../../Types/question";
import Question from "../Elements/Question/Question";
import SkeletonQuestion from "../Elements/Question/SkeletonQuestion";
import LastTournaments from "./LastTournaments";
import "./main.scss";
import refreshIcon from "./refresh.svg";

const Main = () => {
  const [message, setMessage] = useState("");
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
      .catch((e: any) => setMessage(e.response.data.message));
  }, [newRandom]);

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
        <div className="main-content__tournaments">
          <LastTournaments />
        </div>
      </div>
    </main>
  );
};

export default Main;
