import { useState, MouseEvent, useMemo } from 'react';
import Button from '../../../Elements/Button/Button';
import Add from '../../../Elements/Question/Add';
import Answer from '../../../Elements/Question/Answer';
import Timer from './Timer';
import { playModeActions } from '../../../../Store/reducers/PlayModeSlice';
import { useAppDispatch, useAppSelector } from '../../../../Hooks/redux';
import { StepPM, StepProps } from '../Types/playmodeTypes';
import { QuestionType } from '../../../../Types/question';

function PMQuestion({ tournament: { questions } }: StepProps) {
  //чистит тутрнир от нулевых вопросов, оставляя только игровые
  const questionsBasic = useMemo((): QuestionType[] => {
    return questions.filter((v) => v.qNumber > 0 && v.tourNumber > 0);
  }, [questions]);

  const dispatch = useAppDispatch();
  const { currentQuestionIndex } = useAppSelector((state) => state.playModeReducer);

  const [isTimeOver, setIsTimeOver] = useState(false);
  const [answerToQ, setAnswerToQ] = useState('');
  const [messageToQ, setMessageAnswerToQ] = useState('');

  const currentQuestion = questionsBasic[currentQuestionIndex];
  const nextQTourNumber = questionsBasic[currentQuestionIndex + 1]?.tourNumber;

  const onClick = () => {
    //если нажать "готов ответ" во время отсчёта таймера
    if (!answerToQ && !isTimeOver) {
      setIsTimeOver(true);
      return;
    }

    //Если нажать "Следующий вопрос" не выбрав вариант ответа
    if (!answerToQ) {
      setMessageAnswerToQ('Выберите ответ');
      return;
    }

    setAnswerToQ('');

    if (!nextQTourNumber) {
      dispatch(playModeActions.setStep(StepPM.END));
    } else if (currentQuestion.tourNumber !== nextQTourNumber) {
      dispatch(playModeActions.setStep(StepPM.END_OF_TOUR));
    } else dispatch(playModeActions.currentQuestionIndexIncrement());

    setIsTimeOver(false);
  };

  const onClickChoiseAnsBtn = (e: MouseEvent) => {
    const { id } = e.currentTarget;
    setAnswerToQ(id ? 'Да' : 'Нет');
    setMessageAnswerToQ('');

    dispatch(
      playModeActions.setResult({
        qNumber: currentQuestion.qNumber,
        tourNumber: currentQuestion.tourNumber,
        isAnswered: Boolean(id),
      })
    );
  };

  return (
    <div className='pmq'>
      <h3>Вопрос {currentQuestion.qNumber}</h3>
      <Timer setIsTimeOver={setIsTimeOver} qNumber={currentQuestion.qNumber || 0} />
      {currentQuestion.add && <Add add={currentQuestion.add} />}
      <p>{currentQuestion.text}</p>

      {isTimeOver && <Answer q={currentQuestion} />}
      {isTimeOver && (
        <>
          <p className='isanswer-header'>{answerToQ ? `Ответ ${answerToQ} принят` : 'Вам удалось ответить?'}</p>
          <div className='isanswer'>
            <Button onClick={onClickChoiseAnsBtn} title={'Да'} id='1' />
            <Button onClick={onClickChoiseAnsBtn} title={'Нет'} />
          </div>
        </>
      )}
      {messageToQ && <p className='message-to-q'>{messageToQ}</p>}
      <Button
        onClick={onClick}
        title={isTimeOver ? 'Следующий вопрос' : 'Готов ответ?'}
        extraClass={answerToQ ? 'answered' : 'notanswered'}
      />
    </div>
  );
}

export default PMQuestion;
