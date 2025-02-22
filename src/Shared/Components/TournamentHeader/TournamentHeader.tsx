import './tournamentHeader.css';
import { getDate } from 'Shared/Helpers/getDate';
import { TournamentType } from 'Shared/Schemas/TournamentSchema';

interface Props {
  tournament: TournamentType;
}

export function TournamentHeader({ tournament }: Props) {
  return (
    <div className='tournament-header'>
      <div className='tournament-header-t'>
        <h2>{tournament.title}</h2>
      </div>

      <div className='tournament-header-m'>
        <h3>
          Дата отыгрыша: <span>{tournament.date ? getDate(tournament.date) : null}</span>
        </h3>
        <h3>
          Туры: <span>{tournament.tours}</span>
        </h3>
        <h3>
          Вопросы: <span>{tournament.questionsQuantity}</span>
        </h3>
      </div>
      <h3>
        Редакция: <span>{tournament.editors.map((v) => v.name).join(', ')}</span>
      </h3>
    </div>
  );
}
