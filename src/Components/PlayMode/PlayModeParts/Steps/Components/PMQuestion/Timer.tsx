import { useEffect, useState } from 'react';

interface Props {
  setIsTimeOver(isTimeOver: boolean): void;
  qNumber: number;
}

function Timer({ setIsTimeOver, qNumber }: Props) {
  const [time, setTime] = useState(15);
  //Флаг, что время на чтение вопроса окончено
  const [flag, setFlag] = useState(false);
  const [prevQNumber, setPrevQNumber] = useState(qNumber);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTime((prev) => prev - 1);
    }, 1000);
    if (time === 0 && !flag) {
      setTime(30);
      setFlag(true);
    }
    if (time === 0 && flag) {
      clearTimeout(timeout);
      setIsTimeOver(true);
    }
    if (prevQNumber !== qNumber) {
      setTime(15);
      setFlag(false);
      setIsTimeOver(false);
      setPrevQNumber(qNumber);
    }
    return () => clearTimeout(timeout);
  }, [time, qNumber, flag, setIsTimeOver, prevQNumber]);

  return (
    <div className='timer'>
      <div>
        {flag ? time === 0 ? <p>Время вышло</p> : <p>Время найти ответ</p> : <p>Время прочитать вопрос</p>}
        <h2>{time}</h2>
      </div>
    </div>
  );
}

export default Timer;
