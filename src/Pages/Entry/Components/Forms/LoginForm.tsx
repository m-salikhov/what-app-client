import styles from '../../entry.module.css';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginType } from '../../Schema/EntrySchema';
import { Button } from 'Shared/Components/Button/Button';
import { FormFieldError } from './FormError';
import { Navigate } from 'react-router-dom';
import { useLogin } from '../../hooks/useLogin';
import { Tooltip } from 'react-tooltip';
import { getServerErrorMessage } from 'Shared/Helpers/getServerErrorMessage';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
  });

  const { login, isSuccess, error, isLoading } = useLogin();

  const onSubmit = (data: LoginType) => {
    login(data);
  };

  if (isSuccess) {
    return <Navigate to='/' replace />;
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div
        className={styles.formInput}
        id='tooltip-mail'
        data-tooltip-html='Можно зарегистрироваться или зайти под публичным аккаунтом <br /> почта: test@test.com, пароль: test'
      >
        <label htmlFor='email'>Почта:</label>
        <input type='email' autoComplete='email' id='email' {...register('email')} />
      </div>
      <Tooltip
        anchorSelect='#tooltip-mail'
        place='top'
        opacity={0.8}
        className={styles.tooltip}
        style={{ maxWidth: '380px' }}
      />

      <FormFieldError message={errors.email?.message} />

      <div className={styles.formInput}>
        <label htmlFor='password'>Пароль:</label>
        <input type='password' autoComplete='off' id='password' {...register('password')} />
      </div>
      <FormFieldError message={errors.password?.message} />

      {error && <FormFieldError message={getServerErrorMessage(error, 'Ошибка')} />}

      <Button type='submit' disabled={isLoading} title='Войти' onSubmit={handleSubmit(onSubmit)} />
    </form>
  );
};

export default LoginForm;
