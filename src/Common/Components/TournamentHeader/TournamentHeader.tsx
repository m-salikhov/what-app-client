import { getDate } from 'Common/Helpers/getDate';
import { TournamentType } from 'Common/Types/tournament';
import './tournamentHeader.css';

interface Props {
  tournament: TournamentType;
}

export default function TournamentHeader({ tournament }: Props) {
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
        Редакция: <span>{tournament.editors.join(', ')}</span>
      </h3>
    </div>
  );
}
