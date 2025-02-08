import { useState } from 'react';
import { showScroll, hideScroll } from 'Common/Helpers/scrollDisplay';
import { useInitialLoginQuery, useChangePasswordMutation } from 'Store/ToolkitAPIs/userAPI';
import Button from 'Common/Components/Button/Button';
import Modal from 'Common/Components/Modal/Modal';

export function ChangePass() {
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

  const clearTextStates = () => {
    setMessage('');
    setNewPass('');
    setNewPassRepeat('');
  };

  return (
    <>
      <div className='change-pass-text'>
        <p
          onClick={() => {
            setChangePass(true);
            hideScroll();
          }}
        >
          изменить пароль
        </p>
      </div>

      <Modal
        active={changePass}
        onClose={() => setChangePass(false)}
        onDestroyed={() => {
          clearTextStates();
          showScroll();
        }}
      >
        <div className='profile-pass'>
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
                <Button type='button' title='Закрыть' onClick={() => setChangePass(false)} />
                <Button type='submit' title='Отправить' onClick={onSubmit} />
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
