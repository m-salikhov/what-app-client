import { ChangeEvent, FormEvent, useState, MouseEvent } from 'react';
import { Navigate } from 'react-router-dom';
import { FormUser } from '../../Types/user';
import ModalReg from './ModalReg';
import { initFormUser } from '../../Helpers/initValues';
import entryImg from './entry_img.svg';
import { useDocTitle } from '../../Hooks/useDocTitle';
import { Tooltip } from 'react-tooltip';
import checkFormFields from './helpers/checkFormFields';
import extractServerErrorMessage from '../../Helpers/extractServerErrorMessage';
import Button from '../Elements/Button/Button';
import { useLogin } from './hooks/useLogin';
import { useRegistration } from './hooks/useRegistration';
import './entry.scss';

function Entry() {
  useDocTitle('Вход');

  const [formUser, setFormUser] = useState<FormUser>(initFormUser);
  const [errorMessage, setErrorMessage] = useState('');
  const [isReg, setReg] = useState(false);

  const { login, isSuccess: loginSuccess, error: errorLogin, isLoading: isLoadingLogin } = useLogin();

  const { registration, isSuccess: regSuccess, error: errorReg, isLoading: isLoadingReg } = useRegistration();

  const onSubmit = async (e: FormEvent<EventTarget>) => {
    e.preventDefault();

    const FormFieldsErrors = checkFormFields(formUser, isReg);
    if (FormFieldsErrors) {
      setErrorMessage(FormFieldsErrors);
      return;
    }

    isReg ? registration(formUser) : login(formUser.email, formUser.password);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setErrorMessage('');

    setFormUser({
      ...formUser,
      [e.target.name]: e.target.value,
    });
  };

  const onClickAuthRegChangeBtn = (e: MouseEvent) => {
    e.preventDefault();
    setErrorMessage('');
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

      <main className='entry__wrapper'>
        <div className='entry'>
          <div className='entry__container'>
            <div className='entry__img'>
              <img src={entryImg} alt='заглавное изображение' />
            </div>
            <form className='entry__form' onSubmit={onSubmit}>
              <label
                className='entry__input'
                id='tooltip-mail'
                data-tooltip-html='Можно зарегистрировать или зайти под тестовым аккаунтом<br /> почта: test@gmail.com, пароль: test'
              >
                <h2>Почта</h2>
                <input type='email' onChange={onChange} name='email' autoComplete='on' placeholder='email' />
              </label>
              {!isReg && <Tooltip anchorSelect='#tooltip-mail' place='bottom' />}

              <label className={isReg ? 'entry__input' : 'entry__input reg'}>
                <h2>Псевдоним</h2>
                <input type='text' onChange={onChange} name='username' autoComplete='off' placeholder='username' />
              </label>

              <label className='entry__input'>
                <h2>Пароль</h2>
                <input
                  type='password'
                  name='password'
                  autoComplete='on'
                  placeholder='password'
                  onChange={onChange}
                />{' '}
              </label>
              <label className={isReg ? 'entry__input' : 'entry__input reg'}>
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
                <div className='entry__error'>
                  <div className='entry__error--block'></div>
                  <p>{errorMessage}</p>
                </div>
              )}

              <div className='entry__buttons'>
                <Button title='Отправить' type='submit' disabled={isLoadingLogin || isLoadingReg} />
                <Button
                  title={isReg ? 'Авторизироваться' : 'Зарегистрироваться'}
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
