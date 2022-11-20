import { FC } from "react";
import "./skeletonQuestion.scss";

const SkeletonQuestion: FC<{ count: number }> = ({ count }) => {
  const skeletonQuestion = (i: number) => {
    return (
      <div className="sk-q" key={i}>
        <div className="sk-q__header"></div>
        <div className="sk-q__line"></div>
        <div className="sk-q__line"></div>
        <div className="sk-q__line"></div>
        <div className="sk-q__ans"></div>
      </div>
    );
  };
  const arr = Array(count).fill(1);
  const arrElements = arr.map((v, i) => {
    return skeletonQuestion(i);
  });

  return <>{arrElements}</>;
};

export default SkeletonQuestion;
