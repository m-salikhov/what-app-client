import { useState } from 'react';
import Button from '../../../Elements/Button/Button';
import QuestionPlane from '../../../Elements/Question/QuestionPlane';
import ResBlock from './ResBlock';
import TourTable from './TourTable';
import { playModeActions } from '../../../../Store/reducers/PlayModeSlice';
import { useAppDispatch, useAppSelector } from '../../../../Hooks/redux';
import { StepProps } from '../Types/playmodeTypes';

function TourEnd({ tournament }: StepProps) {
  const dispatch = useAppDispatch();

  const { qCounter, result } = useAppSelector((state) => state.playModeReducer);
  const endedTourNumber = tournament.questions[qCounter].tourNumber;

  const onClick = () => {
    dispatch(playModeActions.qCounterIncrement());
    dispatch(playModeActions.setStep('QUESTION'));
  };

  const [selectedQ, setSelectedQ] = useState(0);

  return (
    <div className='tourend'>
      <ResBlock tournament={tournament} />
      <TourTable res={result[endedTourNumber]} setSelectedQ={setSelectedQ} />
      <Button title='Следующий тур' onClick={onClick} />
      {Boolean(selectedQ) && <QuestionPlane q={tournament.questions[selectedQ - 1]} />}
    </div>
  );
}

export default TourEnd;
