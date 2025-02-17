import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginType } from '../../Schema/EntrySchema';
import Button from 'Shared/Components/Button/Button';
import FormFieldError from './FormError';
import { Navigate } from 'react-router-dom';
import { useLogin } from '../../hooks/useLogin';
import extractServerErrorMessage from 'Shared/Helpers/extractServerErrorMessage';
import { Tooltip } from 'react-tooltip';

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
    <form className='entry-form' onSubmit={handleSubmit(onSubmit)}>
      <div
        className='entry-input'
        id='tooltip-mail'
        data-tooltip-html='Можно зарегистрировать или зайти под тестовым аккаунтом<br /> почта: test@gmail.com, пароль: test'
      >
        <label htmlFor='email'>Почта:</label>
        <input type='email' autoComplete='email' id='email' {...register('email')} />
      </div>
      <Tooltip anchorSelect='#tooltip-mail' place='top' opacity={1} />

      <FormFieldError message={errors.email?.message} />

      <div className='entry-input'>
        <label htmlFor='password' className='entry-input'>
          Пароль:
        </label>
        <input type='password' autoComplete='off' id='password' {...register('password')} />
      </div>
      <FormFieldError message={errors.password?.message} />

      {error && <FormFieldError message={extractServerErrorMessage(error)} />}

      <Button type='submit' disabled={isLoading} title='Войти' onSubmit={handleSubmit(onSubmit)} />
    </form>
  );
};

export default LoginForm;
