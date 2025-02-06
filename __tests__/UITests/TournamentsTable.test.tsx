import { describe, expect, test } from 'vitest';
import { screen } from '@testing-library/react';
import TournamentsTable from 'Common/Components/TournamentsTable/TournamentsTable';
import { renderWithProviders } from '../utils/renderWithProviders';
import userEvent from '@testing-library/user-event';

describe('TournamentsTable', () => {
  test('получает и рендерит турниры', async () => {
    renderWithProviders(<TournamentsTable />);

    const search = await screen.findByText('Простой Смоленск – 2');

    expect(search).toBeInTheDocument();
  });

  test('работает поиск по таблице турниров', async () => {
    renderWithProviders(<TournamentsTable />);

    const inputElement = screen.getByPlaceholderText('поиск');

    //при вводе одной буквы поиск не происходит
    await userEvent.type(inputElement, 'я');
    let tournament1 = screen.queryByText('Бесконечные Земли: том XXI');
    expect(tournament1).toBeInTheDocument();

    //при вводе более одной буквы поиск происходит фильтрации по таблице турниров
    await userEvent.clear(inputElement);
    await userEvent.type(inputElement, 'сол');
    tournament1 = screen.queryByText('Бесконечные Земли: том XXI');
    const tournament2 = screen.queryByText('Соло на ундервуде');
    expect(tournament1).not.toBeInTheDocument();
    expect(tournament2).toBeInTheDocument();

    // при очистке поля поиска все турниры отображаются
    await userEvent.clear(inputElement);
    tournament1 = screen.queryByText('Бесконечные Земли: том XXI');
    expect(tournament1).toBeInTheDocument();
  });
});
