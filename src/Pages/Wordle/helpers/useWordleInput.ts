import { useAppDispatch, useAppSelector } from 'Shared/Hooks/redux';
import { board } from 'Store/Selectors/WordleSelectors';
import { useVerifyWordInDBMutation, useGetRandomWordQuery } from 'Store/ToolkitAPIs/wordleAPI';
import { getWordToCheck } from './getWordToCheck';
import { wordleActions } from 'Store/Slices/WordleSlice';

function normalizeInput(str: string) {
  if (str === 'del') return 'Backspace';
  if (str === '⏎') return 'Enter';
  return str;
}

export function useWordleInput() {
  const dispatch = useAppDispatch();

  const { letters, allowNextLetter, currentLetterNumber, words, result } = useAppSelector(board);
  const { data: answer } = useGetRandomWordQuery(undefined);
  const [verifyWordInDB] = useVerifyWordInDBMutation();

  async function handleInput(str: string) {
    const normalizedInput = normalizeInput(str);

    if (result || !answer) {
      return;
    }

    switch (normalizedInput) {
      case 'Backspace':
        dispatch(wordleActions.setLetters(normalizedInput));
        break;

      case 'Enter':
        if (allowNextLetter) return;

        const word = getWordToCheck(letters, currentLetterNumber);

        if (!word || words.includes(word)) {
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

        try {
          const data = await verifyWordInDB(word).unwrap();

          if (data.isExist && currentLetterNumber === 30) {
            dispatch(wordleActions.setResult('lose'));
          } else if (data.isExist) {
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
        } catch (e) {
          console.log('Verify word error');
        }

        break;

      default:
        if (!allowNextLetter) return;
        dispatch(wordleActions.setLetters(normalizedInput));
    }
  }

  return { handleInput };
}
