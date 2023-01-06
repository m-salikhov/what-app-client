import { Step } from "../PlayMode";

interface Props {
  qCounter: number;
  setQCounter(qNumber: number): void;
  setStep(step: Step): void;
}

const TourEnd = ({ qCounter, setQCounter, setStep }: Props) => {
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
