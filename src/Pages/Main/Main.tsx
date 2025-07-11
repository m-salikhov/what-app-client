import styles from './main.module.css';
import { useNavigate } from 'react-router-dom';
import { LastTournaments } from './Components/LastTournaments';
import { Stats } from './Components/Stats';
import { RandomQuestions } from './Components/RandomQuestions';
import { useDocTitle } from 'Shared/Hooks/useDocTitle';
import { Button } from 'Shared/Components/Button/Button';

export function Main() {
  const navigate = useNavigate();
  useDocTitle('База вопросов');

  return (
    <div className={styles.container}>
      <RandomQuestions />

      <div className={styles.rightSide}>
        <Stats />

        <LastTournaments />

        <div className={styles.banner}>
          <h2>Игровой режим</h2>
          <p>Сыграйте любой из турниров с таймером и ведением счёта </p>
          <Button title='ПОПРОБОВАТЬ' onClick={() => navigate('/playmode')} />
        </div>

        <div className={styles.banner}>
          <h2>WORDLE</h2>
          <p>Отгадайте слово из 5 букв </p>
          <Button title='ПОПРОБОВАТЬ' onClick={() => navigate('/wordle')} />
        </div>
      </div>
    </div>
  );
}
