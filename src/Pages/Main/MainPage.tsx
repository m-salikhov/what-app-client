import './mainPage.css';
import { useNavigate } from 'react-router-dom';
import LastTournaments from './Components/LastTournaments';
import Stats from './Components/Stats';
import RandomQuestions from './Components/RandomQuestions';
import { useDocTitle } from 'Shared/Hooks/useDocTitle';
import Button from 'Shared/Components/Button/Button';

function MainPage() {
  const navigate = useNavigate();
  useDocTitle();

  return (
    <div className='main-content'>
      <RandomQuestions />

      <div className='main-content-right'>
        <Stats />

        <LastTournaments />

        <div className='main-content-banner'>
          <h2>Игровой режим</h2>
          <p>Сыграйте любой из турниров с таймером и ведением счёта </p>
          <Button title='ПОПРОБОВАТЬ' onClick={() => navigate('/playmode')} />
        </div>

        <div className='main-content-banner'>
          <h2>WORDLE</h2>
          <p>Отгадайте слово из 5 букв </p>
          <Button title='ПОПРОБОВАТЬ' onClick={() => navigate('/wordle')} />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
