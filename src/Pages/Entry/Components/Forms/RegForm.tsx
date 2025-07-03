import styles from '../../entry.module.css';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registrationSchema, RegistrationType } from '../../Schema/EntrySchema';
import { Button } from 'Shared/Components/Button/Button';
import { FormFieldError } from './FormError';
import { useRegistration } from '../../hooks/useRegistration';
import { ModalReg } from '../ModalReg';
import { getServerErrorMessage } from 'Shared/Helpers/getServerErrorMessage';

export const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationType>({
    resolver: zodResolver(registrationSchema),
  });

  const { registration, error, isLoading, isSuccess } = useRegistration();

  const onSubmit = (data: RegistrationType) => {
    registration(data);
  };

  return (
    <>
      {isSuccess ? <ModalReg /> : null}
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formInput}>
          <label htmlFor='email'>Почта:</label>
          <input type='email' autoComplete='email' id='email' {...register('email')} />
        </div>
        <FormFieldError message={errors.email?.message} />

        <div className={styles.formInput}>
          <label htmlFor='username' className='entry-input'>
            Логин:
          </label>
          <input type='text' autoComplete='username' id='username' {...register('username')} />
        </div>
        <FormFieldError message={errors.username?.message} />

        <div className={styles.formInput}>
          <label htmlFor='password' className='entry-input'>
            Пароль:
          </label>
          <input type='password' autoComplete='off' id='password' {...register('password')} />
        </div>
        <FormFieldError message={errors.password?.message} />

        <div className={styles.formInput}>
          <label htmlFor='confirmPassword'>Повторите пароль:</label>
          <input type='password' autoComplete='off' id='confirmPassword' {...register('confirmPassword')} />
        </div>
        <FormFieldError message={errors.confirmPassword?.message} />

        {error && <FormFieldError message={getServerErrorMessage(error, 'Ошибка')} />}

        <Button type='submit' disabled={isLoading} title='Зарегистрироваться' onSubmit={handleSubmit(onSubmit)} />
      </form>
    </>
  );
};
