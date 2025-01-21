import checkFormFields from 'src/modules/Entry/helpers/checkFormFields';
import { expect, test, describe } from 'vitest';

const formUser = {
  email: 'test@ya.ru',
  password: '1234567',
  passRepeat: '1234567',
  username: 'test',
  role: 'user',
};

describe('checkFormFields correct', () => {
  test('should not return errors', () => {
    expect(checkFormFields(formUser, true)).toBeNull();
    expect(checkFormFields(formUser, false)).toBeNull();
  });
});

describe('checkFormFields incorrect', () => {
  test('should return correct errors', () => {
    expect(checkFormFields({ ...formUser, username: '' }, true)).toBe('Выберите псевдоним');
    expect(checkFormFields({ ...formUser, password: '' }, true)).toBe('Введите пароль');
    expect(checkFormFields({ ...formUser, passRepeat: 'aaaa' }, true)).toBe('Повторите пароль');
    expect(checkFormFields({ ...formUser, email: 'test@.ru' }, true)).toBe('Неверный email');
    expect(checkFormFields({ ...formUser, username: '' }, true)).toBe('Выберите псевдоним');
  });
});
