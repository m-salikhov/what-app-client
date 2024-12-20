import { useState, useMemo, useEffect } from 'react';
import Timer from './Timer';
import ButtonsBlock from './ButtonsBlock';
import Add from 'Common/Components/Question/Components/Add';
import Answer from 'Common/Components/Question/Components/Answer';
import { useAppDispatch, useAppSelector } from 'Common/Hooks/redux';
import { QuestionType } from 'Common/Types/question';
import { playModeActions } from 'Store/Slices/PlayModeSlice';
import Button from 'Common/Components/Button/Button';
import { currentQuestionIndexPM, withTimerPM } from 'Store/Selectors/PlayModeSelectors';

function PMQuestion({ tournament: { questions } }: { tournament: { questions: QuestionType[] } }) {
  const dispatch = useAppDispatch();

  //чистит турнир от нулевых вопросов, оставляя только игровые
  const questionsBasic = useMemo((): QuestionType[] => {
    return questions.filter((v) => v.qNumber > 0 && v.tourNumber > 0);
  }, [questions]);

  const currentQuestionIndex = useAppSelector(currentQuestionIndexPM);
  const withTimer = useAppSelector(withTimerPM);

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
