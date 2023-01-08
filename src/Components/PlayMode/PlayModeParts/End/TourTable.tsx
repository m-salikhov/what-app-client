import green_ans from "../PMIcons/greenmar.svg";
import red_ans from "../PMIcons/redcross.svg";

interface Props {
  res: { num: number; ans: boolean }[];
}

const TourTable = ({ res }: Props) => {
  return (
    <div className="tourend__tbl">
      {res.map((v, i) => {
        return (
          <div className="tourend__tbl_el" key={v.num}>
            <div>{v.num}</div>
            <div>
              <img src={v.ans ? green_ans : red_ans} alt="обновить случайные" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TourTable;
