import { useAppSelector } from '../../../../../../Common/Hooks/redux';

function ProgressBarItem({ questionIndex }: { questionIndex: number }) {
  const { currentQuestionIndex, step } = useAppSelector((state) => state.playModeReducer);

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
