import { useAppSelector } from 'Common/Hooks/redux';
import { currentQuestionIndexPM, stepPM } from 'Store/Selectors/PlayModeSelectors';

function ProgressBarItem({ questionIndex }: { questionIndex: number }) {
  const currentQuestionIndex = useAppSelector(currentQuestionIndexPM);
  const step = useAppSelector(stepPM);

  return (
    <div
      className={
        questionIndex < currentQuestionIndex || step === 'END_OF_TOUR' ? 'progress-bar-item fill' : 'progress-bar-item'
      }
    >
      <p className='progress-bar-item-number'>{questionIndex + 1}</p>
    </div>
  );
}

export default ProgressBarItem;
