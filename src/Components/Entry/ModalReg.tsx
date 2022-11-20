import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ModalReg = () => {
  const [counter, setCounter] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  if (counter === 0) {
    return <Navigate to="/" />;
  }
  return (
    <>
      {" "}
      <div className="modalBG">
        {" "}
        <div className="modal-wrapper">
          <h2>Вы успешно зарегистрировались</h2>
          <p>Через несколько секунд откроется главная {counter} </p>
        </div>{" "}
      </div>
    </>
  );
};

export default ModalReg;
