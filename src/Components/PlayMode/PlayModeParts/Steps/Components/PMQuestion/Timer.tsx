import { useEffect, useState } from 'react';

interface Props {
  setIsTimeOver(isTimeOver: boolean): void;
  qNumber: number;
}

const readingTime = 5;
const questionTime = 6;

function Timer({ setIsTimeOver, qNumber }: Props) {
  const [time, setTime] = useState(readingTime);
  //Флаг, что время на чтение вопроса окончено
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    if (time === 0 && !flag) {
      setTime(questionTime);
      setFlag(true);
    }

    if (time === 0 && flag) {
      clearTimeout(timeout);
      setIsTimeOver(true);
    }

    return () => clearTimeout(timeout);
  }, [time, qNumber, flag, setIsTimeOver]);

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
