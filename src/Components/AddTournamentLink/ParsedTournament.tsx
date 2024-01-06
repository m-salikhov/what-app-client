import { getDate } from '../../Helpers/getDate';
import { TournamentType } from '../../Types/tournament';
import Button from '../Elements/Button/Button';
import QuestionPlane from '../Elements/Question/QuestionPlane';

interface Props {
  t: TournamentType;
  setEdit: (callback: (prev: boolean) => boolean) => void;
  setErrorsFilling: (errors: null) => void;
  handleAddTournament: () => void;
}

const ParsedTournament = ({ t, setEdit, setErrorsFilling, handleAddTournament }: Props) => {
  return (
    <>
      <div className='tournament__header'>
        <div className='tournament__header-t'>
          <h3>
            Название: <span>{t.title}</span>
          </h3>
        </div>
        <div className='tournament__header-m'>
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
          Редакция:{' '}
          {t.editors.map((v, i) => (
            <span key={i}>
              {v}
              {i < t.editors.length - 1 ? ',' : null}{' '}
            </span>
          ))}
        </h3>
      </div>
      <div className='addlink__buttons'>
        <Button
          title={'Редактировать турнир'}
          onClick={() => {
            setEdit((prev) => !prev);
            setErrorsFilling(null);
          }}
        ></Button>
        <Button title='Добавить в базу' onClick={handleAddTournament}></Button>
      </div>
      <div className='tournament__content'>
        {t.questions
          .filter((q) => q.qNumber !== -1)
          .map((v) => (
            <QuestionPlane q={v} key={v.id} />
          ))}
      </div>
    </>
  );
};

export default ParsedTournament;
