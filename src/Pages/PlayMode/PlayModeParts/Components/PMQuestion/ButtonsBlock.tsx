import { useState } from 'react';
import { useAppDispatch } from 'Shared/Hooks/redux';
import { playModeActions } from 'Store/Slices/PlayModeSlice';
import { Button } from 'Shared/Components/Button/Button';
import { QuestionType } from 'Shared/Schemas/TournamentSchema';

interface Props {
  currentQuestion: QuestionType;
  nextQTourNumber: number;
  setShowAnswer: (showAnswer: boolean) => void;
}

export function ButtonsBlock({ currentQuestion, nextQTourNumber, setShowAnswer }: Props) {
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
    } else if (currentQuestion.tourNumber === nextQTourNumber) {dispatch(playModeActions.currentQuestionIndexIncrement());} else {
      dispatch(playModeActions.setStep('END_OF_TOUR'));
    }

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
