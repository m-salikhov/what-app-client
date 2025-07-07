import { useAppSelector } from 'Shared/Hooks/redux';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { timerOptions } from 'Store/Selectors/PlayModeSelectors';

interface Props {
  setShowAnswer: Dispatch<SetStateAction<boolean>>;
  qNumber: number;
}

export function Timer({ setShowAnswer, qNumber }: Props) {
  const { questionTimer, answerTimer } = useAppSelector(timerOptions);
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
  }, [time, qNumber, flag, setShowAnswer, answerTimer]);

  return (
    <div className='timer'>
      <div>
        {flag ? <p>Время найти ответ</p> : <p>Время прочитать вопрос</p>}
        <h2>{time}</h2>
      </div>
    </div>
  );
}
