import { GrAchievement } from 'react-icons/gr';
import { TfiLock } from 'react-icons/tfi';
import { useAppSelector, useAppDispatch } from 'Shared/Hooks/redux';
import { wordleActions } from 'Store/Slices/WordleSlice';
import { useGetRandomWordQuery } from 'Store/ToolkitAPIs/wordleAPI';
import { currentLetterNumberSelector } from 'Store/Selectors/WordleSelectors';
import { Modal } from 'Shared/Components/Modal/Modal';

export function GameEndModal({ result }: { result: string }) {
  const currentLetterNumber = useAppSelector(currentLetterNumberSelector);
  const { data: answer = { word: '' }, refetch } = useGetRandomWordQuery(undefined);

  const dispatch = useAppDispatch();

  const attempts = currentLetterNumber / 5;

  function onClose() {
    dispatch(wordleActions.resetState());
    refetch();
  }

  return (
    <Modal active={Boolean(result)} onClose={onClose}>
      {' '}
      <div className='wordle-result-wrapper'>
        <div className='wordle-result-icon'>
          {result === 'win' && <GrAchievement size={'100px'} color='#FFC300' />}
          {result === 'lose' && <TfiLock size={'100px'} color='#FFC300' />}
        </div>

        {result === 'win' && (
          <p className='wordle-result-text'>
            Вы отгадали слово <span>{answer.word}</span> <br /> {attempts === 2 ? 'со' : 'с'} {attempts}-
            {attempts === 3 ? 'ей' : 'ой'} попытки!
          </p>
        )}
        {result === 'lose' && (
          <p className='wordle-result-text'>
            Увы! Вам не удалось отгадать <br /> слово <span>{answer.word}</span>
          </p>
        )}

        <div className='wordle-result-new' onClick={onClose}>
          <p>новое слово</p>
        </div>
      </div>
    </Modal>
  );
}
