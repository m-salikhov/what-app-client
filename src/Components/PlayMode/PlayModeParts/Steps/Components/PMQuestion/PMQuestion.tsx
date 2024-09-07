import { useState, useMemo, useEffect } from 'react';
import Button from '../../../../../Elements/Button/Button';
import Add from '../../../../../Elements/Question/Add';
import Answer from '../../../../../Elements/Question/Answer';
import Timer from './Timer';
import { playModeActions } from '../../../../../../Store/Slices/PlayModeSlice';
import { useAppDispatch, useAppSelector } from '../../../../../../Hooks/redux';
import { StepProps } from '../../../Types/playmodeTypes';
import { QuestionType } from '../../../../../../Types/question';
import ButtonsBlock from './ButtonsBlock';

function PMQuestion({ tournament: { questions } }: StepProps) {
  const dispatch = useAppDispatch();

  //чистит турнир от нулевых вопросов, оставляя только игровые
  const questionsBasic = useMemo((): QuestionType[] => {
    return questions.filter((v) => v.qNumber > 0 && v.tourNumber > 0);
  }, [questions]);

  const { currentQuestionIndex } = useAppSelector(
    (state) => state.playModeReducer
  );

  const [isTimeOver, setIsTimeOver] = useState(false);

  const currentQuestion = questionsBasic[currentQuestionIndex];
  const nextQTourNumber = questionsBasic[currentQuestionIndex + 1]?.tourNumber;

  useEffect(() => {
    dispatch(playModeActions.setCurrentTourNumber(currentQuestion.tourNumber));
  }, []);

  return (
    <div className='pmq'>
      {!isTimeOver && (
        <Timer
          setIsTimeOver={setIsTimeOver}
          qNumber={currentQuestion.qNumber || 0}
        />
      )}
      {isTimeOver && (
        <ButtonsBlock
          currentQuestion={currentQuestion}
          nextQTourNumber={nextQTourNumber}
          setIsTimeOver={setIsTimeOver}
        />
      )}

      {currentQuestion.add && <Add add={currentQuestion.add} />}

      <p>{currentQuestion.text}</p>

      {isTimeOver && <Answer q={currentQuestion} />}

      {!isTimeOver && (
        <Button onClick={() => setIsTimeOver(true)} title='Готов ответ?' />
      )}
    </div>
  );
}

export default PMQuestion;
