import styles from '../../entry.module.css';

interface Props {
  message: string | undefined;
}

export function FormFieldError({ message }: Props) {
  if (!message) return null;

  return (
    <div className={styles.error} role='alert'>
      <div className={styles.errorBlock}></div>
      <p>{message}</p>
    </div>
  );
}
