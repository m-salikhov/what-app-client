import { useState } from "react";
import Button from "../../../Elements/Button/Button";
import QuestionPlane from "../../../Elements/Question/QuestionPlane";
import ResBlock from "./ResBlock";
import TourTable from "./TourTable";
import { playModeSlice } from "../../../../Store/reducers/PlayModeSlice";
import { useAppDispatch, useAppSelector } from "../../../../Hooks/redux";

const TourEnd = () => {
  const dispatch = useAppDispatch();

  const { t, qCounter, result } = useAppSelector(
    (state) => state.playModeReducer
  );
  const endedTourNumber = t.questions[qCounter].tourNumber;

  const onClick = () => {
    dispatch(playModeSlice.actions.qCounterIncrement());
    dispatch(playModeSlice.actions.setStep("QUESTION"));
  };

  const [selectedQ, setSelectedQ] = useState(0);

  return (
    <div className="tourend">
      <ResBlock />
      <TourTable res={result[endedTourNumber]} setSelectedQ={setSelectedQ} />
      <Button title="Следующий тур" onClick={onClick} />
      {Boolean(selectedQ) && <QuestionPlane q={t.questions[selectedQ - 1]} />}
    </div>
  );
};

export default TourEnd;
