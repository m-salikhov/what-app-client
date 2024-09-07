import { Dispatch, SetStateAction, useState } from 'react';
import Button from '../../../../../Elements/Button/Button';
import { useAppDispatch } from '../../../../../../Hooks/redux';
import { playModeActions } from '../../../../../../Store/reducers/PlayModeSlice';
import { StepPM } from '../../../Types/playmodeTypes';
import { QuestionType } from '../../../../../../Types/question';

interface Props {
  currentQuestion: QuestionType;
  nextQTourNumber: number;
  setIsTimeOver: Dispatch<SetStateAction<boolean>>;
}

function ButtonsBlock({
  currentQuestion,
  nextQTourNumber,
  setIsTimeOver,
}: Props) {
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
      dispatch(playModeActions.setStep(StepPM.END));
    } else if (currentQuestion.tourNumber !== nextQTourNumber) {
      dispatch(playModeActions.setStep(StepPM.END_OF_TOUR));
    } else dispatch(playModeActions.currentQuestionIndexIncrement());

    setIsTimeOver(false);
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

      {answer !== undefined && (
        <Button title='Следующий вопрос' onClick={onClick} />
      )}
    </div>
  );
}

export default ButtonsBlock;
