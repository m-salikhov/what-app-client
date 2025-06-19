import { useAppSelector } from 'Shared/Hooks/redux';
import {
  currentLetterNumberSelector,
  letterStateSelector,
  wrongWordFlagSelector,
} from 'Store/Selectors/WordleSelectors';

export function useLetterClassName(index: number) {
  const letterState = useAppSelector(letterStateSelector);
  const currentLetterNumber = useAppSelector(currentLetterNumberSelector);
  const wrongWordFlag = useAppSelector(wrongWordFlagSelector);

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
