import { useMemo } from 'react';
import { ProgressBarItem } from './ProgressBarItem';
import { useAppSelector } from 'Shared/Hooks/redux';
import { currentTourNumberPM } from 'Store/Selectors/PlayModeSelectors';
import { TournamentType } from 'Shared/Schemas/TournamentSchema';

export const getProgressBarItems = (first: number, last: number) => {
  const arr = [];

  for (let i = first; i <= last; i++) {
    arr.push(<ProgressBarItem questionIndex={i} key={i} />);
  }

  return arr;
};

export function ProgressBar({ tournament }: { tournament: TournamentType }) {
  const currentTourNumber = useAppSelector(currentTourNumberPM);

  const { first, last } = useMemo(() => {
    const first = tournament.questions.findIndex((v) => v.tourNumber === currentTourNumber);
    const last = tournament.questions.findLastIndex((v) => v.tourNumber === currentTourNumber);
    return { first, last };
  }, [currentTourNumber]);

  return <div className='progress-bar'>{getProgressBarItems(first, last)}</div>;
}
