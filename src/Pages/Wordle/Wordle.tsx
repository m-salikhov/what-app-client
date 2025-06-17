import './wordle.css';
import { Board } from './Components/Board';
import { useEffect } from 'react';
import { useLetterClassName } from './helpers/useLetterClassName';
import { GameEndModal } from './Components/GameEndModal';
import { useAppSelector, useAppDispatch } from 'Shared/Hooks/redux';
import { wordleActions } from 'Store/Slices/WordleSlice';
import { lettersW } from 'Store/Selectors/WordleSelectors';
import { useWordleInput } from './helpers/useWordleInput';

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
  const dispatch = useAppDispatch();

  const { checkInput } = useWordleInput();

  useEffect(() => {
    return () => {
      dispatch(wordleActions.resetState());
    };
  }, []);

  return (
    <div className='wordle' tabIndex={0} onKeyDown={(e) => checkInput(e.key)}>
      <GameEndModal />
      <div className='wordle-container'>{getWordleDIV()}</div>
      <Board />
    </div>
  );
}
