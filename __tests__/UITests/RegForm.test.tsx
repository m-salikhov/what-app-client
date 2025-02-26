import Entry from 'src/Pages/Entry/Entry';
import { describe, expect, test, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../utils/renderWithProviders';
import userEvent from '@testing-library/user-event';

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

describe('Форма регистрации', () => {
  test('рендерит форму Login по умолчанию, по клику рендерит форму Reg', async () => {
    renderWithProviders(<Entry />);

    expect(screen.getByText('Пароль:')).toBeInTheDocument();
    expect(screen.getByText('Почта:')).toBeInTheDocument();
    expect(screen.queryByText('Логин:')).not.toBeInTheDocument();
    expect(screen.queryByText('Повторите пароль:')).not.toBeInTheDocument();

    await userEvent.click(screen.getByText('Нет аккаунта?'));

    expect(screen.getByText('Пароль:')).toBeInTheDocument();
    expect(screen.getByText('Почта:')).toBeInTheDocument();
    expect(screen.queryByText('Логин:')).toBeInTheDocument();
    expect(screen.queryByText('Повторите пароль:')).toBeInTheDocument();
  });

  test('успешная регистрация', async () => {
    renderWithProviders(<Entry />);

    await userEvent.click(screen.getByText('Нет аккаунта?'));

    await userEvent.type(screen.getByLabelText('Логин:'), 'test-login');
    await userEvent.type(screen.getByLabelText('Почта:'), 'example@ya.ru');
    await userEvent.type(screen.getByLabelText('Пароль:'), '123456');
    await userEvent.type(screen.getByLabelText('Повторите пароль:'), '123456');

    await userEvent.click(screen.getByRole('button'));

    //отображается сообщение об успешной регистрации
    expect(screen.queryByText('Вы успешно зарегистрировались')).toBeInTheDocument();
  });

  test('ошибка сервера при регистрации', async () => {
    renderWithProviders(<Entry />);

    await userEvent.click(screen.getByText('Нет аккаунта?'));

    await userEvent.type(screen.getByLabelText('Логин:'), 'test-login');
    await userEvent.type(screen.getByLabelText('Почта:'), 'test-error@ya.ru');
    await userEvent.type(screen.getByLabelText('Пароль:'), '123456');
    await userEvent.type(screen.getByLabelText('Повторите пароль:'), '123456');

    await userEvent.click(screen.getByRole('button'));

    //отображается сообщение об ошибке
    expect(screen.queryByText('Ошибка сервера. Попробуйте позже.')).toBeInTheDocument();
  });
});
