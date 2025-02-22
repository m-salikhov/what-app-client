import { Button } from 'Shared/Components/Button/Button';
import { QuestionPlane } from 'Shared/Components/Question/QuestionPlane';
import { TournamentHeader } from 'Shared/Components/TournamentHeader/TournamentHeader';
import { TournamentType } from 'Shared/Schemas/TournamentSchema';

interface Props {
  t: TournamentType;
  onClickEdit: () => void;
  handleAddTournament: () => void;
}

export function ParsedTournament({ t, onClickEdit, handleAddTournament }: Props) {
  return (
    <>
      <TournamentHeader tournament={t} />

      <div className='addlink-buttons'>
        <Button title={'Редактировать турнир'} onClick={onClickEdit}></Button>
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
