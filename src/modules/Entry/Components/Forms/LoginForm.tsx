import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginType } from '../../Schema/EntrySchema';
import Button from 'Common/Components/Button/Button';
import FormFieldError from './FormError';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginType) => {
    console.log('Данные регистрации:', data);
    // Здесь можно добавить логику отправки данных на сервер
  };

  return (
    <form className='entry-form' onSubmit={handleSubmit(onSubmit)}>
      <div className='entry-input'>
        <label htmlFor='email'>Почта:</label>
        <input type='email' autoComplete='email' id='email' {...register('email')} />
      </div>
      <FormFieldError message={errors.email?.message} />

      <div className='entry-input'>
        <label htmlFor='password' className='entry-input'>
          Пароль:
        </label>
        <input type='password' autoComplete='off' id='password' {...register('password')} />
      </div>
      <FormFieldError message={errors.password?.message} />

      <Button type='submit' title='Войти' onSubmit={handleSubmit(onSubmit)} />
    </form>
  );
};

export default LoginForm;
