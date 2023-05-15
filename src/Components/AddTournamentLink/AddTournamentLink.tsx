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
import "./addTournamentLink.scss";

const AddTournamentLink = () => {
  useDocTitle("Добавить турнир");

  const { currentUser } = useAppSelector((state) => state.userReducer);

  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [message, setMessage] = useState("");
  const [edit, setEdit] = useState(false);

  const [t, dispatch] = useReducer(reducer, initTournament);

  const parseLink = () => {
    setLoading(true);
    setIsLoad(false);
    setMessage("");
    _axios
      .post<TournamentType>("/tournaments/createbylink", { link })
      .then((res) => {
        dispatch({ type: "loaded", payload: res.data });
        setIsLoad(true);
        setLoading(false);
      })
      .catch(() => {
        setMessage("Неверная ссылка");
        setLoading(false);
      });
  };

  const addTournament = () => {
    setLoading(true);
    setIsLoad(false);
    setMessage("");
    const tournament: TournamentType = {
      ...t,
      uploaderUuid: currentUser.id,
      uploader: currentUser.username,
    };

    _axios
      .post("/tournaments", tournament)
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
        <Button title="Загрузить" onClick={parseLink} />
      </div>

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
                Дата отыгрыша: <span>{t.date && getDate(t.date)}</span>
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
            {t.questions.map((v) => (
              <QuestionPlane q={v} key={v.answer} />
            ))}
          </div>
        </>
      )}
    </main>
  );
};

export default AddTournamentLink;
