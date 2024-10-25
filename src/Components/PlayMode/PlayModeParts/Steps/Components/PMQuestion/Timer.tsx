import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useAppSelector } from '../../../../../../Hooks/redux';

interface Props {
  setShowAnswer: Dispatch<SetStateAction<boolean>>;
  qNumber: number;
}

function Timer({ setShowAnswer, qNumber }: Props) {
  const { questionTimer, answerTimer } = useAppSelector((state) => state.playModeReducer);
  const [time, setTime] = useState(questionTimer);

  //Флаг, что время на чтение вопроса окончено
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    if (time === 0 && !flag) {
      setTime(answerTimer);
      setFlag(true);
    }

    if (time === 0 && flag) {
      clearTimeout(timeout);
      setShowAnswer(true);
    }

    return () => clearTimeout(timeout);
  }, [time, qNumber, flag, setShowAnswer]);

  return (
    <div className='timer'>
      <div>
        {flag ? <p>Время найти ответ</p> : <p>Время прочитать вопрос</p>}
        <h2>{time}</h2>
      </div>
    </div>
  );
}

export default Timer;
