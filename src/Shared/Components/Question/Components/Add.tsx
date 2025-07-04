import styles from '../question.module.css';

export function Add({ add }: { add: string }) {
  return (
    <div className={styles.razdatka}>
      <p>Раздаточный материал:</p>
      <div>{add.startsWith('http') ? <img src={add} alt='раздатка' /> : <p>{add}</p>}</div>
    </div>
  );
}
