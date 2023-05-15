import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Start from "./PlayModeParts/Start";
import PMQuestion from "./PlayModeParts/PMQuestion/PMQuestion";
import TourEnd from "./PlayModeParts/End/TourEnd";
import End from "./PlayModeParts/End/End";
import { Step, getTournamentById } from "../../Store/reducers/PlayModeSlice";
import { useAppDispatch, useAppSelector } from "../../Hooks/redux";
import "./playmode.scss";

const PlayMode = () => {
  const dispatch = useAppDispatch();

  const { id, title } = useParams();

  const { step } = useAppSelector((state) => state.playModeReducer);

  useEffect(() => {
    dispatch(getTournamentById(id as string));
  }, [id, dispatch]);

  function PlayModeChange(stepName: Step) {
    switch (stepName) {
      case "START":
        return <Start />;
      case "QUESTION":
        return <PMQuestion />;
      case "END_OF_TOUR":
        return <TourEnd />;
      case "END":
        return <End />;
      default:
        return null;
    }
  }

  return (
    <main>
      <h2>{title}</h2>
      {PlayModeChange(step)}
    </main>
  );
};

export default PlayMode;
