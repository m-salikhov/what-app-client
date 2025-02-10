import { GrAchievement } from 'react-icons/gr';
import { TfiLock } from 'react-icons/tfi';
import { useAppSelector, useAppDispatch } from 'Common/Hooks/redux';
import { wordleActions } from 'Store/Slices/WordleSlice';
import { useGetRandomWordQuery } from 'Store/ToolkitAPIs/wordleAPI';
import { board } from 'Store/Selectors/WordleSelectors';
import Modal from 'Common/Components/Modal/Modal';
import { useEffect, useState } from 'react';

export default function GameEndModal() {
  const { result, currentLetterNumber } = useAppSelector(board);
  const { data: answer = { word: '' }, refetch } = useGetRandomWordQuery(undefined);
  const [modalOpen, setModalOpen] = useState(false);

  const dispatch = useAppDispatch();

  const attempts = currentLetterNumber / 5;

  function onDestroyed() {
    dispatch(wordleActions.resetState());
    refetch();
  }

  useEffect(() => {
    if (result) {
      setModalOpen(true);
    }
  }, [result]);

  return (
    <Modal
      active={modalOpen}
      onClose={() => {
        console.log(modalOpen);
        setModalOpen(false);
      }}
      onDestroyed={onDestroyed}
    >
      {' '}
      <div className='wordle-result-wrapper'>
        <div className='wordle-result-icon'>
          {result === 'win' ? (
            <GrAchievement size={'100px'} color='#FFC300' />
          ) : (
            <TfiLock size={'100px'} color='#FFC300' />
          )}
        </div>

        {result === 'win' ? (
          <p className='wordle-result-text'>
            Вы отгадали слово <span>{answer.word}</span> <br /> {attempts === 2 ? 'со' : 'с'} {attempts}-
            {attempts === 3 ? 'ей' : 'ой'} попытки!
          </p>
        ) : (
          <p className='wordle-result-text'>
            Увы! Вам не удалось отгадать <br /> слово <span>{answer.word}</span>
          </p>
        )}

        <div className='wordle-result-new' onClick={() => setModalOpen(false)}>
          <p>новое слово</p>
        </div>
      </div>
    </Modal>
  );
}
