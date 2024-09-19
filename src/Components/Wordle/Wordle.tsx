import './wordle.css';
import Board from './Board';
import { useAppDispatch, useAppSelector } from '../../Hooks/redux';
import { LetterState, wordleActions } from '../../Store/Slices/WordleSlice';
import {
  useCheckMutation,
  useGetRandomWordQuery,
} from '../../Store/ToolkitAPIs/wordleAPI';
import { getWordToCheck } from './helpers/getWordToCheck';
import { useEffect } from 'react';

const getWordleDIV = (letters: string[], letterState: LetterState[]) => {
  const arr = [];

  for (let i = 0; i < 30; i++) {
    arr.push(
      <div
        key={i}
        className={
          letterState[i] ? letterState[i].class + ' letter' : undefined
        }
      >
        {letters[i] ? letters[i] : null}
      </div>
    );
  }

  return arr;
};

export default function Wordle() {
  const { letters, allowNextLetter, currentLetterNumber, letterState, words } =
    useAppSelector((state) => state.wordleReducer);

  const dispatch = useAppDispatch();

  const [check] = useCheckMutation();
  const { data: answer = { word: '' } } = useGetRandomWordQuery(undefined);

  useEffect(() => {
    return () => {
      dispatch(wordleActions.resetState());
    };
  }, [dispatch]);

  return (
    <main
      className='wordle'
      tabIndex={0}
      onKeyDown={(e) => {
        if (!allowNextLetter && e.key === 'Enter') {
          const word = getWordToCheck(letters, currentLetterNumber);

          if (!word || words.at(-1) === word) {
            return;
          }

          if (word === answer?.word) {
            dispatch(
              wordleActions.setWords({
                answer: answer.word,
                word: word,
              })
            );
            console.log('CONGRATULATIONS!!');
            dispatch(wordleActions.setAllowNextLetter(false));
            return;
          }

          check(word).then(({ data }) => {
            if (data?.isExist) {
              dispatch(wordleActions.setAllowNextLetter(true));
              dispatch(
                wordleActions.setWords({
                  answer: answer.word,
                  word: data.word,
                })
              );
            }
          });
        }

        if (!allowNextLetter && e.key !== 'Backspace') {
          return;
        }

        dispatch(wordleActions.setLetters(e.key));
      }}
    >
      <div className='wordle-container'>
        {getWordleDIV(letters, letterState)}
      </div>
      <Board />
    </main>
  );
}
