import './ResultTable.css';
import green_ans from './green_mark.svg';
import red_ans from './red_cross.svg';
import { useAppDispatch } from 'Shared/Hooks/redux';
import { playModeActions } from 'Store/Slices/PlayModeSlice';
import { ResultElementClientType } from 'Shared/Schemas/ResultSchema';

interface Props {
  tourResult: ResultElementClientType[] | undefined;
}

export function TourTable({ tourResult }: Props) {
  const dispatch = useAppDispatch();

  if (!tourResult) return null;

  return (
    <div className='result-table-tour'>
      {tourResult.map((v) => {
        return (
          <div
            className='result-table-el'
            key={v.num}
            onClick={() => dispatch(playModeActions.setSelectedResultQuestionNumber(v.num))}
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
