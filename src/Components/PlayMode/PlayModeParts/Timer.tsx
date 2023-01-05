import { FC, useEffect, useRef, useState } from "react";

interface Props {
  setIsTimeOver(isTimeOver: boolean): void;
  qNumber: number;
}

const Timer: FC<Props> = ({ setIsTimeOver, qNumber }) => {
  const [time, setTime] = useState(10);
  const [flag, setFlag] = useState(false);
  const ref = useRef(qNumber);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);
    if (time === 0 && !flag) {
      setTime(15);
      setFlag(true);
    }
    if (time === 0 && flag) {
      clearInterval(interval);
      setIsTimeOver(true);
    }
    if (ref.current !== qNumber) {
      setTime(10);
      setFlag(false);
      setIsTimeOver(false);
      ref.current = qNumber;
    }
    return () => clearInterval(interval);
  }, [time, qNumber, flag, setIsTimeOver]);

  return (
    <div>
      {flag ? (
        time === 0 ? (
          <p>Время вышло</p>
        ) : (
          <p>Время найти ответ</p>
        )
      ) : (
        <p>Время прочитать вопрос</p>
      )}
      <h2>{time}</h2>
      <h2>{qNumber}</h2>
    </div>
  );
};

export default Timer;
