import styles from './back.module.css';
import { useNavigate } from 'react-router-dom';
import arrow_left from './arrow_left.svg';

export function Back() {
  const navigate = useNavigate();
  return (
    <div className={styles.previousPage} onClick={() => navigate(-1)}>
      {' '}
      <img src={arrow_left} alt='обновить случайные' />
      <p>Назад</p>
    </div>
  );
}
