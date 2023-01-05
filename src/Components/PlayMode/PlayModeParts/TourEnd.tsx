import { FC } from "react";
import { Step } from "../PlayMode";

interface Props {
  qCounter: number;
  setQCounter(qNumber: number): void;
  setStep(step: Step): void;
}

const TourEnd: FC<Props> = ({ qCounter, setQCounter, setStep }) => {
  console.log("qCounter", qCounter);
  function onClick() {
    setQCounter(qCounter + 1);
    setStep(Step.Question);
  }
  return (
    <main>
      {" "}
      <div>
        <button onClick={onClick}>Следующий тур</button>
      </div>
    </main>
  );
};

export default TourEnd;
