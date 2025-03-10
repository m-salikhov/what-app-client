import './skeletonQuestion.css';

export function SkeletonQuestion({ length }: { length: number }) {
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

  const arr = [...Array.from({ length }).keys()];

  const arrElements = arr.map((v) => {
    return skeletonQuestion(v);
  });

  return <>{arrElements}</>;
}
