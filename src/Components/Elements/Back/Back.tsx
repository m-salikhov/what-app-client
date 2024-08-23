import { useNavigate } from 'react-router-dom';
import arrow_left from './arrow_left.svg';
import './back.css';

function Back() {
  const navigate = useNavigate();
  return (
    <>
      <div className='lastpage' onClick={() => navigate(-1)}>
        {' '}
        <img src={arrow_left} alt='обновить случайные' />
        <p>Назад</p>
      </div>
    </>
  );
}

export default Back;
