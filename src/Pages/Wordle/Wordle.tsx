import './wordle.css';
import { Board } from './Components/Board';
import { useLetterClassName } from './helpers/useLetterClassName';
import { GameEndModal } from './Components/GameEndModal';
import { useAppSelector } from 'Shared/Hooks/redux';
import { lettersSelector, resultSelector } from 'Store/Selectors/WordleSelectors';
import { useWordleInput } from './helpers/useWordleInput';
import { ToastContainer, toast } from 'react-toastify';

const isEnglishKey = (key: string): boolean => {
  return /^[a-zA-Z0-9!@#$%^&*()_+=\-[\]{}|;':",./<>?~` ]$/.test(key);
};

const showToast = () => {
  toast.error(
    <p>Введите букву на русской раскладке</p>,

    {
      hideProgressBar: true,
      autoClose: 2000,
      pauseOnHover: true,
    }
  );
};

const getWordleDIV = () => {
  const arr = [];

  const letters = useAppSelector(lettersSelector);

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
  const { handleInput } = useWordleInput();
  const result = useAppSelector(resultSelector);

  return (
    <div
      className='wordle'
      tabIndex={0}
      onKeyDown={(e) => {
        if (isEnglishKey(e.key)) {
          showToast();
          return;
        }

        handleInput(e.key);
      }}
    >
      <div className='wordle-container'>{getWordleDIV()}</div>
      <Board />
      {result && <GameEndModal result={result} />}
      <ToastContainer />
    </div>
  );
}
