import styles from './footer.module.css';
import Telegram from './icons/telegram.svg?react';
import Mail from './icons/email.svg?react';
import Github from './icons/github.svg?react';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <a href='https://t.me/DeFrag3' target='_blank' rel='noopener' title='Telegram' className={styles.link}>
        <Telegram />
      </a>

      <a href='https://github.com/m-salikhov' target='_blank' rel='noopener' title='Github' className={styles.link}>
        <Github />
      </a>

      <div className={styles.iconContainer}>
        <Mail className={styles.icon} />
        <p> andvary@inbox.ru</p>
      </div>
    </footer>
  );
}
