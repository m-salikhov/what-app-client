import { useAppDispatch } from 'Shared/Hooks/redux';
import { playModeActions } from 'Store/Slices/PlayModeSlice';
import green_ans from './green_mark.svg';
import red_ans from './red_cross.svg';
import { ResultElementClientType } from 'Shared/Schemas/ResultSchema';

interface Props {
  tourResult: ResultElementClientType[] | undefined;
}

function TourTable({ tourResult }: Props) {
  const dispatch = useAppDispatch();

  if (!tourResult) return null;

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
