import styles from './button.module.css';

interface ButtonProps {
  extraClass?: string;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  extraClass?: string;
}

export function Button({ title, extraClass, type, ...props }: ButtonProps) {
  return (
    <div className={styles.buttonContainer}>
      <button
        className={extraClass ? `${styles.button} ${extraClass}` : styles.button}
        type={type || 'button'}
        {...props}
      >
        {title}
      </button>
    </div>
  );
}
