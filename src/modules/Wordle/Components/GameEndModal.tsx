import { useTransition, animated } from '@react-spring/web';
import { IoClose } from 'react-icons/io5';
import { GrAchievement } from 'react-icons/gr';
import { TfiLock } from 'react-icons/tfi';
import { useState } from 'react';
import { showScroll } from 'Common/Helpers/scrollDisplay';
import { useAppSelector, useAppDispatch } from 'Common/Hooks/redux';
import { wordleActions } from 'Store/Slices/WordleSlice';
import { useGetRandomWordQuery } from 'Store/ToolkitAPIs/wordleAPI';

export default function GameEndModal() {
  const { result, currentLetterNumber } = useAppSelector((state) => state.wordleReducer);
  const { data: answer = { word: '' }, refetch } = useGetRandomWordQuery(undefined);

  const [modalOpen, setModalOpen] = useState(true);

  const dispatch = useAppDispatch();

  const attempts = currentLetterNumber / 5;

  const transition = useTransition(result, {
    from: {
      scale: 0.5,
      opacity: 0,
    },
    enter: {
      scale: 1,
      opacity: 1,
    },

    config: { duration: 300 },
  });

  function onNewGame() {
    showScroll(300);
    dispatch(wordleActions.resetState());
    refetch();
  }

  function onClose() {
    showScroll(300);
    setModalOpen(false);
  }

  return (
    <>
      {transition((style, result) => {
        return result && modalOpen ? (
          <div className='wordle-result' tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && onNewGame()}>
            <animated.div style={style} className='wordle-result-wrapper'>
              <div className='wordle-result-close'>
                <IoClose size={'30px'} color='var(--p-color)' onClick={onClose} />
              </div>

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
                  Увы! Вам не удалось отгадать слово <span>{answer.word}</span>
                </p>
              )}

              <div className='wordle-result-new' onClick={onNewGame}>
                <p>новое слово</p>
              </div>
            </animated.div>
          </div>
        ) : null;
      })}
    </>
  );
}
