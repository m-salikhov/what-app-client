import { useState } from 'react';
import { QuestionType } from 'Common/Types/question';
import { useAppDispatch } from 'Common/Hooks/redux';
import { playModeActions } from 'Store/Slices/PlayModeSlice';
import Button from 'Common/Components/Button/Button';

interface Props {
  currentQuestion: QuestionType;
  nextQTourNumber: number;
  setShowAnswer: (showAnswer: boolean) => void;
}

function ButtonsBlock({ currentQuestion, nextQTourNumber, setShowAnswer }: Props) {
  const dispatch = useAppDispatch();

  const [answer, setAnswer] = useState<boolean | undefined>(undefined);

  const onClick = () => {
    if (answer !== undefined) {
      dispatch(
        playModeActions.setResult({
          qNumber: currentQuestion.qNumber,
          tourNumber: currentQuestion.tourNumber,
          isAnswered: answer,
        })
      );
    }

    if (!nextQTourNumber) {
      dispatch(playModeActions.setStep('END'));
    } else if (currentQuestion.tourNumber !== nextQTourNumber) {
      dispatch(playModeActions.setStep('END_OF_TOUR'));
    } else dispatch(playModeActions.currentQuestionIndexIncrement());

    setShowAnswer(false);
  };

  return (
    <div className='buttons-block'>
      {answer ?? (
        <div className='buttons-block-answer'>
          <p>Вы правильно ответили?</p>
          <Button title='Да' onClick={() => setAnswer(true)} />
          <Button title='Нет' onClick={() => setAnswer(false)} />
        </div>
      )}

      {answer !== undefined && <Button title='Следующий вопрос' onClick={onClick} />}
    </div>
  );
}

export default ButtonsBlock;
