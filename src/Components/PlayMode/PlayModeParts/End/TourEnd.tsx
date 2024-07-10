import { useState } from 'react';
import Button from '../../../Elements/Button/Button';
import QuestionPlane from '../../../Elements/Question/QuestionPlane';
import ResBlock from './ResBlock';
import TourTable from './TourTable';
import { playModeActions } from '../../../../Store/reducers/PlayModeSlice';
import { useAppDispatch, useAppSelector } from '../../../../Hooks/redux';

function TourEnd() {
  const dispatch = useAppDispatch();

  const { t, qCounter, result } = useAppSelector((state) => state.playModeReducer);
  const endedTourNumber = t.questions[qCounter].tourNumber;

  const onClick = () => {
    dispatch(playModeActions.qCounterIncrement());
    dispatch(playModeActions.setStep('QUESTION'));
  };

  const [selectedQ, setSelectedQ] = useState(0);

  return (
    <div className='tourend'>
      <ResBlock />
      <TourTable res={result[endedTourNumber]} setSelectedQ={setSelectedQ} />
      <Button title='Следующий тур' onClick={onClick} />
      {Boolean(selectedQ) && <QuestionPlane q={t.questions[selectedQ - 1]} />}
    </div>
  );
}

export default TourEnd;
