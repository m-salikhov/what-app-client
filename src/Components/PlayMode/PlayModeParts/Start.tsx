import { getDate } from "../../../Helpers/getDate";
import { Step, playModeSlice } from "../../../Store/reducers/PlayModeSlice";
import { TournamentType } from "../../../Types/tournament";
import { useAppDispatch, useAppSelector } from "../../../Hooks/redux";

const Start = () => {
  const dispatch = useAppDispatch();

  const { t } = useAppSelector((state) => state.playModeReducer);

  return (
    <div className="pm-info">
      <div>
        <p>Вопросов: {t.questionsQuantity}</p>
        <p>Туров: {t.tours}</p>
        <p>Дата: {getDate(t.date)}</p>
      </div>
      <div>
        <p>Редактор(ы):</p>
        {t.editors.map((v, i) => {
          return <p key={i}>{v}</p>;
        })}
      </div>
      <div>
        <button
          onClick={() => dispatch(playModeSlice.actions.setStep("QUESTION"))}
        >
          Начать игру
        </button>
      </div>
    </div>
  );
};

export default Start;
