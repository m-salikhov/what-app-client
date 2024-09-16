import { useAppDispatch, useAppSelector } from '../../Hooks/redux';
import { wordleActions } from '../../Store/Slices/WordleSlice';
import { useCheckWordExistQuery } from '../../Store/ToolkitAPIs/wordleAPI';

export default function Board() {
  const dispatch = useAppDispatch();

  const { currentLetterNumber, allowNextLetter, letters } = useAppSelector(
    (state) => state.wordleReducer
  );

  let wordToCheck = '';
  if (!(letters.length % 5)) {
    wordToCheck = letters
      .slice(currentLetterNumber - 5, currentLetterNumber)
      .join('')
      .toLowerCase();
  }

  const { refetch } = useCheckWordExistQuery(wordToCheck, {
    skip: true,
  });

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
      <div className='row'>
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
      <div className='row'>
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
      <div className='row'>
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
          onClick={() => {
            refetch().then(({ data }) => {
              if (data) {
                if (data.isExist) {
                  dispatch(wordleActions.setAllowNextLetter(true));
                }
              }
              return data;
            });
          }}
        >
          ⏎
        </div>
      </div>
    </div>
  );
}
