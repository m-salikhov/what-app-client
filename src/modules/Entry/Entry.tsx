import './entry.css';
import { useState } from 'react';
import entryImg from './entry_img.svg';
import { useDocTitle } from 'Common/Hooks/useDocTitle';
import RegistrationForm from './Components/Forms/RegForm';
import LoginForm from './Components/Forms/LoginForm';

function Entry() {
  useDocTitle('Вход');

  const [showLoginOrRegForm, setShowLoginOrRegForm] = useState(true);

  return (
    <>
      <div className='entry-wrapper'>
        <div className='entry'>
          <div className='entry-container'>
            <div className='entry-img'>
              <img src={entryImg} alt='заглавное изображение' />
            </div>

            {showLoginOrRegForm ? <LoginForm /> : <RegistrationForm />}

            <p className='entry-switch' onClick={() => setShowLoginOrRegForm(!showLoginOrRegForm)}>
              {showLoginOrRegForm ? 'Нет аккаунта?' : 'Есть аккаунт?'}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Entry;
