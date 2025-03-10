import Entry from 'src/Pages/Entry/Entry';
import { describe, expect, test, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../utils/renderWithProviders';
import userEvent from '@testing-library/user-event';

globalThis.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

describe('Форма логина', () => {
  test('рендерит форму Login по умолчанию', () => {
    renderWithProviders(<Entry />);

    const labelEmail = screen.getByText('Почта:');
    const labelPassword = screen.getByText('Пароль:');
    const labelLogin = screen.queryByText('Логин:');
    const labelRepeatPassword = screen.queryByText('Повторите пароль:');

    expect(labelPassword).toBeInTheDocument();
    expect(labelEmail).toBeInTheDocument();
    expect(labelLogin).not.toBeInTheDocument();
    expect(labelRepeatPassword).not.toBeInTheDocument();
  });

  test('успешный логин', async () => {
    renderWithProviders(<Entry />);

    await userEvent.type(screen.getByLabelText('Почта:'), 'example@ya.ru');

    await userEvent.type(screen.getByLabelText('Пароль:'), '123456');

    await userEvent.click(screen.getByRole('button'));

    //сработала переадресация при успехе
    expect(screen.queryByText('Почта:')).not.toBeInTheDocument();
  });

  test('ошибка валидации на клиенте', async () => {
    renderWithProviders(<Entry />);

    const emailInput = screen.getByLabelText('Почта:');
    const passwordInput = screen.getByLabelText('Пароль:');

    await userEvent.type(emailInput, 'example@yaru');
    await userEvent.type(passwordInput, '123');
    await userEvent.click(screen.getByRole('button'));
    expect(screen.queryByText('Неверный формат почты')).toBeInTheDocument();
    expect(screen.queryByText('Пароль должен содержать минимум 4 символа')).toBeInTheDocument();

    await userEvent.clear(emailInput);
    await userEvent.clear(passwordInput);
    await userEvent.type(emailInput, 'example@ya.ru');
    await userEvent.type(passwordInput, '1234');

    expect(screen.queryByText('Неверный формат почты')).not.toBeInTheDocument();
    expect(screen.queryByText('Пароль должен содержать минимум 4 символа')).not.toBeInTheDocument();
  });

  test('ошибка сервера', async () => {
    renderWithProviders(<Entry />);

    const emailInput = screen.getByLabelText('Почта:');
    const passwordInput = screen.getByLabelText('Пароль:');

    await userEvent.type(emailInput, 'test-error@ya.ru');
    await userEvent.type(passwordInput, '1234');
    await userEvent.click(screen.getByRole('button'));
    expect(screen.queryByText('Ошибка сервера. Попробуйте позже.')).toBeInTheDocument();
  });
});
