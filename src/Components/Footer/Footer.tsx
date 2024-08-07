import './footer.scss';
import tg from './icons/3787425_telegram_logo_icon.svg';
import mail from './icons/1814108_email_icon.svg';
import gh from './icons/8546736_github_icon.svg';

function Footer() {
  return (
    <footer>
      <div className='footer-icons'>
        <a href='https://t.me/DeFrag3' target='_blank' rel='noreferrer'>
          <img src={tg} alt='телеграмм' />
        </a>
        <a href='https://github.com/m-salikhov' target='_blank' rel='noreferrer'>
          <img src={gh} alt='гитхаб' />
        </a>
        <div>
          <img src={mail} alt='почта' />
          <p> andvary@inbox.ru</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
