import green_ans from '../PMIcons/greenmar.svg';
import red_ans from '../PMIcons/redcross.svg';

interface Props {
  res: { num: number; ans: boolean }[];
  setSelectedQ(qNum: number): void;
}

function TourTable({ res, setSelectedQ }: Props) {
  return (
    <div className='tour-end-tbl'>
      {res.map((v) => {
        return (
          <div
            className='tour-end-tbl-el'
            key={v.num}
            onClick={() => setSelectedQ(v.num)}
          >
            <div>{v.num}</div>
            <div>
              <img src={v.ans ? green_ans : red_ans} alt='answer icon' />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TourTable;
