import { useState } from 'react';
import { useGetRandomQuery } from '../../../Store/ToolkitAPIs/tournamentAPI';
import Question from '../../Elements/Question/Question';
import SkeletonQuestion from '../../Elements/Question/SkeletonQuestion';
import refreshIcon from '../assets/refresh.svg';

export default function RandomQuestions() {
  const amountRandomQuestions = 4;

  const [isRandomRefetch, setIsRandomRefetch] = useState(false);

  const { data: randomQuestions = [], refetch, isLoading } = useGetRandomQuery(amountRandomQuestions);

  return (
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
              className={isRandomRefetch ? 'refresh-arrow' : 'refresh-arrow r'}
              src={refreshIcon}
              alt='обновить случайные'
            />
          </div>
        </div>
      </div>

      {isLoading && <SkeletonQuestion count={amountRandomQuestions} />}

      {!isLoading && randomQuestions.map((v) => <Question q={v} random={true} key={v.id} />)}
    </div>
  );
}
