import styles from './entry.module.css';
import entryImg from './entry_img.svg';
import { useState } from 'react';
import { useDocTitle } from 'Shared/Hooks/useDocTitle';
import { RegistrationForm } from './Components/Forms/RegForm';
import LoginForm from './Components/Forms/LoginForm';

function Entry() {
  useDocTitle('Вход');

  const [showLoginOrRegForm, setShowLoginOrRegForm] = useState(true);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.entry}>
            <div className={styles.img}>
              <img src={entryImg} alt='логотип на форме входа\регистрации' />
            </div>

            {showLoginOrRegForm ? <LoginForm /> : <RegistrationForm />}

            <p className={styles.switch} onClick={() => setShowLoginOrRegForm(!showLoginOrRegForm)}>
              {showLoginOrRegForm ? 'Нет аккаунта?' : 'Есть аккаунт?'}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Entry;
