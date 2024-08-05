import './skeletonQuestion.scss';

function SkeletonQuestion({ count }: { count: number }) {
  const skeletonQuestion = (i: number) => {
    return (
      <div className='sk-q' key={i}>
        <div className='sk-q-header'></div>
        <div className='sk-q-line'></div>
        <div className='sk-q-line'></div>
        <div className='sk-q-line'></div>
        <div className='sk-q-ans'></div>
      </div>
    );
  };

  const arr = [...Array(count).keys()];

  const arrElements = arr.map((v) => {
    return skeletonQuestion(v);
  });

  return <>{arrElements}</>;
}

export default SkeletonQuestion;
