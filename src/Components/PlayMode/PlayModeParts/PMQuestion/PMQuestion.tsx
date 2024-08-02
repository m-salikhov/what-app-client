import { useState, MouseEvent } from 'react';
import Button from '../../../Elements/Button/Button';
import Add from '../../../Elements/Question/Add';
import Answer from '../../../Elements/Question/Answer';
import Timer from './Timer';
import { playModeActions } from '../../../../Store/reducers/PlayModeSlice';
import { useAppDispatch, useAppSelector } from '../../../../Hooks/redux';
import { StepProps } from '../Types/playmodeTypes';

function PMQuestion({ tournament }: StepProps) {
  const dispatch = useAppDispatch();
  const { qCounter } = useAppSelector((state) => state.playModeReducer);

  const [isTimeOver, setIsTimeOver] = useState(false);
  const [answerToQ, setAnswerToQ] = useState('');
  const [messageToQ, setMessageAnswerToQ] = useState('');

  const q = tournament.questions[qCounter];
  const nextQTourNumber = tournament.questions[qCounter + 1]?.tourNumber;

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
      dispatch(playModeActions.setStep('END'));
    } else if (q.tourNumber !== nextQTourNumber) {
      dispatch(playModeActions.setStep('END_OF_TOUR'));
    } else dispatch(playModeActions.qCounterIncrement());

    setIsTimeOver(false);
  };

  const onClickChoiseAnsBtn = (e: MouseEvent) => {
    const { id } = e.currentTarget;
    setAnswerToQ(id ? 'Да' : 'Нет');
    setMessageAnswerToQ('');
    dispatch(
      playModeActions.setResult({
        qNumber: q.qNumber,
        tourNumber: q.tourNumber,
        isAnswered: Boolean(id),
      })
    );
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
            <Button onClick={onClickChoiseAnsBtn} title={'Да'} id='1' />
            <Button onClick={onClickChoiseAnsBtn} title={'Нет'} />
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
