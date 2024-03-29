import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Question from '../Elements/Question/Question';
import SkeletonQuestion from '../Elements/Question/SkeletonQuestion';
import LastTournaments from './LastTournaments';
import Button from '../Elements/Button/Button';
import refreshIcon from './refresh.svg';
import './main.scss';
import { useDocTitle } from '../../Hooks/useDocTitle';
import Stats from './Stats';
import { amountRandomQuestions } from '../../constants';
import { useGetRandomQuery } from '../../Store/tournamentAPI';

const Main = () => {
  const navigate = useNavigate();
  useDocTitle();

  const [isRandomRefetch, setIsRandomRefetch] = useState(false);

  const { data: randomQuestions = [], refetch, isLoading } = useGetRandomQuery(amountRandomQuestions);

  return (
    <main>
      <div className='main-content'>
        <div className='main-content__random'>
          <div className='main-content__refresh'>
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
                  className={isRandomRefetch ? 'refresh__arrow' : 'refresh__arrow r'}
                  src={refreshIcon}
                  alt='обновить случайные'
                />
              </div>
            </div>
          </div>

          {isLoading && <SkeletonQuestion count={amountRandomQuestions} />}
          {!isLoading && randomQuestions.map((v) => <Question q={v} random={true} key={v.id} />)}
        </div>
        <div className='main-content__right'>
          {' '}
          <Stats />
          <div className='main-content__tournaments'>
            <LastTournaments />
          </div>
          <div className='main-content__banner'>
            <h2>Игровой режим</h2>
            <p>Сыграйте любой из турниров с таймером и ведением счёта </p>
            <Button title='ПОПРОБОВАТЬ' onClick={() => navigate('/playmode')} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;
