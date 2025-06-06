import './footer.css';
import Telegram from './icons/telegram.svg?react';
import Mail from './icons/email.svg?react';
import Github from './icons/github.svg?react';

export function Footer() {
  return (
    <footer>
      <a href='https://t.me/DeFrag3' target='_blank' rel='noopener' title='Telegram'>
        <Telegram />
      </a>

      <a href='https://github.com/m-salikhov' target='_blank' rel='noopener' title='Github'>
        <Github />
      </a>

      <div>
        <Mail />
        <p> andvary@inbox.ru</p>
      </div>
    </footer>
  );
}
