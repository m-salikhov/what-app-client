import { getDate } from "../../../Helpers/getDate";
import { TournamentType } from "../../../Types/tournament";
import { Step } from "../PlayMode";

interface Props {
  t: TournamentType;
  setStep(step: Step): void;
}

const Start = ({ t, setStep }: Props) => {
  return (
    <div className="pm-info">
      <div>
        <p>Вопросов: {t.questionsQuantity}</p>
        <p>Туров: {t.tours}</p>
        <p>Дата: {getDate(t.date)}</p>
      </div>
      <div>
        <p>Редактор(ы):</p>
        {t.editors.map((v) => {
          return <p key={v}>{v}</p>;
        })}
      </div>
      <div>
        <button onClick={() => setStep(Step.Question)}>Начать игру</button>
      </div>
    </div>
  );
};

export default Start;
