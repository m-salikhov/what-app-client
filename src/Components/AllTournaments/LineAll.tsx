import { Link } from 'react-router-dom';
import { getDate } from '../../Helpers/getDate';
import { TournamentShortType } from '../../Types/tournament';

interface LineProp {
  item: TournamentShortType;
  index: number;
}

function LineAll({ item, index }: LineProp) {
  return (
    <div className='table-line'>
      <p>{index + 1}</p>
      <div className='link'>
        <Link to={`/tournament/${item.id}`}>{item.title}</Link>
      </div>
      <p>{getDate(item.date)}</p>
      <p>{item.questionsQuantity}</p>
      <p>{item.tours}</p>
      <p>{getDate(item.dateUpload)}</p>
      <p>{item.uploader}</p>
    </div>
  );
}

export default LineAll;
