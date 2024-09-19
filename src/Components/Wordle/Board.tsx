import { useAppDispatch, useAppSelector } from '../../Hooks/redux';
import { wordleActions } from '../../Store/Slices/WordleSlice';
import {
  useCheckMutation,
  useGetRandomWordQuery,
} from '../../Store/ToolkitAPIs/wordleAPI';
import { getWordToCheck } from './helpers/getWordToCheck';

export default function Board() {
  const dispatch = useAppDispatch();

  const { currentLetterNumber, allowNextLetter, letters, words } =
    useAppSelector((state) => state.wordleReducer);

  const [check] = useCheckMutation();
  const { data: answer = { word: '' } } = useGetRandomWordQuery(undefined);

  return (
    <div
      className='board-container'
      onClick={(e) => {
        if (e.target instanceof HTMLElement) {
          if (!allowNextLetter && e.target.innerText !== 'DEL') {
            return;
          }

          if (!e.target.className) {
            dispatch(wordleActions.setLetters(e.target.innerText));
          }
        }
      }}
    >
      <div className='board-row'>
        <div>Ё</div>
        <div>Й</div>
        <div>Ц</div>
        <div>У</div>
        <div>К</div>
        <div>Е</div>
        <div>Н</div>
        <div>Г</div>
        <div>Ш</div>
        <div>Щ</div>
        <div>З</div>
        <div>Х</div>
        <div>Ъ</div>
      </div>
      <div className='board-row'>
        <div>Ф</div>
        <div>Ы</div>
        <div>В</div>
        <div>А</div>
        <div>П</div>
        <div>Р</div>
        <div>О</div>
        <div>Л</div>
        <div>Д</div>
        <div>Ж</div>
        <div>Э</div>
      </div>
      <div className='board-row'>
        <div>DEL</div>
        <div>Я</div>
        <div>Ч</div>
        <div>С</div>
        <div>М</div>
        <div>И</div>
        <div>Т</div>
        <div>Ь</div>
        <div>Б</div>
        <div>Ю</div>
        <div
          className='wordle-enter'
          onClick={() => {
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
          }}
        >
          ⏎
        </div>
      </div>
    </div>
  );
}
