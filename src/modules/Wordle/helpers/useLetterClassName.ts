import { useAppSelector } from '../../../Common/Hooks/redux';
// import { LetterState } from '../../../Store/Slices/WordleSlice';

export default function useLetterClassName(index: number) {
  const { currentLetterNumber, letterState, wrongWordFlag } = useAppSelector((state) => state.wordleReducer);

  let className = '';

  if (index === currentLetterNumber - 1) {
    className = 'current-letter';
  }

  if (letterState[index]) {
    className = letterState[index].className + ' letter';
  }

  if (wrongWordFlag && index > currentLetterNumber - 6 && index < currentLetterNumber) {
    className = className + ' wrong-word';
  }

  return className ? className.trim() : undefined;
}
