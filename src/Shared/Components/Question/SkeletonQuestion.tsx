import styles from './skeletonQuestion.module.css';

export function SkeletonQuestion({ length }: { length: number }) {
  const skeletonQuestion = (i: number) => {
    return (
      <div className={styles.container} key={i}>
        <div className={styles.header}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.shortLine}></div>
      </div>
    );
  };

  const arr = [...Array.from({ length }).keys()];

  const arrElements = arr.map((v) => {
    return skeletonQuestion(v);
  });

  return <>{arrElements}</>;
}
