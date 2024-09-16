import './wordle.css';
import Board from './Board';
import { useAppDispatch, useAppSelector } from '../../Hooks/redux';
import { wordleActions } from '../../Store/Slices/WordleSlice';

const getWordleDIV = (letters: string[]) => {
  const arr = [];

  for (let i = 0; i < 30; i++) {
    arr.push(<div key={i}>{letters[i] ? letters[i] : null}</div>);
  }

  return arr;
};

export default function Wordle() {
  const { letters } = useAppSelector((state) => state.wordleReducer);
  const dispatch = useAppDispatch();

  return (
    <main
      className='wordle'
      tabIndex={0}
      onKeyDown={(e) => dispatch(wordleActions.setLetters(e.key))}
    >
      <div className='wordle-container'>{getWordleDIV(letters)}</div>
      <Board />
    </main>
  );
}
