import { useMemo } from 'react';
import ProgressBarItem from './ProgressBarItem';
import { TournamentType } from 'Common/Types/tournament';
import { useAppSelector } from 'Common/Hooks/redux';
import { currentTourNumberPM } from 'Store/Selectors/PlayModeSelectors';

export const getProgressBarItems = (first: number, last: number) => {
  const arr = [];

  for (let i = first; i <= last; i++) {
    arr.push(<ProgressBarItem questionIndex={i} key={i} />);
  }

  return arr;
};

export default function ProgressBar({ tournament }: { tournament: TournamentType }) {
  const currentTourNumber = useAppSelector(currentTourNumberPM);

  const firstTourQuestionIndex = useMemo(
    () => tournament.questions.findIndex((v) => v.tourNumber === currentTourNumber),
    [currentTourNumber]
  );
  const lastTourQuestionIndex = useMemo(
    () => tournament.questions.findLastIndex((v) => v.tourNumber === currentTourNumber),
    [currentTourNumber]
  );

  return <div className='progress-bar'>{getProgressBarItems(firstTourQuestionIndex, lastTourQuestionIndex)}</div>;
}
