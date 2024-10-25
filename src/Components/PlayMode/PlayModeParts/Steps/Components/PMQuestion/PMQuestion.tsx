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

  const { currentQuestionIndex, withTimer } = useAppSelector((state) => state.playModeReducer);

  const [showAnswer, setShowAnswer] = useState(false);

  const currentQuestion = questionsBasic[currentQuestionIndex];
  const nextQTourNumber = questionsBasic[currentQuestionIndex + 1]?.tourNumber;

  useEffect(() => {
    dispatch(playModeActions.setCurrentTourNumber(currentQuestion.tourNumber));
  }, []);

  return (
    <div className='pmq'>
      {!showAnswer && withTimer && <Timer setShowAnswer={setShowAnswer} qNumber={currentQuestion.qNumber || 0} />}
      {showAnswer && (
        <ButtonsBlock
          currentQuestion={currentQuestion}
          nextQTourNumber={nextQTourNumber}
          setShowAnswer={setShowAnswer}
        />
      )}

      {currentQuestion.add && <Add add={currentQuestion.add} />}

      <p>{currentQuestion.text}</p>

      {showAnswer && <Answer q={currentQuestion} />}

      {!showAnswer && <Button onClick={() => setShowAnswer(true)} title='Готов ответ?' />}
    </div>
  );
}

export default PMQuestion;
