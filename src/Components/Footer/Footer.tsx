import './footer.css';
import Telegram from './icons/telegram.svg?react';
import Mail from './icons/email.svg?react';
import Github from './icons/github.svg?react';

function Footer() {
  return (
    <footer>
      <div className='footer-icons'>
        <a href='https://t.me/DeFrag3' target='_blank' rel='noreferrer'>
          <Telegram />
        </a>
        <a
          href='https://github.com/m-salikhov'
          target='_blank'
          rel='noreferrer'
        >
          <Github />
        </a>
        <div>
          <Mail />
          <p> andvary@inbox.ru</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
