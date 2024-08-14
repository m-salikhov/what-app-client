import { useState, MouseEvent, useMemo } from 'react';
import Button from '../../../../Elements/Button/Button';
import Add from '../../../../Elements/Question/Add';
import Answer from '../../../../Elements/Question/Answer';
import Timer from './Timer';
import { playModeActions } from '../../../../../Store/reducers/PlayModeSlice';
import { useAppDispatch, useAppSelector } from '../../../../../Hooks/redux';
import { StepPM, StepProps } from '../../Types/playmodeTypes';
import { QuestionType } from '../../../../../Types/question';

function PMQuestion({ tournament: { questions } }: StepProps) {
  //чистит турнир от нулевых вопросов, оставляя только игровые
  const questionsBasic = useMemo((): QuestionType[] => {
    return questions.filter((v) => v.qNumber > 0 && v.tourNumber > 0);
  }, [questions]);

  const dispatch = useAppDispatch();
  const { currentQuestionIndex } = useAppSelector(
    (state) => state.playModeReducer
  );

  const [isTimeOver, setIsTimeOver] = useState(false);
  const [answerToQ, setAnswerToQ] = useState<boolean>();
  const [messageToQ, setMessageAnswerToQ] = useState('');

  const currentQuestion = questionsBasic[currentQuestionIndex];
  const nextQTourNumber = questionsBasic[currentQuestionIndex + 1]?.tourNumber;

  const onClick = () => {
    //если нажать "готов ответ" во время отсчёта таймера
    if (answerToQ === undefined && !isTimeOver) {
      setIsTimeOver(true);
      return;
    }

    //Если нажать "Следующий вопрос" не выбрав вариант ответа
    if (answerToQ === undefined) {
      setMessageAnswerToQ('Выберите ответ');
      return;
    }

    setAnswerToQ(undefined);

    dispatch(
      playModeActions.setResult({
        qNumber: currentQuestion.qNumber,
        tourNumber: currentQuestion.tourNumber,
        isAnswered: answerToQ,
      })
    );

    if (!nextQTourNumber) {
      dispatch(playModeActions.setStep(StepPM.END));
    } else if (currentQuestion.tourNumber !== nextQTourNumber) {
      dispatch(playModeActions.setStep(StepPM.END_OF_TOUR));
    } else dispatch(playModeActions.currentQuestionIndexIncrement());

    setIsTimeOver(false);
  };

  const onClickChoiceAnsBtn = (e: MouseEvent) => {
    const { id } = e.currentTarget;
    setAnswerToQ(id ? true : false);
    setMessageAnswerToQ('');
  };

  return (
    <div className='pmq'>
      <h3>Вопрос {currentQuestion.qNumber}</h3>
      <Timer
        setIsTimeOver={setIsTimeOver}
        qNumber={currentQuestion.qNumber || 0}
      />
      {currentQuestion.add && <Add add={currentQuestion.add} />}
      <p>{currentQuestion.text}</p>

      {isTimeOver && <Answer q={currentQuestion} />}
      {isTimeOver && (
        <>
          <p className='pmq-is-answered'>
            {answerToQ !== undefined
              ? `Ответ ${answerToQ ? 'Да' : 'Нет'} принят`
              : 'Вам удалось ответить?'}
          </p>
          <div className='pmq-choice-btn'>
            <Button onClick={onClickChoiceAnsBtn} title={'Да'} id='1' />
            <Button onClick={onClickChoiceAnsBtn} title={'Нет'} />
          </div>
        </>
      )}
      {messageToQ && <p className='message-to-q'>{messageToQ}</p>}
      <Button
        onClick={onClick}
        title={isTimeOver ? 'Следующий вопрос' : 'Готов ответ?'}
      />
    </div>
  );
}

export default PMQuestion;
