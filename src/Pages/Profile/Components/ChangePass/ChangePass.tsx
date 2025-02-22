import { useState } from 'react';
import { useChangePasswordMutation } from 'Store/ToolkitAPIs/userAPI';
import { Button } from 'Shared/Components/Button/Button';
import { Modal } from 'Shared/Components/Modal/Modal';
import { useInitialLogin } from 'Shared/Hooks/useInitialLogin';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChangePassSchema, ChangePassType } from './ChangePassSchema';

export function ChangePass() {
  const [changePass, setChangePass] = useState(false);
  const [serverMessage, setServerMessage] = useState('');

  const { currentUser } = useInitialLogin();
  const [changePassword, { isSuccess }] = useChangePasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePassType>({
    resolver: zodResolver(ChangePassSchema),
  });

  const onSubmit = (data: ChangePassType) => {
    setServerMessage('');

    if (currentUser) {
      changePassword({ newPass: data.newPassword, id: currentUser.id })
        .unwrap()
        .then(() => {
          setServerMessage('Пароль успешно изменён');
          reset();
        })
        .catch(() => setServerMessage('Ошибка сервера. Повторите попытку позже'));
    }
  };

  return (
    <>
      <div className='change-pass-text'>
        <p
          onClick={() => {
            setChangePass(true);
            reset();
          }}
        >
          изменить пароль
        </p>
      </div>

      <Modal
        active={changePass}
        onClose={() => setChangePass(false)}
        onDestroyed={() => {
          setServerMessage('');
        }}
      >
        <div className='profile-pass'>
          <form onSubmit={handleSubmit(onSubmit)}>
            {' '}
            <div className='profile-pass-container'>
              <label>
                <p>Новый пароль</p>
                <input type='password' id='newPassword' {...register('newPassword')} autoComplete='off' />
              </label>

              <label>
                <p>Повторите пароль</p>
                <input type='password' id='confirmNewPassword' {...register('confirmNewPassword')} autoComplete='off' />
              </label>

              {errors && (
                <p className='profile-pass-error'>
                  {errors.newPassword?.message || errors.confirmNewPassword?.message}
                </p>
              )}

              {serverMessage && <p className={`profile-pass-${isSuccess ? 'success' : 'error'}`}>{serverMessage}</p>}

              <div className='profile-pass-control'>
                <Button type='button' title='Закрыть' onClick={() => setChangePass(false)} />
                <Button type='submit' title='Отправить' onClick={handleSubmit(onSubmit)} />
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
