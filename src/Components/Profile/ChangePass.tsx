import { useState } from 'react';
import { useChangePasswordMutation, useInitialLoginQuery } from '../../Store/ToolkitAPIs/userAPI';
import Button from '../Elements/Button/Button';

import { useTransition, animated } from '@react-spring/web';
import useScrollOffset from '../../Hooks/useScrollOffset';

function ChangePass() {
  const [changePass, setChangePass] = useState(false);
  const [newPass, setNewPass] = useState('');
  const [newPassRepeat, setNewPassRepeat] = useState('');
  const [message, setMessage] = useState('');

  const { data: currentUser } = useInitialLoginQuery(undefined);

  const id = currentUser?.id || '';

  const [changePassword, { isSuccess, isError }] = useChangePasswordMutation();

  const onSubmit = () => {
    if (message) {
      setMessage('');
    }
    if (!newPass || newPass !== newPassRepeat) {
      setMessage('Пароль не совпадает');
      return;
    }

    changePassword({ newPass, id })
      .then(() => {
        setNewPass('');
        setNewPassRepeat('');
      })
      .catch(() => setMessage('Ошибка сервера'));
  };

  const onCancel = () => {
    if (message) {
      setMessage('');
    }
    setChangePass(false);
  };

  const transition = useTransition(changePass, {
    from: {
      scale: 0.5,
      opacity: 0,
    },
    enter: {
      scale: 1,
      opacity: 1,
    },
    leave: {
      scale: 0.5,
      opacity: 0,
    },

    config: { duration: 300 },
  });

  useScrollOffset(changePass);

  return (
    <>
      <div className='change-pass-text'>
        <p onClick={() => setChangePass(true)}>изменить пароль</p>
      </div>
      {transition((style, flag) => {
        return flag ? (
          <div className='change-pass-wrapper'>
            <animated.div style={style} className='profile-pass'>
              <form>
                {' '}
                <div className='profile-pass-container'>
                  <label>
                    <p>Новый пароль</p>
                    <input
                      type='password'
                      onChange={(e) => setNewPass(e.target.value)}
                      value={newPass}
                      autoComplete='off'
                    />
                  </label>
                  <label>
                    <p>Повторите пароль</p>
                    <input
                      type='password'
                      onChange={(e) => setNewPassRepeat(e.target.value)}
                      value={newPassRepeat}
                      autoComplete='off'
                    />
                  </label>

                  {(message || isError) && <p className='profile-pass-error'>{message}</p>}

                  {isSuccess && <p className='profile-pass-success'>{'Пароль успешно изменён'}</p>}

                  <div className='profile-pass-control'>
                    <Button title='Закрыть' onClick={onCancel} />
                    <Button title='Отправить' onClick={onSubmit} />
                  </div>
                </div>
              </form>
            </animated.div>
          </div>
        ) : null;
      })}
    </>
  );
}

export default ChangePass;
