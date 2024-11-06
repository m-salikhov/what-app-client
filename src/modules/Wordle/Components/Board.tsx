import { useAppSelector, useAppDispatch } from 'Common/Hooks/redux';
import { wordleActions } from 'Store/Slices/WordleSlice';
import { useCheckMutation, useGetRandomWordQuery } from 'Store/ToolkitAPIs/wordleAPI';
import { getWordToCheck } from '../helpers/getWordToCheck';
import { MouseEventHandler } from 'react';

const keyboard = {
  1: ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ'],
  2: ['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э'],
  3: ['del', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '⏎'],
};

type KeyboardRowIndex = keyof typeof keyboard;

function getKeyboard(onEnterClick: MouseEventHandler<HTMLDivElement>) {
  const arr = [];

  const { letterState } = useAppSelector((state) => state.wordleReducer);

  for (let i = 1; i < 4; i++) {
    arr.push(
      <div key={i} className='board-row'>
        {keyboard[i as KeyboardRowIndex].map((letter) => {
          const states = letterState.filter((v) => v.value === letter).map((v) => v.className);
          let state: string | undefined = undefined;
          if (states.length > 0) {
            state = states.includes('in-place')
              ? 'in-place'
              : states.includes('out-of-place')
              ? 'out-of-place'
              : 'miss';
          }

          return (
            <div onClick={letter === '⏎' ? onEnterClick : undefined} className={state} key={letter}>
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

  const { currentLetterNumber, allowNextLetter, letters, words, result } = useAppSelector(
    (state) => state.wordleReducer
  );

  const [check] = useCheckMutation();
  const { data: answer = { word: '' } } = useGetRandomWordQuery(undefined);

  function onEnterClick() {
    if (result) {
      return;
    }

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

  return (
    <div
      className='board-container'
      onClick={(e) => {
        if (result) {
          return;
        }

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
      {getKeyboard(onEnterClick)}
    </div>
  );
}
