import './entry.css';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import entryImg from './entry_img.svg';
import checkFormFields from './helpers/checkFormFields';
import { useLogin } from './hooks/useLogin';
import { useRegistration } from './hooks/useRegistration';
import ModalReg from './Components/ModalReg';
import extractServerErrorMessage from 'Common/Helpers/extractServerErrorMessage';
import { initFormUser } from 'Common/Helpers/initValues';
import { useDocTitle } from 'Common/Hooks/useDocTitle';
import { FormUser } from 'Common/Types/user';
import Button from 'Common/Components/Button/Button';

function Entry() {
  useDocTitle('Вход');

  const [formUser, setFormUser] = useState<FormUser>(initFormUser);
  const [errorMessage, setErrorMessage] = useState('');
  const [isReg, setReg] = useState(false);

  const {
    login,
    isSuccess: loginSuccess,
    error: errorLogin,
    isLoading: isLoadingLogin,
    reset: resetLogin,
  } = useLogin();

  const {
    registration,
    isSuccess: regSuccess,
    error: errorReg,
    isLoading: isLoadingReg,
    reset: resetReg,
  } = useRegistration();

  const onSubmit = async (e: FormEvent<EventTarget>) => {
    e.preventDefault();
    isReg ? resetReg() : resetLogin();

    const FormFieldsErrors = checkFormFields(formUser, isReg);
    if (FormFieldsErrors) {
      setErrorMessage(FormFieldsErrors);
      return;
    }

    isReg ? registration(formUser) : login(formUser);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setErrorMessage('');

    setFormUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onClickAuthRegChangeBtn = () => {
    setErrorMessage('');
    isReg ? resetReg() : resetLogin();
    setReg(!isReg);
  };

  if (errorLogin || errorReg) {
    const errMessage = extractServerErrorMessage(errorLogin || errorReg);
    if (errMessage !== errorMessage) {
      setErrorMessage(errMessage);
    }
  }

  if (loginSuccess) {
    return <Navigate to='/' replace />;
  }

  return (
    <>
      {/* окно при успешной регистрации */}
      {regSuccess ? <ModalReg /> : null}

      <main className='entry-wrapper'>
        <div className='entry'>
          <div className='entry-container'>
            <div className='entry-img'>
              <img src={entryImg} alt='заглавное изображение' />
            </div>

            <form className='entry-form' onSubmit={onSubmit}>
              <label
                className='entry-input'
                id='tooltip-mail'
                data-tooltip-html='Можно зарегистрировать или зайти под тестовым аккаунтом<br /> почта: test@gmail.com, пароль: test'
              >
                <h2>Почта</h2>
                <input type='email' onChange={onChange} name='email' autoComplete='on' placeholder='email' />
              </label>
              {!isReg && <Tooltip anchorSelect='#tooltip-mail' place='top' opacity={1} />}

              <label className={isReg ? 'entry-input' : 'entry-input reg'}>
                <h2>Псевдоним</h2>
                <input type='text' onChange={onChange} name='username' autoComplete='off' placeholder='username' />
              </label>

              <label className='entry-input'>
                <h2>Пароль</h2>
                <input
                  type='password'
                  name='password'
                  autoComplete='on'
                  placeholder='password'
                  onChange={onChange}
                />{' '}
              </label>

              <label className={isReg ? 'entry-input' : 'entry-input reg'}>
                <h2>Повторите пароль</h2>
                <input
                  autoComplete='on'
                  type='password'
                  name='passRepeat'
                  placeholder='repeat password'
                  onChange={onChange}
                />{' '}
              </label>

              {errorMessage && (
                <div className='entry-error'>
                  <div className='entry-error-block'></div>
                  <p>{errorMessage}</p>
                </div>
              )}

              <div className='entry-buttons'>
                <Button title='Отправить' type='submit' disabled={isLoadingLogin || isLoadingReg} />
                <Button
                  title={isReg ? 'Авторизоваться' : 'Зарегистрироваться'}
                  onClick={onClickAuthRegChangeBtn}
                  disabled={isLoadingLogin || isLoadingReg}
                />
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

export default Entry;
