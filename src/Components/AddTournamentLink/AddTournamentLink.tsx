import { useReducer, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import Button from "../Elements/Button/Button";
import QuestionPlane from "../Elements/Question/QuestionPlane";
import { useAppSelector } from "../../Hooks/redux";
import { useDocTitle } from "../../Hooks/useDocTitle";
import { getDate } from "../../Helpers/getDate";
import { initTournament } from "../../Helpers/initValues";
import reducer from "./helpers/reducer";
import EditForm from "./EditForm";
import checkTournament from "../../Helpers/checkTournament";
import Instruction from "./Instruction";
import {
  useAddTournamentMutation,
  useParseLinkMutation,
} from "../../Store/tournamentAPI";
import { ErrorServer } from "../../Types/errorServer";
import removeQuestionsID from "./helpers/removeQuestionsID";
import { guest } from "../../constants";
import "./addTournamentLink.scss";

const AddTournamentLink = () => {
  useDocTitle("Добавить турнир");

  const { currentUser } = useAppSelector((state) => state.userReducer);

  const [link, setLink] = useState("");
  const [showT, setShowT] = useState(false);
  const [message, setMessage] = useState("");
  const [edit, setEdit] = useState(false);
  const [errorsFilling, setErrorsFilling] = useState<string[]>([]);

  const [t, dispatch] = useReducer(reducer, initTournament);

  const [addT, { isLoading: isLoadingAdd, error: errorAdd }] =
    useAddTournamentMutation();
  const [parseT, { isLoading, error: errorParse }] = useParseLinkMutation();

  const handleAddTournament = async () => {
    setMessage("");
    setErrorsFilling([]);

    const errors = checkTournament(t);
    if (errors) {
      setErrorsFilling(errors);
      return;
    }
    await addT({
      ...removeQuestionsID(t),
      uploaderUuid: currentUser.id ? currentUser.id : guest.id,
      uploader: currentUser.username ? currentUser.username : guest.userName,
    })
      // .unwrap()
      .then(() => {
        setMessage("Турнир успешно сохранён в базе");
        setShowT(false);
      });
    // .catch(() => setMessage("Ошибка при сохранении"));
  };

  const handleParseLink = async () => {
    setMessage("");
    setErrorsFilling([]);
    setShowT(false);

    await parseT({ link })
      .unwrap()
      .then((data) => {
        dispatch({ type: "loaded", payload: data });
        setShowT(true);
      });
    // .catch((e: ErrorServer) => {
    //   setMessage(e.data.message || "Ошибка");
    // });
  };

  if (edit) {
    return <EditForm t={t} dispatch={dispatch} setEdit={setEdit}></EditForm>;
  }

  const handleError = (err: typeof errorParse) => {
    const e = err as ErrorServer;
    return e.data.message;
  };

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
              handleParseLink();
            }
          }}
        />
        <Button
          title="Открыть"
          onClick={handleParseLink}
          disabled={isLoadingAdd || isLoading}
        />
      </div>

      {errorsFilling.length > 0 &&
        errorsFilling.map((e, i) => (
          <p className="addlink__errorsFilling" key={i}>
            {e}
          </p>
        ))}

      {message && <p className="addlink__message">{message}</p>}
      {(errorParse || errorAdd) && (
        <p className="addlink__message">
          {handleError(errorParse || errorAdd)}
        </p>
      )}

      {(isLoading || isLoadingAdd) && (
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

      {!showT && <Instruction />}

      {showT && (
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
            <Button
              title="Добавить в базу"
              onClick={handleAddTournament}
            ></Button>
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
