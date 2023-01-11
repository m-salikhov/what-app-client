import { Result } from "../../PlayMode";

interface Props {
  tour: number;
  res: Result;
}

const ResBlock = ({ tour, res }: Props) => {
  const calcTourResult = (tour: number, res: Result) => {
    const tourResArrBoolean = res[tour];
    let count = 0;
    tourResArrBoolean.forEach((v) => {
      if (v.ans) count++;
    });
    return [count, res[tour].length];
  };
  const calcFullResult = (res: Result) => {
    let countTrue = 0;
    let countAll = 0;
    for (let tour in res) {
      for (let index = 0; index < res[tour].length; index++) {
        countAll = countAll + 1;
        if (res[tour][index].ans) {
          countTrue = countTrue + 1;
        }
      }
    }
    return [countTrue, countAll];
  };
  const [TourCount, TourLength] = calcTourResult(tour, res);
  const [TourneyCount, TourneyLength] = calcFullResult(res);
  return (
    <div className="resblock">
      <p>
        {`Результат ${tour}-го тура:`}
        <span>{`${TourCount} из ${TourLength}`}</span>{" "}
      </p>
      {tour > 1 && (
        <p>
          {`Результат общий:`}
          <span>{`${TourneyCount} из ${TourneyLength}`}</span>{" "}
        </p>
      )}
    </div>
  );
};

export default ResBlock;
