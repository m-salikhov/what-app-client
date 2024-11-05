import { useAppDispatch } from '../../../../../../Common/Hooks/redux';
import { playModeActions } from '../../../../../../Store/Slices/PlayModeSlice';
import green_ans from '../../../PMIcons/green_mark.svg';
import red_ans from '../../../PMIcons/red_cross.svg';

interface Props {
  tourResult: { num: number; ans: boolean }[];
}

function TourTable({ tourResult }: Props) {
  const dispatch = useAppDispatch();

  return (
    <div className='tour-end-tbl'>
      {tourResult.map((v) => {
        return (
          <div
            className='tour-end-tbl-el'
            key={v.num}
            onClick={() => dispatch(playModeActions.setSelectedResultQuestion(v.num))}
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
