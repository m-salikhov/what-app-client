import './mainPage.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { amountRandomQuestions } from '../../constants';
import { useDocTitle } from '../../Hooks/useDocTitle';
import { useGetRandomQuery } from '../../Store/ToolkitAPIs/tournamentAPI';
import Button from '../Elements/Button/Button';
import Question from '../Elements/Question/Question';
import SkeletonQuestion from '../Elements/Question/SkeletonQuestion';
import LastTournaments from './LastTournaments';
import refreshIcon from './refresh.svg';
import Stats from './Stats';

function MainPage() {
  const navigate = useNavigate();
  useDocTitle();

  const [isRandomRefetch, setIsRandomRefetch] = useState(false);

  const {
    data: randomQuestions = [],
    refetch,
    isLoading,
  } = useGetRandomQuery(amountRandomQuestions);

  return (
    <main>
      <div className='main-content'>
        <div className='main-content-random'>
          <div className='main-content-refresh'>
            {' '}
            <div
              className='refresh'
              onClick={() => {
                refetch();
                setIsRandomRefetch(!isRandomRefetch);
              }}
            >
              {' '}
              <h2>Случайные вопросы</h2>
              <div>
                <img
                  className={
                    isRandomRefetch ? 'refresh-arrow' : 'refresh-arrow r'
                  }
                  src={refreshIcon}
                  alt='обновить случайные'
                />
              </div>
            </div>
          </div>

          {isLoading && <SkeletonQuestion count={amountRandomQuestions} />}

          {!isLoading &&
            randomQuestions.map((v) => (
              <Question q={v} random={true} key={v.id} />
            ))}
        </div>
        <div className='main-content-right'>
          <Stats />

          <LastTournaments />

          <div className='main-content-banner'>
            <h2>Игровой режим</h2>
            <p>Сыграйте любой из турниров с таймером и ведением счёта </p>
            <Button title='ПОПРОБОВАТЬ' onClick={() => navigate('/playmode')} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default MainPage;
