import { useState } from 'react';
import Button from '../../../Elements/Button/Button';
import QuestionPlane from '../../../Elements/Question/QuestionPlane';
import ResBlock from './ResBlock';
import TourTable from './TourTable';
import { playModeActions } from '../../../../Store/reducers/PlayModeSlice';
import { useAppDispatch, useAppSelector } from '../../../../Hooks/redux';
import { StepPM, StepProps } from '../Types/playmodeTypes';

function TourEnd({ tournament }: StepProps) {
  const dispatch = useAppDispatch();

  const { currentQuestionIndex, result } = useAppSelector(
    (state) => state.playModeReducer
  );
  const endedTourNumber = tournament.questions[currentQuestionIndex].tourNumber;

  const onClick = () => {
    dispatch(playModeActions.currentQuestionIndexIncrement());
    dispatch(playModeActions.setStep(StepPM.QUESTION));
  };

  const [selectedQ, setSelectedQ] = useState(0);

  return (
    <div className='tourend'>
      <ResBlock tournament={tournament} />
      <TourTable res={result[endedTourNumber]} setSelectedQ={setSelectedQ} />
      <Button title='Следующий тур' onClick={onClick} />
      {Boolean(selectedQ) && (
        <QuestionPlane q={tournament.questions[selectedQ - 1]} />
      )}
    </div>
  );
}

export default TourEnd;
