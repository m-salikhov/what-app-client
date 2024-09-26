import { useState } from 'react';
import { useChangePasswordMutation } from '../../Store/ToolkitAPIs/userAPI';
import Button from '../Elements/Button/Button';

interface ChangePassProp {
  setChangePass: (flag: boolean) => void;
  id: string;
}

function ChangePass({ setChangePass, id }: ChangePassProp) {
  const [newPass, setNewPass] = useState('');
  const [newPassRepeat, setNewPassRepeat] = useState('');
  const [message, setMessage] = useState('');

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

  return (
    <form className='profile-pass'>
      {' '}
      <div className='profile-pass-container'>
        <label>
          <p>Новый пароль</p>
          <input type='password' onChange={(e) => setNewPass(e.target.value)} value={newPass} autoComplete='off' />
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
  );
}

export default ChangePass;
