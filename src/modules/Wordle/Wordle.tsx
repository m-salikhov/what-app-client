import './wordle.css';
import Board from './Components/Board';
import { getWordToCheck } from './helpers/getWordToCheck';
import { useEffect } from 'react';
import useLetterClassName from './helpers/useLetterClassName';
import GameEndModal from './Components/GameEndModal';
import { useAppSelector, useAppDispatch } from 'Common/Hooks/redux';
import { wordleActions } from 'Store/Slices/WordleSlice';
import { useCheckMutation, useGetRandomWordQuery } from 'Store/ToolkitAPIs/wordleAPI';
import { board, lettersW } from 'Store/Selectors/WordleSelectors';

const getWordleDIV = () => {
  const arr = [];

  const letters = useAppSelector(lettersW);

  for (let i = 0; i < 30; i++) {
    arr.push(
      <div key={i} className={useLetterClassName(i)}>
        {letters[i] ? letters[i] : null}
      </div>
    );
  }

  return arr;
};

export default function Wordle() {
  const { letters, allowNextLetter, currentLetterNumber, words, result } = useAppSelector(board);

  const dispatch = useAppDispatch();

  const [check] = useCheckMutation();
  const { data: answer = { word: '' } } = useGetRandomWordQuery(undefined);

  useEffect(() => {
    return () => {
      dispatch(wordleActions.resetState());
    };
  }, []);

  return (
    <div
      className='wordle'
      tabIndex={0}
      onKeyDown={(e) => {
        if (result) {
          return;
        }

        if (!allowNextLetter && e.key === 'Enter') {
          const word = getWordToCheck(letters, currentLetterNumber);

          if (!word || words.at(-1) === word) {
            return;
          }

          if (word === answer?.word) {
            dispatch(
              wordleActions.setWords({
                answer: answer.word,
                version: word,
              })
            );
            dispatch(wordleActions.setResult('win'));
            return;
          }

          check(word).then(({ data }) => {
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

        if (!allowNextLetter && e.key !== 'Backspace') {
          return;
        }

        dispatch(wordleActions.setLetters(e.key));
      }}
    >
      <GameEndModal />
      <div className='wordle-container'>{getWordleDIV()}</div>
      <Board />
    </div>
  );
}
