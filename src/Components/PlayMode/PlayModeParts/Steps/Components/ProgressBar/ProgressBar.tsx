import { useMemo } from 'react';
import { useAppSelector } from '../../../../../../Hooks/redux';
import { StepProps } from '../../../Types/playmodeTypes';
import ProgressBarItem from './ProgressBarItem';

export const getProgressBarItems = (first: number, last: number) => {
  const arr = [];

  for (let i = first; i <= last; i++) {
    arr.push(<ProgressBarItem questionIndex={i} key={i} />);
  }

  return arr;
};

export default function ProgressBar({ tournament }: StepProps) {
  const { currentTourNumber } = useAppSelector(
    (state) => state.playModeReducer
  );

  const firstTourQuestionIndex = useMemo(
    () =>
      tournament.questions.findIndex((v) => v.tourNumber === currentTourNumber),
    [currentTourNumber]
  );
  const lastTourQuestionIndex = useMemo(
    () =>
      tournament.questions.findLastIndex(
        (v) => v.tourNumber === currentTourNumber
      ),
    [currentTourNumber]
  );

  return (
    <div className='progress-bar'>
      {getProgressBarItems(firstTourQuestionIndex, lastTourQuestionIndex)}
    </div>
  );
}
