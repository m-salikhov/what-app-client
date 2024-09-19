import { useAppDispatch, useAppSelector } from '../../Hooks/redux';
import { LetterState, wordleActions } from '../../Store/Slices/WordleSlice';
import {
  useCheckMutation,
  useGetRandomWordQuery,
} from '../../Store/ToolkitAPIs/wordleAPI';
import { getWordToCheck } from './helpers/getWordToCheck';
import { MouseEventHandler } from 'react';

const keyboard = {
  1: ['ё', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ'],
  2: ['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э'],
  3: ['del', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '⏎'],
};

type A = keyof typeof keyboard;

function getKeyboard(
  onEnterClick: MouseEventHandler<HTMLDivElement>,
  letterState: LetterState[]
) {
  const arr = [];

  for (let i = 1; i < 4; i++) {
    arr.push(
      <div key={i} className='board-row'>
        {keyboard[i as A].map((letter) => {
          const state = letterState.findLast((v) => v.value === letter);

          return (
            <div
              onClick={letter === '⏎' ? onEnterClick : undefined}
              className={state?.class}
              key={letter}
            >
              {letter}
            </div>
          );
        })}
      </div>
    );
  }

  return arr;
}

export default function Board() {
  const dispatch = useAppDispatch();

  const { currentLetterNumber, allowNextLetter, letters, words, letterState } =
    useAppSelector((state) => state.wordleReducer);

  const [check] = useCheckMutation();
  const { data: answer = { word: '' } } = useGetRandomWordQuery(undefined);

  function onEnterClick() {
    const word = getWordToCheck(letters, currentLetterNumber);

    if (!word || words.at(-1) === word) {
      return;
    }

    if (word === answer.word) {
      dispatch(
        wordleActions.setWords({
          answer: answer.word,
          word: word,
        })
      );
      dispatch(wordleActions.setAllowNextLetter(false));

      console.log('CONGRATULATIONS!!');
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

  return (
    <div
      className='board-container'
      onClick={(e) => {
        if (e.target instanceof HTMLElement) {
          if (!allowNextLetter && e.target.innerText !== 'DEL') {
            return;
          }

          if (e.target.className !== 'board-container') {
            dispatch(wordleActions.setLetters(e.target.innerText));
          }
        }
      }}
    >
      {getKeyboard(onEnterClick, letterState)}
    </div>
  );
}
