import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registrationSchema, RegistrationType } from '../Schema/EntrySchema';

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationType>({
    resolver: zodResolver(registrationSchema),
    mode: 'onBlur',
  });

  const onSubmit = (data: RegistrationType) => {
    console.log('Данные регистрации:', data);
    // Здесь можно добавить логику отправки данных на сервер
  };

  return (
    <form className='entry-form' onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor='email'>Почта:</label>
        <input type='email' autoComplete='email' id='email' {...register('email')} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor='username'>Логин:</label>
        <input type='text' autoComplete='off' id='username' {...register('username')} />
        {errors.username && <span>{errors.username.message}</span>}
      </div>

      <div>
        <label htmlFor='password'>Пароль:</label>
        <input type='password' placeholder='Пароль' autoComplete='off' id='password' {...register('password')} />
        {errors.password && <span>{errors.password.message}</span>}
      </div>

      <div>
        <label htmlFor='confirmPassword'>Повторите пароль:</label>
        <input type='password' autoComplete='off' id='confirmPassword' {...register('confirmPassword')} />
        {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
      </div>

      <button type='submit'>Зарегистрироваться</button>
    </form>
  );
};

export default RegistrationForm;
