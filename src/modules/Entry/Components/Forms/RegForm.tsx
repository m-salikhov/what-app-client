import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registrationSchema, RegistrationType } from '../../Schema/EntrySchema';
import Button from 'Common/Components/Button/Button';
import FormFieldError from './FormError';

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationType>({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = (data: RegistrationType) => {
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
        <label htmlFor='username' className='entry-input'>
          Логин:
        </label>
        <input type='text' autoComplete='username' id='username' {...register('username')} />
      </div>
      <FormFieldError message={errors.username?.message} />

      <div className='entry-input'>
        <label htmlFor='password' className='entry-input'>
          Пароль:
        </label>
        <input type='password' autoComplete='off' id='password' {...register('password')} />
      </div>
      <FormFieldError message={errors.password?.message} />

      <div className='entry-input'>
        <label htmlFor='confirmPassword' className='entry-input'>
          Повторите пароль:
        </label>
        <input type='password' autoComplete='off' id='confirmPassword' {...register('confirmPassword')} />
      </div>
      <FormFieldError message={errors.confirmPassword?.message} />

      <Button type='submit' title='Зарегистрироваться' onSubmit={handleSubmit(onSubmit)} />
    </form>
  );
};

export default RegistrationForm;
