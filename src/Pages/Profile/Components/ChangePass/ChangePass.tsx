import { useState } from 'react';
import { useChangePasswordMutation, useGetCurrentUserQuery } from 'Store/ToolkitAPIs/userAPI';
import { Button } from 'Shared/Components/Button/Button';
import { Modal } from 'Shared/Components/Modal/Modal';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChangePassSchema, ChangePassType } from './ChangePassSchema';
import styles from '../../profile.module.css';

export function ChangePass() {
  const [changePass, setChangePass] = useState(false);
  const [serverMessage, setServerMessage] = useState('');

  const { data: currentUser } = useGetCurrentUserQuery(undefined);

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
      <div className={styles.changePass}>
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
        <div className={styles.modal}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {' '}
            <label>
              <p>Новый пароль</p>
              <input type='password' id='newPassword' {...register('newPassword')} autoComplete='off' autoFocus />
            </label>
            <label>
              <p>Повторите пароль</p>
              <input type='password' id='confirmNewPassword' {...register('confirmNewPassword')} autoComplete='off' />
            </label>
            {Object.keys(errors).length > 0 &&
              Object.values(errors).map((error) => {
                return <p className={styles.error}>{error.message}</p>;
              })}
            {serverMessage && <p className={isSuccess ? styles.success : styles.error}>{serverMessage}</p>}
            <div className={styles.control}>
              <Button type='button' title='Закрыть' onClick={() => setChangePass(false)} />
              <Button
                type='submit'
                title='Отправить'
                onClick={() => {
                  setServerMessage('');
                  handleSubmit(onSubmit);
                }}
              />
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
