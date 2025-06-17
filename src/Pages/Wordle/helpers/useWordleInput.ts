import { useAppDispatch, useAppSelector } from 'Shared/Hooks/redux';
import { board } from 'Store/Selectors/WordleSelectors';
import { useCheckWordInDBMutation, useGetRandomWordQuery } from 'Store/ToolkitAPIs/wordleAPI';
import { getWordToCheck } from './getWordToCheck';
import { wordleActions } from 'Store/Slices/WordleSlice';

export function useWordleInput() {
  const dispatch = useAppDispatch();

  const { letters, allowNextLetter, currentLetterNumber, words, result } = useAppSelector(board);
  const { data: answer } = useGetRandomWordQuery(undefined);
  const [checkWordInDB] = useCheckWordInDBMutation();

  function checkInput(str: string) {
    if (result || !answer) {
      return;
    }

    if (!allowNextLetter && str === 'Enter') {
      const word = getWordToCheck(letters, currentLetterNumber);

      if (!word || words.at(-1) === word) {
        return;
      }

      if (word === answer.word) {
        dispatch(
          wordleActions.setWords({
            answer: answer.word,
            version: word,
          })
        );
        dispatch(wordleActions.setResult('win'));
        return;
      }

      checkWordInDB(word).then(({ data }) => {
        if (data?.isExist && currentLetterNumber === 30) {
          dispatch(wordleActions.setResult('lose'));
        } else if (data?.isExist) {
          dispatch(wordleActions.setAllowNextLetter(true));
          dispatch(
            wordleActions.setWords({
              answer: answer.word,
              version: data.word,
            })
          );
        } else {
          dispatch(wordleActions.setWrongWordFlag(true));
          setTimeout(() => {
            dispatch(wordleActions.setWrongWordFlag(false));
          }, 500);
        }
      });
    }

    if (!allowNextLetter && str !== 'Backspace') {
      return;
    }

    dispatch(wordleActions.setLetters(str));
  }

  return { checkInput };
}
