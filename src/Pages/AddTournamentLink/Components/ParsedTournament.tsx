import { Button } from 'Shared/Components/Button/Button';
import { QuestionPlane } from 'Shared/Components/Question/QuestionPlane';
import { TournamentHeader } from 'Shared/Components/TournamentHeader/TournamentHeader';
import { TournamentType } from 'Shared/Schemas/TournamentSchema';

interface Props {
  t: TournamentType;
  setEdit: (callback: (prev: boolean) => boolean) => void;
  setErrorsFilling: (errors: null) => void;
  handleAddTournament: () => void;
}

export function ParsedTournament({ t, setEdit, setErrorsFilling, handleAddTournament }: Props) {
  return (
    <>
      <TournamentHeader tournament={t} />

      <div className='addlink-buttons'>
        <Button
          title={'Редактировать турнир'}
          onClick={() => {
            setEdit((prev) => !prev);
            setErrorsFilling(null);
          }}
        ></Button>
        <Button title='Добавить в базу' onClick={handleAddTournament}></Button>
      </div>
      <div className='tournament-content'>
        {t.questions
          .filter((q) => q.qNumber !== -1)
          .map((v) => (
            <QuestionPlane q={v} key={v.id} />
          ))}
      </div>
    </>
  );
}
