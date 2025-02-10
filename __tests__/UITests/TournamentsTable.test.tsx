import { describe, expect, test } from 'vitest';
import { screen } from '@testing-library/react';
import TournamentsTable from 'Common/Components/TournamentsTable/TournamentsTable';
import { renderWithProviders } from '../utils/renderWithProviders';
import userEvent from '@testing-library/user-event';
import { allshort } from '../__fixtures__/allshort';

describe('TournamentsTable', () => {
  test('получает и рендерит турниры', async () => {
    renderWithProviders(<TournamentsTable />);

    const title = await screen.findByText(allshort[0].title);

    expect(title).toBeInTheDocument();
  });

  test('работает поиск по таблице турниров', async () => {
    renderWithProviders(<TournamentsTable />);

    const inputElement = screen.getByPlaceholderText('поиск');

    //при вводе одной буквы поиск не происходит
    await userEvent.type(inputElement, 'б');
    let tournament1 = screen.queryByText('Рождественский Романс');
    expect(tournament1).toBeInTheDocument();

    //при вводе более одной буквы поиск происходит фильтрации по таблице турниров
    await userEvent.clear(inputElement);
    await userEvent.type(inputElement, 'балт');
    tournament1 = screen.queryByText('Рождественский Романс');
    const tournament2 = screen.queryByText('Балтийский Бриз. Masters III');
    expect(tournament1).not.toBeInTheDocument();
    expect(tournament2).toBeInTheDocument();

    // при очистке поля поиска все турниры отображаются
    await userEvent.clear(inputElement);
    tournament1 = screen.queryByText('Рождественский Романс');
    expect(tournament1).toBeInTheDocument();
  });
});
