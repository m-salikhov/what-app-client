import { FormUser } from 'Common/Types/user';

function checkFormFields(formUser: FormUser, reg: boolean) {
  const testEmail = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;

  if (!testEmail.test(formUser.email)) {
    return 'Неверный email';
  }
  if (!formUser.password) {
    return 'Введите пароль';
  }
  if (reg && formUser.password !== formUser.passRepeat) {
    return 'Повторите пароль';
  }
  if (reg && !formUser.username) {
    return 'Выберите псевдоним';
  }

  return null;
}

export default checkFormFields;
