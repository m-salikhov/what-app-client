import { useReducer, useState } from "react";
import { _axios } from "../../Helpers/_axios";
import { RotatingLines } from "react-loader-spinner";
import Button from "../Elements/Button/Button";
import QuestionPlane from "../Elements/Question/QuestionPlane";
import { useAppSelector } from "../../Hooks/redux";
import { useDocTitle } from "../../Hooks/useDocTitle";
import { getDate } from "../../Helpers/getDate";
import { initTournament } from "../../Helpers/initValues";
import { TournamentType } from "../../Types/tournament";
import reducer from "./helpers/reducer";
import EditForm from "./EditForm";
import checkTournament from "../../Helpers/checkTournament";
import Instruction from "./Instruction";
import { AxiosErrorNest } from "../../Types/axiosErrorNest";
import "./addTournamentLink.scss";
import { QuestionType } from "../../Types/question";

const AddTournamentLink = () => {
  useDocTitle("Добавить турнир");

  const { currentUser } = useAppSelector((state) => state.userReducer);

  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [message, setMessage] = useState("");
  const [edit, setEdit] = useState(false);
  const [errorsFilling, setErrorsFilling] = useState<string[]>([]);

  const [t, dispatch] = useReducer(reducer, initTournament);

  const parseLink = () => {
    setLoading(true);
    setIsLoad(false);
    setMessage("");
    setErrorsFilling([]);
    _axios
      .post<TournamentType>("/tournaments/createbylink", { link })
      .then((res) => {
        dispatch({ type: "loaded", payload: res.data });
        setIsLoad(true);
        setLoading(false);
      })
      .catch((e: AxiosErrorNest) => {
        setMessage(e.response?.data.message || "Неверная ссылка");
        setLoading(false);
      });
  };

  const addTournament = () => {
    setLoading(true);
    setMessage("");

    setErrorsFilling([]);
    const e = checkTournament(t);
    if (e) {
      setErrorsFilling(e);
      setLoading(false);
      return;
    }

    setIsLoad(false);

    const tournament: TournamentType = {
      ...t,
      uploaderUuid: currentUser.id
        ? currentUser.id
        : "954bd063-43d9-428b-aa3f-a716ad7aca7e",
      uploader: currentUser.username ? currentUser.username : "quest",
    };
    tournament.questions = tournament.questions
      .map((q) => {
        const { id, ...rest } = q;
        return rest as QuestionType;
      })
      .filter((q) => q.qNumber !== -1);

    //Отделить вопросы с qNumber -1
    // const qs = state.questions.filter((q) => q.id !== questionID);

    const link =
      tournament.uploaderUuid === "954bd063-43d9-428b-aa3f-a716ad7aca7e"
        ? "/tournaments/quest"
        : "/tournaments";

    _axios
      .post(link, tournament)
      .then((res) => {
        if (res.status === 201) {
          setMessage("Турнир успешно сохранён в базе");
          setLoading(false);
        }
      })
      .catch(() => {
        setMessage("Ошибка при сохранении");
        setLoading(false);
      });
  };

  if (edit) {
    return <EditForm t={t} dispatch={dispatch} setEdit={setEdit}></EditForm>;
  }

  return (
    <main className="addlink_container">
      <div className="addlink">
        <input
          type="text"
          onChange={(e) => {
            setLink(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              parseLink();
            }
          }}
        />
        <Button title="Открыть" onClick={parseLink} disabled={loading} />
      </div>

      {errorsFilling.length > 0 &&
        errorsFilling.map((e, i) => (
          <p className="addlink__errorsFilling" key={i}>
            {e}
          </p>
        ))}

      {message && <p className="addlink__message">{message}</p>}

      {loading && (
        <div className="spinner">
          {" "}
          <RotatingLines
            strokeColor="#61a199e6"
            strokeWidth="3"
            animationDuration="0.75"
            width="80"
            visible={true}
          />
        </div>
      )}

      {!isLoad && !loading && <Instruction />}

      {isLoad && (
        <>
          <div className="tournament__header">
            <div className="tournament__header-t">
              <h3>
                Название: <span>{t.title}</span>
              </h3>
            </div>
            <div className="tournament__header-m">
              <h3>
                Дата отыгрыша: <span>{t.date ? getDate(t.date) : null}</span>
              </h3>
              <h3>
                Туры: <span>{t.tours}</span>
              </h3>
              <h3>
                Вопросы: <span>{t.questionsQuantity}</span>
              </h3>
            </div>
            <h3>
              Редакция:{" "}
              {t.editors.map((v, i) => (
                <span key={i}>
                  {v}
                  {i < t.editors.length - 1 ? "," : null}{" "}
                </span>
              ))}
            </h3>
          </div>
          <div className="addlink__buttons">
            <Button
              title={edit ? "Закончить редактирование" : "Редактировать турнир"}
              onClick={() => {
                setEdit(!edit);
              }}
            ></Button>
            <Button title="Добавить в базу" onClick={addTournament}></Button>
          </div>
          <div className="tournament__content">
            {t.questions
              .filter((q) => q.qNumber !== -1)
              .map((v) => (
                <QuestionPlane q={v} key={v.id} />
              ))}
          </div>
        </>
      )}
    </main>
  );
};

export default AddTournamentLink;
