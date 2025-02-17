import { useState } from 'react';
import { showScroll, hideScroll } from 'Shared/Helpers/scrollDisplay';
import { useChangePasswordMutation } from 'Store/ToolkitAPIs/userAPI';
import Button from 'Shared/Components/Button/Button';
import Modal from 'Shared/Components/Modal/Modal';
import { useInitialLogin } from 'Shared/Hooks/useInitialLogin';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChangePassSchema, ChangePassType } from './ChangePassSchema';

export function ChangePass() {
  const [changePass, setChangePass] = useState(false);
  const { currentUser } = useInitialLogin();
  const [changePassword, { isSuccess, isError }] = useChangePasswordMutation();

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
      changePassword({ newPass: data.newPassword, id: currentUser.id }).then(() => {
        reset();
      });
    }
  };

  return (
    <>
      <div className='change-pass-text'>
        <p
          onClick={() => {
            setChangePass(true);
            reset();
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
          showScroll();
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

              {isError && <p className='profile-pass-error'>{'Ошибка сервера. Повторите попытку позже'}</p>}

              {isSuccess && <p className='profile-pass-success'>{'Пароль успешно изменён'}</p>}

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
