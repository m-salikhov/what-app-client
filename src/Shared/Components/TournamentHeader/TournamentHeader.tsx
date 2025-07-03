import styles from './tournament-header.module.css';
import { getDate } from 'Shared/Helpers/getDate';
import { TournamentType } from 'Shared/Schemas/TournamentSchema';
import { ExternalLinkText } from '../Text/ExternalLinkText/ExternalLinkText';

interface Props {
  tournament: TournamentType;
}

export function TournamentHeader({ tournament }: Props) {
  return (
    <div className={styles.header}>
      <div className={styles.title}>
        <h2>{tournament.title}</h2>
        <ExternalLinkText href={tournament.link} text={'источник'} />
      </div>

      <div className={styles.info}>
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
