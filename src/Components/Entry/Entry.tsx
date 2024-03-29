import { Navigate } from 'react-router-dom';
import { useAppDispatch } from '../../Hooks/redux';
import { ChangeEvent, FormEvent, useState } from 'react';
import { FormUser } from '../../Types/user';
import ModalReg from './ModalReg';
import { initFormUser } from '../../Helpers/initValues';
import entryImg from './entry_img.svg';
import { useDocTitle } from '../../Hooks/useDocTitle';
import './entry.scss';
import { Tooltip } from 'react-tooltip';
import checkFormFields from './helpers/checkFormFields';
import { useLoginMutation, useRegistrationMutation, userAPI } from '../../Store/userAPI';
import extractServerErrorMessage from '../../Helpers/extractServerErrorMessage';

const Entry = () => {
  useDocTitle('Вход');
  const dispatch = useAppDispatch();

  const [formUser, setFormUser] = useState<FormUser>(initFormUser);
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reg, setReg] = useState(false);

  const [login, { isSuccess: loginSuccess, error: errorLogin, reset: resetLoginState }] = useLoginMutation({
    fixedCacheKey: 'login',
  });
  const [registration, { error: errorReg }] = useRegistrationMutation();

  const onSubmit = async (e: FormEvent<EventTarget>) => {
    e.preventDefault();

    setErrorMessage('');

    const FormFieldsErrors = checkFormFields(formUser, reg);
    if (FormFieldsErrors) {
      setErrorMessage(FormFieldsErrors);
      return;
    }

    if (reg) {
      await registration(formUser)
        .unwrap()
        .then((data) => dispatch(userAPI.util.upsertQueryData('getUserLogfirst', undefined, data)));
      setIsModalOpen(true);
      return;
    }

    await login({ email: formUser.email, password: formUser.password })
      .unwrap()
      .then((data) => dispatch(userAPI.util.upsertQueryData('getUserLogfirst', undefined, data)));
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormUser({
      ...formUser,
      [e.target.name]: e.target.value,
    });
  };

  if (loginSuccess) {
    return <Navigate to='/' replace />;
  }

  return (
    <>
      {/* окно при успешной регистрации */}
      {isModalOpen ? <ModalReg /> : null}

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
              {!reg && <Tooltip anchorSelect='#tooltip-mail' place='bottom' />}

              <label className={reg ? 'entry__input' : 'entry__input reg'}>
                <h2>Псевдоним</h2>
                <input type='text' onChange={onChange} name='username' autoComplete='off' placeholder='username' />
              </label>

              <label className='entry__input'>
                <h2>Пароль</h2>
                <input
                  type='password'
                  onChange={onChange}
                  name='password'
                  autoComplete='on'
                  placeholder='password'
                />{' '}
              </label>
              <label className={reg ? 'entry__input' : 'entry__input reg'}>
                <h2>Повторите пароль</h2>
                <input
                  autoComplete='on'
                  type='password'
                  name='passRepeat'
                  placeholder='repeat password'
                  onChange={onChange}
                />{' '}
              </label>
              {(errorMessage || errorLogin || errorReg) && (
                <div className='entry__error'>
                  <div className='entry__error--block'></div>
                  <p>{errorMessage || extractServerErrorMessage(errorLogin || errorReg)}</p>
                </div>
              )}

              <div className='entry__buttons'>
                <button type='submit'>Отправить</button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    resetLoginState();
                    setErrorMessage('');
                    setReg(!reg);
                  }}
                >
                  {reg ? 'Авторизироваться' : 'Зарегистрироваться'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Entry;
