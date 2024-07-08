import { useState } from 'react';
import Button from '../../../Elements/Button/Button';
import Add from '../../../Elements/Question/Add';
import Answer from '../../../Elements/Question/Answer';
import Timer from './Timer';
import { playModeSlice } from '../../../../Store/reducers/PlayModeSlice';
import { useAppDispatch, useAppSelector } from '../../../../Hooks/redux';

function PMQuestion() {
  const dispatch = useAppDispatch();
  const { t, qCounter } = useAppSelector((state) => state.playModeReducer);

  const [isTimeOver, setIsTimeOver] = useState(false);
  const [answerToQ, setAnswerToQ] = useState('');
  const [messageToQ, setMessageAnswerToQ] = useState('');

  const q = t.questions[qCounter];
  const nextQTourNumber = t.questions[qCounter + 1]?.tourNumber;

  const onClick = () => {
    //если нажать "готов ответ" во время отсчёта таймера
    if (!Boolean(answerToQ) && !isTimeOver) {
      setIsTimeOver(true);
      return;
    }

    //Если нажать "Следующий вопрос" не выбрав вариант ответа
    if (!Boolean(answerToQ)) {
      setMessageAnswerToQ('Выберите ответ');
      return;
    }

    setAnswerToQ('');

    if (typeof nextQTourNumber === 'undefined') {
      dispatch(playModeSlice.actions.setStep('END'));
    } else if (q.tourNumber !== nextQTourNumber) {
      dispatch(playModeSlice.actions.setStep('END_OF_TOUR'));
    } else dispatch(playModeSlice.actions.qCounterIncrement());

    setIsTimeOver(false);
  };

  return (
    <div className='pmq'>
      <h3>Вопрос {q.qNumber}</h3>
      <Timer setIsTimeOver={setIsTimeOver} qNumber={q.qNumber} />
      {q.add && <Add add={q.add} />}
      <p>{q.text}</p>

      {isTimeOver && <Answer q={q} />}
      {isTimeOver && (
        <>
          <p className='isanswer__header'>{answerToQ ? `Ответ ${answerToQ} принят` : 'Вам удалось ответить?'}</p>
          <div className='isanswer'>
            <Button
              onClick={() => {
                setAnswerToQ('Да');
                setMessageAnswerToQ('');
                dispatch(playModeSlice.actions.setResult(true));
              }}
              title={'Да'}
            />
            <Button
              onClick={() => {
                setAnswerToQ('Нет');
                setMessageAnswerToQ('');
                dispatch(playModeSlice.actions.setResult(false));
              }}
              title={'Нет'}
            />
          </div>
        </>
      )}
      {messageToQ && <p className='messageToQ'>{messageToQ}</p>}
      <Button
        onClick={onClick}
        title={isTimeOver ? 'Следующий вопрос' : 'Готов ответ?'}
        extraClass={Boolean(answerToQ) ? 'answered' : 'notanswered'}
      />
    </div>
  );
}

export default PMQuestion;
