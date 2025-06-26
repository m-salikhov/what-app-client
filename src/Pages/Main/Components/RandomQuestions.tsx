import { useState } from 'react';
import { Question } from 'Shared/Components/Question/Question';
import { SkeletonQuestion } from 'Shared/Components/Question/SkeletonQuestion';
import { useGetRandomQuery } from 'Store/ToolkitAPIs/tournamentAPI';
import { HiRefresh } from 'react-icons/hi';

export function RandomQuestions() {
  const amountRandomQuestions = 4;

  const [isRandomRefetch, setIsRandomRefetch] = useState(false);

  const { data: randomQuestions = [], refetch, isLoading } = useGetRandomQuery(amountRandomQuestions);

  return (
    <div className='main-content-random'>
      <div className='main-content-refresh'>
        {' '}
        <div className='refresh'>
          {' '}
          <h2>Случайные вопросы</h2>
          <HiRefresh
            size={24}
            className={isRandomRefetch ? 'refresh-arrow' : 'refresh-arrow rotate'}
            onClick={() => {
              refetch();
              setIsRandomRefetch(!isRandomRefetch);
            }}
          />
        </div>
      </div>

      {isLoading && <SkeletonQuestion length={amountRandomQuestions} />}

      {!isLoading && randomQuestions.map((v) => <Question q={v} random={true} key={v.id} />)}
    </div>
  );
}
