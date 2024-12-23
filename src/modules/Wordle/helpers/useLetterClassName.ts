import { useAppSelector } from 'Common/Hooks/redux';
import { currentLetterNumberW, letterStateW, wrongWordFlagW } from 'Store/Selectors/WordleSelectors';

export default function useLetterClassName(index: number) {
  const letterState = useAppSelector(letterStateW);
  const currentLetterNumber = useAppSelector(currentLetterNumberW);
  const wrongWordFlag = useAppSelector(wrongWordFlagW);

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
